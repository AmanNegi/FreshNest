import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final Function onChanged;
  final String label;
  final String hint;
  final TextInputType keyboardType;
  const CustomTextField({
    super.key,
    required this.onChanged,
    this.label = "",
    this.hint = "",
    this.keyboardType = TextInputType.text,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      keyboardType: keyboardType,
      onChanged: (e) => onChanged(e),
      decoration: InputDecoration(
        label: label.isNotEmpty ? Text(label) : null,
        hintText: hint,
      ),
    );
  }
}
