import 'dart:async';
import 'dart:convert';

import 'package:fresh_nest/core/cart/application/cart_provider.dart';
import 'package:fresh_nest/data/cache/app_cache.dart';
import 'package:fresh_nest/globals.dart';
import 'package:fresh_nest/models/cart_item.dart';
import "package:fresh_nest/secrets.dart";
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;

class CartManager {
  final BuildContext context;
  Timer? timer;
  final WidgetRef ref;

  CartManager(this.context, this.ref, {bool poll = true}) {
    if (poll) {
      attach();
    }
  }

  dispose() {
    debugPrint("[cart_manager] Detaching Listeners...");
    if (timer != null) {
      timer!.cancel();
    }
  }

  // Using Polling instead of WebSockets
  attach() async {
    debugPrint("[cart_manager] Attaching Listeners...");
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
    if (appState.value.user == null) return [];
    var response = await http.get(
      Uri.parse("$API_URL/cart/get/${appState.value.user!.id}"),
    );

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
    var userId = appState.value.user!.id;
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

    showToast("Added Item to cart");
  }

  Future<void> removeItemFromCart({
    required String itemId,
  }) async {
    var userId = appState.value.user!.id;
    var response = await http.post(
      Uri.parse("$API_URL/cart/remove"),
      headers: {"content-type": "application/json"},
      body: json.encode(
        {
          "userId": userId,
          "itemId": itemId,
        },
      ),
    );

    showToast("Removed Item from Cart");
  }
}
