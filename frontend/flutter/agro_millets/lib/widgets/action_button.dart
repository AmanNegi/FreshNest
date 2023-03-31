import 'package:flutter/material.dart';

import '../colors.dart';

class ActionButton extends StatefulWidget {
  final String text;
  final Function onPressed;
  final Color? fillColor;
  final bool isFilled;
  const ActionButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.fillColor,
    this.isFilled = true,
  }) : super(key: key);

  @override
  State<ActionButton> createState() => _ActionButtonState();
}

class _ActionButtonState extends State<ActionButton> {
  late double width, height;

  @override
  Widget build(BuildContext context) {
    height = MediaQuery.of(context).size.height;
    width = MediaQuery.of(context).size.width;

    return MouseRegion(
      child: GestureDetector(
        onTap: () {
          widget.onPressed();
        },
        child: Container(
          height: 0.06 * height,
          width: double.maxFinite,
          decoration: BoxDecoration(
            color: widget.isFilled ? lightColor : Colors.transparent,
            border: widget.isFilled
                ? null
                : Border.all(
                    color: Theme.of(context).buttonTheme.colorScheme!.primary,
                  ),
            borderRadius: BorderRadius.circular(10.0),
          ),
          child: Center(
            child: Text(
              widget.text,
              style: TextStyle(
                color: widget.isFilled
                    ? Colors.white
                    : Theme.of(context).primaryColor,
                fontSize: 17,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
