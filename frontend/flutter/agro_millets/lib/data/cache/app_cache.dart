import 'package:agro_millets/data/auth_state_repository.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AppCache {
  final String _prefsKey = "Agro_Millets";

  ValueNotifier<AppState> appState =
      ValueNotifier<AppState>(AppState.initial());

  getDataFromDevice() async {
    var sharedPreferences = await SharedPreferences.getInstance();
    String? data = sharedPreferences.getString(_prefsKey);
    if (data == null) return;
    appState.value = AppState.fromJson(data);
    debugPrint("Data From Device: $data");
  }

  saveDataToDevice() async {
    var sharedPreferences = await SharedPreferences.getInstance();
    await sharedPreferences.setString(_prefsKey, appState.value.toJson());
    debugPrint("Saved Data to Device...");
  }

  updateAppCache(AppState state) {
    appState.value = state;
    saveDataToDevice();
  }

  clearAppCache() {
    appState.value = AppState.initial();
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
}

AppCache appCache = AppCache();
