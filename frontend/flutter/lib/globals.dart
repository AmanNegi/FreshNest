import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

Future goToPage(BuildContext context, Widget destination,
    {bool clearStack = false}) {
  if (clearStack) {
    return Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (context) => destination), (route) => false);
  }
  return Navigator.of(context)
      .push(MaterialPageRoute(builder: (context) => destination));
}

showToast(String message) {
  Fluttertoast.showToast(msg: message);
}

double getWidth(context) => MediaQuery.of(context).size.width;
double getHeight(context) => MediaQuery.of(context).size.height;
