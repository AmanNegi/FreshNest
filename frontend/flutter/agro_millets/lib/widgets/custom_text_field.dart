import 'package:agro_millets/colors.dart';
import 'package:flutter/material.dart';

class CustomTextField extends StatefulWidget {
  final Function onChanged;
  final String label;
  final String hint;
  final TextInputType keyboardType;
  final bool isPassword;
  const CustomTextField({
    super.key,
    required this.onChanged,
    this.label = "",
    this.hint = "",
    this.keyboardType = TextInputType.text,
    this.isPassword = false,
  });

  @override
  State<CustomTextField> createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  late bool showPassword;

  @override
  void initState() {
    super.initState();
    showPassword = false;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10.0),
      decoration: BoxDecoration(
        color: lightColor.withOpacity(0.05),
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: TextField(
        keyboardType: widget.keyboardType,
        onChanged: (e) => widget.onChanged(e),
        obscureText: !showPassword,
        decoration: InputDecoration(
          border: InputBorder.none,
          label: widget.label.isNotEmpty ? Text(widget.label) : null,
          hintText: widget.hint,
          suffixIcon: !widget.isPassword
              ? null
              : IconButton(
                  onPressed: () {
                    setState(() {
                      showPassword = !showPassword;
                    });
                  },
                  icon: showPassword
                      ? const Icon(Icons.remove_red_eye)
                      : const Icon(Icons.remove_red_eye_outlined),
                ),
        ),
      ),
    );
  }
}
