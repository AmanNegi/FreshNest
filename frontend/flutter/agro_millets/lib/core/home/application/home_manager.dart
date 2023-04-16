import 'dart:async';
import 'dart:convert';

import 'package:agro_millets/core/home/application/home_provider.dart';
import 'package:agro_millets/data/auth_state_repository.dart';
import 'package:agro_millets/models/millet_item.dart';
import "package:agro_millets/secrets.dart";
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;

class HomeManager {
  final BuildContext context;
  late Timer timer;
  final WidgetRef ref;

  HomeManager(this.context, this.ref) {
    attach();
  }

  dispose() {
    debugPrint("Detaching Listeners...");
    timer.cancel();
  }

  // Using Polling instead of WebSockets
  attach() async {
    debugPrint("Attaching Listeners...");
    var data = await getAllItems();
    ref.read(homeProvider).updateItems(data);

    timer = Timer.periodic(
      const Duration(seconds: 10),
      (timer) async {
        if (context.mounted) {
          var data = await getAllItems();
          ref.read(homeProvider).updateItems(data);
        }
      },
    );
  }

  Future<List<MilletItem>> getAllItems() async {
    var provider = ref.read(authProvider);
    if (provider.isFarmer()) {
      return await getAllFarmerItems(provider.getCurrentUser()!.id);
    }
    return getAll();
  }

  Future<List<MilletItem>> getAll() async {
    var response = await http.get(
      Uri.parse("$API_URL/list/getAll"),
    );
    debugPrint(response.body);

    Map data = json.decode(response.body);
    if (data["statusCode"] == 200) {
      List dataMap = data["data"];
      List<MilletItem> list = [];

      for (var e in dataMap) {
        list.add(MilletItem.fromMap(e));
      }
      return list;
    }
    return [];
  }
}

Future<List<MilletItem>> getAllFarmerItems(String id) async {
  var response = await http.get(
    Uri.parse("$API_URL/list/getAll/$id"),
  );
  debugPrint(response.body);
  Map data = json.decode(response.body);

  if (data["statusCode"] == 200) {
    List dataMap = data["data"];
    List<MilletItem> list = [];

    for (var e in dataMap) {
      list.add(MilletItem.fromMap(e));
    }

    return list;
  }
  return [];
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
        "price": price,
        "comments": [],
      },
    ),
  );
  print(response.body);
}

Future<MilletItem?> getItemById(String id) async {
  var response = await http.get(Uri.parse("$API_URL/list/getItem/$id"));
  debugPrint(response.body);
  Map data = json.decode(response.body);

  if (data["statusCode"] == 200) {
    MilletItem item = MilletItem.fromMap(data["data"]);
    return item;
  }
  return null;
}
