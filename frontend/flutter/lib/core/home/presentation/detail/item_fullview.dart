import 'package:flutter/material.dart';
import 'package:fresh_nest/globals.dart';

class ItemFullView extends StatelessWidget {
  final String src;
  const ItemFullView({
    Key? key,
    required this.src,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back_ios,
          ),
          onPressed: () => Navigator.pop(context),
        ),
        elevation: 0,
        centerTitle: true,
      ),
      body: Center(
        child: Image.network(
          src,
          height: 0.5 * getHeight(context),
          fit: BoxFit.contain,
          width: double.infinity,
        ),
      ),
    );
  }
}
