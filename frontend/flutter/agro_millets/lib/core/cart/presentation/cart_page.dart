import 'package:agro_millets/colors.dart';
import 'package:agro_millets/core/home/presentation/widgets/grid_item.dart';
import 'package:agro_millets/data/cache/app_cache.dart';
import 'package:agro_millets/globals.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';

class CartPage extends StatefulWidget {
  const CartPage({super.key});

  @override
  State<CartPage> createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Your Cart"),
      ),
      body: Stack(
        children: [
          Positioned.fill(
            child: ValueListenableBuilder(
              valueListenable: appCache.appState,
              builder: (context, value, child) {
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
                  itemCount: value.cart.length,
                  itemBuilder: (context, index) {
                    return AgroItem(
                      index: index,
                      item: value.cart[index].item,
                      showAddCartIcon: false,
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
