import 'dart:async';
import 'dart:convert';

import 'package:fresh_nest/core/home/application/comment_provider.dart';
import 'package:fresh_nest/data/cache/app_cache.dart';
import 'package:fresh_nest/models/comment.dart';
import "package:fresh_nest/secrets.dart";
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;

class CommentManager {
  final BuildContext context;
  late Timer timer;
  final WidgetRef ref;
  final String itemID;

  CommentManager(this.context, this.ref, this.itemID) {
    ref.read(commentProvider).updateItems([], notify: false);
    attach();
  }

  dispose() {
    debugPrint("[comment_manager] Detaching Listeners...");
    timer.cancel();
  }

  // Using Polling instead of WebSockets
  attach() async {
    debugPrint("[comment_manager]: Attaching Listeners...");
    var data = await getAllComments();
    ref.read(commentProvider).updateItems(data);

    timer = Timer.periodic(
      const Duration(seconds: 10),
      (timer) async {
        if (context.mounted) {
          var data = await getAllComments();
          ref.read(commentProvider).updateItems(data);
        }
      },
    );
  }

  Future<List<CommentItem>> getAllComments() async {
    var response = await http.post(
      Uri.parse("$API_URL/list/getComments"),
      body: {"itemID": itemID},
    );
    Map data = json.decode(response.body);
    List dataMap = data["data"];
    List<CommentItem> list = [];

    for (var e in dataMap) {
      list.add(CommentItem.fromMap(e));
    }
    return list;
  }

  Future<void> addComment(String content) async {
    var response = await http.post(
      Uri.parse("$API_URL/list/comment"),
      body: {
        "itemID": itemID,
        "commentBy": appState.value.user!.id,
        "name": appState.value.user!.name,
        "content": content,
        "commentAt": DateTime.now().toIso8601String(),
      },
    );
    debugPrint("Comment Added Successfully");
  }

  Future<void> addItem({
    required String name,
    required String listedBy,
    required String description,
    required List<String> images,
    required double price,
  }) async {
    var response = await http.post(
      Uri.parse("$API_URL/list/addItem"),
      headers: {"content-type": "application/json"},
      body: json.encode(
        {
          "listedBy": listedBy,
          "name": name,
          "description": description,
          "images": images,
          "price": price.toString(),
        },
      ),
    );
  }
}
