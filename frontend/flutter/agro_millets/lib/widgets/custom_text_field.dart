import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final Function onChanged;
  final String label;
  final String hint;
  const CustomTextField({
    super.key,
    required this.onChanged,
    this.label = "",
    this.hint = "",
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      onChanged: (e) => onChanged(e),
      decoration: InputDecoration(
        label: label.isNotEmpty ? Text(label) : null,
        hintText: hint,
      ),
    );
  }
}
