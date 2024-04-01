import 'dart:convert';

import 'package:fresh_nest/core/auth/application/location_service.dart';
import 'package:fresh_nest/core/auth/presentation/additional_details_page.dart';
import 'package:fresh_nest/data/auth_state_repository.dart';
import 'package:fresh_nest/globals.dart';
import 'package:fresh_nest/models/user.dart';
import "package:fresh_nest/secrets.dart";
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:http/http.dart' as http;

class AuthManager {
  final BuildContext context;
  final WidgetRef ref;
  AuthManager(this.context, this.ref);

  ValueNotifier<bool> isLoading = ValueNotifier(false);

  Future<int> loginUsingEmailPassword({
    required String email,
    required String password,
  }) async {
    // ref.read(authProvider).clearUserData();
    isLoading.value = true;
    try {
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
      isLoading.value = false;
      Map data = json.decode(response.body);

      if (data["statusCode"] == 200) {
        ref.read(authProvider).updateUserData(User.fromMap(data["data"]));
        return 1;
      } else {
        showToast(data["message"]);
        return -1;
      }
    } catch (error) {
      isLoading.value = false;
      showToast("An error occurred!");
      debugPrint(error.toString());
      return -1;
    }
  }

  Future<int> googleAuth() async {
    print("Google Auth Called...");
    if (locationService.locationData == null) {
      showToast("Please enable location services to continue!");
      await locationService.requestLocation();
      return -1;
    }

    GoogleSignIn googleSignIn = GoogleSignIn(
      scopes: [
        'email',
        'https://www.googleapis.com/auth/contacts.readonly',
      ],
    );

    try {
      isLoading.value = true;
      await googleSignIn.signOut();
      var data = await googleSignIn.signIn();
      print("Data: " + data.toString());
      if (data != null) {
        User? user = await searchForUser(data.email);
        print(user);
        if (user == null) {
          // ignore: use_build_context_synchronously
          goToPage(
            context,
            AdditionalDetailsPage(
              email: data.email,
              name: data.displayName ?? data.email,
            ),
          );
          return -1;
          // return await signUpUsingEmailPassword(
          //   name: data.displayName ?? data.email,
          //   email: data.email,
          //   // TODO: Take these properties after google sign in success
          //   password: "~",
          //   phone: "000",
          //   userType: "customer",
          //   location: LatLng(
          //     locationService.locationData!.latitude!,
          //     locationService.locationData!.longitude!,
          //   ),
          // );
        } else {
          ref.read(authProvider).updateUserData(user);
          return 1;
          // return await loginUsingEmailPassword(
          //   email: user.email,
          //   password: "~",
          // );
        }
      }
      isLoading.value = false;
      return 0;
    } catch (e) {
      debugPrint("An Exception Occurred: $e");
      isLoading.value = false;
      return 0;
    }
  }

  Future<int> signUpUsingEmailPassword({
    required String name,
    required String email,
    required String password,
    required String phone,
    required String userType,
    required LatLng location,
  }) async {
    ref.read(authProvider).clearUserData();
    isLoading.value = true;
    try {
      var response = await http.post(
        Uri.parse("$API_URL/auth/signup"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "name": name,
          "email": email,
          "password": password,
          "phone": phone,
          "userType": userType,
          "location": {
            "type": "Point",
            "coordinates": [location.latitude, location.longitude]
          }
        }),
      );
      isLoading.value = false;
      print(response.body);
      Map<String, dynamic> data = json.decode(response.body);
      print(data);

      if (data["statusCode"] == 200) {
        ref.read(authProvider).updateUserData(User.fromMap(data["data"]));

        return 1;
      } else {
        showToast(data["message"]);
        return -1;
      }
    } catch (err) {
      print(err);
      showToast(err.toString());
      isLoading.value = false;
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
