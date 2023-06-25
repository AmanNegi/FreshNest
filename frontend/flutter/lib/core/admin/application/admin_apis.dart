import 'dart:convert';

import 'package:fresh_nest/data/cache/app_cache.dart';
import 'package:fresh_nest/models/millet_item.dart';
import 'package:fresh_nest/models/user.dart';
import 'package:fresh_nest/secrets.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AdminAPIs {
  // http://localhost:3000/api/auth/getAll

  static Future<List<User>> getAllUsers() async {
    List<User> listOfUsers = [];
    String userId = appState.value.user!.id;
    var response = await http.post(
      Uri.parse("$API_URL/auth/getAll"),
      body: {"adminId": userId},
    );

    if (response.body.isNotEmpty) {
      var data = json.decode(response.body);
      if (data["statusCode"] == 200) {
        List list = data["data"] as List;
        for (var e in list) {
          listOfUsers.add(User.fromMap(e));
        }
      }
    }
    return listOfUsers;
  }

  static Future<List<MilletItem>> getAllItems() async {
    var response = await http.get(
      Uri.parse("$API_URL/list/getAll"),
    );

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

  static Future<List<MilletItem>> getRecentItems() async {
    var response = await http.get(
      Uri.parse("$API_URL/list/getRecent"),
    );

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
