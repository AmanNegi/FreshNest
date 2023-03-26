import 'dart:convert';

import "package:agro_millets/secrets.dart";
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AuthManager {
  final BuildContext context;
  const AuthManager(this.context);

  Future<void> loginUsingEmailPassword({
    required String email,
    required String password,
  }) async {
    print(email + password);
    var response = await http.post(
      Uri.parse("$DB_URL/auth/login"),
      headers: {
        "Content-Type": "application/json",
      },
      body: json.encode({
        "email": email,
        "password": password,
      }),
    );
    print(response.request.toString());
    print(response.body);
    //TODO: Wrap mongoose validation response as error response format
  }

  Future<void> signUpUsingEmailPassword({
    required String name,
    required String email,
    required String password,
    required String phone,
    required String userType,
  }) async {
    var response = await http.post(
      Uri.parse("$DB_URL/auth/signup"),
      body: {
        "name": name,
        "email": email,
        "password": password,
        "phone": phone,
        "userType": userType,
      },
    );
    print(response.body);
    //TODO: Wrap mongoose validation response as error response format
  }
}
