import 'dart:async';
import 'dart:convert';

import 'package:agro_millets/core/cart/application/cart_provider.dart';
import 'package:agro_millets/data/cache/app_cache.dart';
import 'package:agro_millets/models/cart_item.dart';
import "package:agro_millets/secrets.dart";
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;

class CartManager {
  final BuildContext context;
  late Timer timer;
  final WidgetRef ref;

  CartManager(this.context, this.ref, {bool poll = true}) {
    if (poll) {
      attach();
    }
  }

  dispose() {
    debugPrint("Detaching Listeners...");
    timer.cancel();
  }

  // Using Polling instead of WebSockets
  attach() async {
    debugPrint("Attaching Listeners...");
    var data = await getCart();
    ref.read(cartProvider).setCart(data);

    timer = Timer.periodic(
      const Duration(seconds: 10),
      (timer) async {
        if (context.mounted) {
          var data = await getCart();
          ref.read(cartProvider).setCart(data);
        }
      },
    );
  }

  Future<List<CartItem>> getCart() async {
    var response = await http.get(
      Uri.parse("$API_URL/cart/get/${appCache.appState.value.user!.id}"),
    );
    debugPrint(response.body);

    Map data = json.decode(response.body);
    if (data["statusCode"] == 200) {
      List dataMap = data["data"]["items"];
      List<CartItem> list = [];

      for (var e in dataMap) {
        list.add(CartItem.fromMap(e));
      }
      return list;
    }
    return [];
  }

  Future<void> addItemToCart({
    required CartItem item,
  }) async {
    var userId = appCache.appState.value.user!.id;
    var response = await http.post(
      Uri.parse("$API_URL/cart/add"),
      headers: {"content-type": "application/json"},
      body: json.encode(
        {
          "userId": userId,
          "item": item.item,
          "count": item.count,
        },
      ),
    );
    print(response.body);
  }
}
