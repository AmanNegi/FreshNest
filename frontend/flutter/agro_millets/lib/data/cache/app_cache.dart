import 'package:agro_millets/data/auth_state_repository.dart';
import 'package:flutter/material.dart';

class AppCache {
  ValueNotifier<AuthState> authState =
      ValueNotifier<AuthState>(AuthState.initial());

  String getUserName() {
    if (authState.value.user == null) {
      return "NA";
    }
    return authState.value.user!.name;
  }

  String getEmail() {
    if (authState.value.user == null) {
      return "NA";
    }
    return authState.value.user!.email;
  }
}

AppCache appCache = AppCache();
