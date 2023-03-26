import 'dart:convert';

import "package:agro_millets/secrets.dart";
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class HomeManager {
  final BuildContext context;
  const HomeManager(this.context);

  Future<void> getAllItems() async {
    var response = await http.get(
      Uri.parse("$DB_URL/list/getAll"),
    );
    print(response.body);
  }

  Future<void> addItem({
    required String name,
    required String listedBy,
    required String description,
    required List<String> images,
  }) async {
    var response = await http.post(
      Uri.parse("$DB_URL/auth/signup"),
      body: {
        "name": name,
        "email": listedBy,
        "password": description,
        "images": json.encode(images),
      },
    );
    print(response.body);
    //TODO: Wrap mongoose validation response as error response format
  }
}
