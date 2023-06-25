import 'package:fresh_nest/colors.dart';
import 'package:fresh_nest/globals.dart';
import 'package:flutter/material.dart';

class CustomTextField extends StatefulWidget {
  final String label;
  final String hint;
  final String value;

  final bool isPassword;
  final bool isEditable;

  final Function? onChanged;
  final Function? onSubmitted;
  final TextInputType keyboardType;

  final TextEditingController? controller;

  const CustomTextField({
    super.key,
    this.label = "",
    this.hint = "",
    this.value = "",
    this.isPassword = false,
    this.isEditable = true,
    this.onChanged,
    this.onSubmitted,
    this.keyboardType = TextInputType.text,
    this.controller,
  });

  @override
  State<CustomTextField> createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  late bool showPassword;

  @override
  void initState() {
    showPassword = false;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10.0),
      decoration: BoxDecoration(
        color: lightColor.withOpacity(0.05),
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: GestureDetector(
        onTap: () {
          if (!widget.isEditable) {
            showToast("Field is not editable");
          }
        },
        child: TextField(
          enabled: widget.isEditable,
          decoration: InputDecoration(
            border: InputBorder.none,
            label: widget.label.isNotEmpty ? Text(widget.label) : null,
            hintText: widget.hint,
            suffixIcon: getSuffixIcon(),
          ),
          keyboardType: widget.keyboardType,
          controller: widget.controller ??
              (widget.value.isEmpty
                  ? null
                  : TextEditingController(text: widget.value)),
          obscureText: widget.isPassword ? !showPassword : false,
          onTapOutside: (e) => FocusScope.of(context).unfocus(),
          onSubmitted: (value) {
            if (widget.onSubmitted != null) {
              widget.onSubmitted!(value);
            }
          },
          onChanged: (e) {
            if (widget.onChanged != null) {
              widget.onChanged!(e);
            }
          },
        ),
      ),
    );
  }

  Widget? getSuffixIcon() {
    if (!widget.isPassword) {
      return null;
    }

    return IconButton(
      onPressed: () => setState(() => showPassword = !showPassword),
      icon: showPassword
          ? const Icon(Icons.remove_red_eye)
          : const Icon(Icons.remove_red_eye_outlined),
    );
  }
}
