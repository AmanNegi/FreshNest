import 'package:fresh_nest/data/auth_state_repository.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';


ValueNotifier<AppState> appState = ValueNotifier(AppState.initial());

class AppCache {
  final String _prefsKey = "fresh_nest";

  getDataFromDevice() async {
    var sharedPreferences = await SharedPreferences.getInstance();
    String? data = sharedPreferences.getString(_prefsKey);
    if (data == null) return;
    appState.value = (AppState.fromJson(data));
    debugPrint("Data From Device: $data");
  }

  saveDataToDevice() async {
    var sharedPreferences = await SharedPreferences.getInstance();
    await sharedPreferences.setString(_prefsKey, appState.value.toJson());
    debugPrint("Saved Data to Device...");
  }

  updateAppCache(AppState state) {
    appState.value = (AppState.fromMap(state.toMap()));
    saveDataToDevice();
  }

  clearAppCache() {
    appState.value = (AppState.initial());
    saveDataToDevice();
  }

  String getUserName() {
    if (appState.value.user == null) {
      return "NA";
    }
    return appState.value.user!.name;
  }

  String getEmail() {
    if (appState.value.user == null) {
      return "NA";
    }
    return appState.value.user!.email;
  }

  bool isAdmin() {
    return appState.value.user == null
        ? false
        : appState.value.user!.userType == "admin";
  }

  bool isFarmer() {
    return appState.value.user == null
        ? false
        : appState.value.user!.userType == "farmer";
  }

  bool isCustomer() {
    return appState.value.user == null
        ? true
        : appState.value.user!.userType == "customer";
  }

  bool isLoggedIn() {
    if (appState.value.user == null || appState.value.user!.id == "") {
      return false;
    }

    return appState.value.isLoggedIn;
  }

  bool isOwnerOf(String id) {
    return appState.value.user!.id == id;
  }
}

AppCache appCache = AppCache();
