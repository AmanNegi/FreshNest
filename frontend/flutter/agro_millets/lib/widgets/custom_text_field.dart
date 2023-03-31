import 'package:agro_millets/colors.dart';
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
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10.0),
      decoration: BoxDecoration(
        color: lightColor.withOpacity(0.05),
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: TextField(
        keyboardType: keyboardType,
        onTapOutside: (e) => FocusScope.of(context).unfocus(),
        onChanged: (e) => onChanged(e),
        decoration: InputDecoration(
          border: InputBorder.none,
          label: label.isNotEmpty ? Text(label) : null,
          hintText: hint,
        ),
      ),
    );
  }
}
