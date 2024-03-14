import "package:flutter/material.dart";
import "package:flutter_riverpod/flutter_riverpod.dart";
import "package:fresh_nest/colors.dart";
import "package:fresh_nest/core/cart/application/cart_provider.dart";
import "package:fresh_nest/core/cart/presentation/cart_page.dart";
import "package:fresh_nest/data/cache/app_cache.dart";
import "package:fresh_nest/globals.dart";
import "package:fresh_nest/widgets/action_button.dart";

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
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        boxShadow: [
          BoxShadow(
            blurRadius: 5.0, 
            color: Colors.black.withOpacity(0.025),
            offset: const Offset(0,-2.0),
            spreadRadius: 10,
          )
        ]
      ),
      duration: const Duration(milliseconds: 200),
      curve: Curves.easeInToLinear,
      padding: const EdgeInsets.symmetric(horizontal: 15.0),
      child: cart.isEmpty
          ? Container()
          : Row(
              children: [
                Text(
                  "${ref.watch(cartProvider).getCart().length} items in cart",
                ),
                const Spacer(),
                GestureDetector(
                  onTap: () {
                    goToPage(context, const CartPage());
                  },
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 15.0,
                      vertical: 10.0,
                    ),
                    decoration: BoxDecoration(
                        color: lightColor,
                        borderRadius: BorderRadius.circular(60.0)),
                    child: const Row(
                      children: [
                        Icon(
                          Icons.shopping_cart,
                          color: Colors.white,
                          size: 16,
                        ),
                        SizedBox(width: 10),
                        Text(
                          "Go to Cart",
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
    );
  }
}
