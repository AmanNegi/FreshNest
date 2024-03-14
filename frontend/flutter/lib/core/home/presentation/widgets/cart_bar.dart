import "package:flutter/material.dart";
import "package:flutter_riverpod/flutter_riverpod.dart";
import "package:fresh_nest/colors.dart";
import "package:fresh_nest/core/cart/application/cart_provider.dart";
import "package:fresh_nest/data/cache/app_cache.dart";

class CartBar extends ConsumerStatefulWidget {
  const CartBar({super.key});

  @override
  ConsumerState<CartBar> createState() => _CartBarState();
}

class _CartBarState extends ConsumerState<CartBar> {
  @override
  Widget build(BuildContext context) {
    if (appState.value.user == null &&
        appState.value.user!.userType != "customer") {
      return Container();
    }

    var cart = ref.watch(cartProvider).getCart();

    return AnimatedContainer(
      height: cart.isNotEmpty ? kToolbarHeight : 0,
      width: double.infinity,
      color: accentColor,
      duration: const Duration(milliseconds: 200),
      curve: Curves.easeInToLinear,
      child: cart.isEmpty
          ? Container()
          : Center(
              child: Text(
                "${ref.watch(cartProvider).getCart().length} items in cart",
                style: const TextStyle(color: Colors.white),
              ),
            ),
    );
  }
}
