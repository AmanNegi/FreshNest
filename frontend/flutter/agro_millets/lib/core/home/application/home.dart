import 'dart:convert';

import 'package:agro_millets/models/millet_item.dart';
import "package:agro_millets/secrets.dart";
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class HomeManager {
  final BuildContext context;
  const HomeManager(this.context);

  Future<List<MilletItem>> getAllItems() async {
    var response = await http.get(
      Uri.parse("$DB_URL/list/getAll"),
    );
    debugPrint(response.body);
    Map data = json.decode(response.body);
    List dataMap = data["data"];
    List<MilletItem> list = [];

    for (var e in dataMap) {
      list.add(MilletItem.fromMap(e));
    }

    return list;
  }

  Future<void> addItem({
    required String name,
    required String listedBy,
    required String description,
    required List<String> images,
    required double price,
  }) async {
    var response = await http.post(
      Uri.parse("$DB_URL/list/addItem"),
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
    print(response.body);
  }
}
