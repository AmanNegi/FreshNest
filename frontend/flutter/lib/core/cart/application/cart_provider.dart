import 'package:fresh_nest/data/auth_state_repository.dart';
import 'package:fresh_nest/data/cache/app_cache.dart';
import 'package:fresh_nest/globals.dart';
import 'package:fresh_nest/models/cart_item.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final cartProvider =
    ChangeNotifierProvider<CartProvider>((ref) => CartProvider());

class CartProvider extends ChangeNotifier {
  List<CartItem> _cart = [];

  bool addItemToCart(CartItem item) {
    if (_cart.contains(item)) {
      showToast("Item already in cart");
      return false;
    }

    _cart = [..._cart, item];
    appCache.updateAppCache(AppState(
      cart: [CartItem(count: 1, item: item.item), ...appState.value.cart],
      user: appState.value.user,
      isLoggedIn: appState.value.isLoggedIn,
    ));
    notifyListeners();
    return true;
  }

  removeItemFromCart(String itemId) {
    var cart = appState.value.cart;
    cart.removeWhere((element) => element.item == itemId);

    setCart(cart);
  }

  setCart(List<CartItem> list) {
    _cart = list;
    appCache.updateAppCache(AppState(
      cart: list,
      user: appState.value.user,
      isLoggedIn: appState.value.isLoggedIn,
    ));

    notifyListeners();
  }

  List<CartItem> getCart() => [..._cart];
}

addCartToBackend() {}
fetchCartFromBackend() {}
