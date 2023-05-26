import 'package:flutter/material.dart';

class LargeText extends StatelessWidget {
  final String text;
  const LargeText(this.text,{super.key});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: const TextStyle(
        fontSize: 20,
        fontWeight: FontWeight.w700,
      ),
    );
  }
}
