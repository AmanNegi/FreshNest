import 'package:agro_millets/data/auth_state_repository.dart';
import 'package:agro_millets/data/cache/app_cache.dart';
import 'package:agro_millets/models/cart_item.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final cartProvider =
    ChangeNotifierProvider<CartProvider>((ref) => CartProvider());

class CartProvider extends ChangeNotifier {
  List<CartItem> _cart = [];

  addItemToCart(CartItem item) {
    _cart = [..._cart, item];
    appCache.updateAppCache(AppState(
      cart: [
        CartItem(count: 1, item: item.item),
        ...appCache.appState.value.cart
      ],
      user: appCache.appState.value.user,
      isLoggedIn: appCache.appState.value.isLoggedIn,
    ));
    notifyListeners();
  }

  setCart(List<CartItem> list) {
    _cart = list;
    appCache.updateAppCache(AppState(
      cart: list,
      user: appCache.appState.value.user,
      isLoggedIn: appCache.appState.value.isLoggedIn,
    ));

    notifyListeners();
  }

  List<CartItem> getCart() => [..._cart];
}

addCartToBackend() {}
fetchCartFromBackend() {}
