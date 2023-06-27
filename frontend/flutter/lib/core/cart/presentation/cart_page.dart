import 'package:fresh_nest/colors.dart';
import 'package:fresh_nest/core/cart/application/cart_manager.dart';
import 'package:fresh_nest/core/cart/application/cart_provider.dart';
import 'package:fresh_nest/core/home/application/home_manager.dart';
import 'package:fresh_nest/core/home/presentation/widgets/agro_item.dart';
import 'package:fresh_nest/globals.dart';
import 'package:fresh_nest/models/cart_item.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';

class CartPage extends ConsumerStatefulWidget {
  const CartPage({super.key});

  @override
  ConsumerState<CartPage> createState() => _CartPageState();
}

class _CartPageState extends ConsumerState<CartPage> {
  late CartManager cartManager;

  @override
  void initState() {
    cartManager = CartManager(context, ref);
    super.initState();
  }

  @override
  void dispose() {
    cartManager.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Your Cart"),
      ),
      body: Stack(
        children: [
          Positioned.fill(
            child: Consumer(
              builder: (context, ref, child) {
                List<CartItem> cart = ref.watch(cartProvider).getCart();

                return MasonryGridView.count(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  padding: const EdgeInsets.only(
                    left: 15,
                    right: 15,
                    bottom: 30.0,
                  ),
                  crossAxisCount: 2,
                  mainAxisSpacing: 10,
                  crossAxisSpacing: 10,
                  itemCount: cart.length,
                  itemBuilder: (context, index) {
                    return FutureBuilder(
                      future: getItemById(cart[index].item),
                      builder: (context, snapshot) {
                        if (snapshot.hasData && snapshot.data != null) {
                          return AgroItem(
                            index: index,
                            item: snapshot.data!,
                            showAddCartIcon: false,
                          );
                        } else if (snapshot.hasError) {
                          return const Center(
                            child: Text("Error Occured"),
                          );
                        }
                        return const Center(
                          // child: CircularProgressIndicator(),
                        );
                      },
                    );
                  },
                );
              },
            ),
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              decoration:
                  BoxDecoration(color: Theme.of(context).cardColor, boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.05),
                  spreadRadius: 1.0,
                  blurRadius: 5.0,
                  offset: const Offset(0.0, -2),
                )
              ]),
              child: Container(
                margin: const EdgeInsets.symmetric(
                    horizontal: 15.0, vertical: 15.0),
                height: 0.075 * getHeight(context),
                decoration: BoxDecoration(
                  color: lightColor,
                  borderRadius: BorderRadius.circular(15.0),
                ),
                child: const Center(
                  child: Text(
                    "Order Now!",
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                      fontSize: 15,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
