import 'dart:convert';

import 'package:agro_millets/core/home/presentation/home_page.dart';
import 'package:agro_millets/data/auth_state_repository.dart';
import 'package:agro_millets/globals.dart';
import 'package:agro_millets/models/user.dart';
import "package:agro_millets/secrets.dart";
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:http/http.dart' as http;

class AuthManager {
  final BuildContext context;
  final WidgetRef ref;
  const AuthManager(this.context, this.ref);

  Future<int> loginUsingEmailPassword({
    required String email,
    required String password,
  }) async {
    ref.read(authProvider).clearUserData();
    var response = await http.post(
      Uri.parse("$API_URL/auth/login"),
      headers: {
        "Content-Type": "application/json",
      },
      body: json.encode({
        "email": email,
        "password": password,
      }),
    );
    debugPrint(response.body);
    Map<String, dynamic> data = json.decode(response.body);

    if (data["statusCode"] == 200) {
      ref.read(authProvider).updateUserData(User.fromMap(data["data"]));
      if (context.mounted) {
        goToPage(context, const HomePage(), clearStack: true);
      }
      return 1;
    } else {
      showToast(data["message"]);
      return -1;
    }
  }

  Future<void> googleAuth() async {
    GoogleSignIn googleSignIn = GoogleSignIn(
      scopes: [
        'email',
        'https://www.googleapis.com/auth/contacts.readonly',
      ],
    );

    try {
      await googleSignIn.signOut();
      var data = await googleSignIn.signIn();
      if (data != null) {
        User? user = await searchForUser(data.email);
        if (user == null) {
          await signUpUsingEmailPassword(
              name: data.displayName ?? data.email,
              email: data.email,
              // TODO: Take these properties after google sign in success
              password: "~",
              phone: "000",
              userType: "customer");
        } else {
          await loginUsingEmailPassword(
            email: user.email,
            password: "~",
          );
        }
      }
    } catch (e) {
      debugPrint("An Exception Occurred: $e");
    }
  }

  Future<int> signUpUsingEmailPassword({
    required String name,
    required String email,
    required String password,
    required String phone,
    required String userType,
  }) async {
    ref.read(authProvider).clearUserData();
    var response = await http.post(
      Uri.parse("$API_URL/auth/signup"),
      body: {
        "name": name,
        "email": email,
        "password": password,
        "phone": phone,
        "userType": userType,
      },
    );
    debugPrint(response.body);
    Map<String, dynamic> data = json.decode(response.body);

    if (data["statusCode"] == 200) {
      ref.read(authProvider).updateUserData(User.fromMap(data["data"]));

      if (context.mounted) {
        goToPage(context, const HomePage(), clearStack: true);
      }

      return 1;
    } else {
      showToast(data["message"]);
      return -1;
    }
  }

  Future<User?> searchForUser(String email) async {
    var response = await http.post(
      Uri.parse("$API_URL/auth/exists"),
      body: {"email": email},
    );

    if (response.body.isNotEmpty) {
      var data = json.decode(response.body);
      if (data["statusCode"] == 200) {
        return User.fromMap(data["data"]);
      }
    }
    return null;
  }
}
