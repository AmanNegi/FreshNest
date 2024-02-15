import 'package:flutter/material.dart';
import 'package:fresh_nest/core/map/application/map_provider.dart';
import 'package:http/http.dart' as http;

import 'dart:async';
import 'dart:convert';

import 'package:fresh_nest/models/user.dart';
import "package:fresh_nest/secrets.dart";
import 'package:flutter_riverpod/flutter_riverpod.dart';

class MapManager {
  final BuildContext context;
  final WidgetRef ref;

  MapManager(this.context, this.ref, {bool poll = true}){
    init();
  }

  init()async{
    if(ref.read(mapProvider).getStores().isEmpty) {
      final res = await getStores();
      ref.read<MapProvider>(mapProvider).setStores(res);
    }
  }


  Future<List<User>> getStores() async {
    var response = await http.get(
      Uri.parse("$API_URL/list/getFarms"),
    );

    Map data = json.decode(response.body);
    if (data["statusCode"] == 200) {
      List dataMap = data["data"];
      List<User> list = [];

      for (var e in dataMap) {
        list.add(User.fromMap(e));
      }
      return list;
    }
    return [];
  }
}