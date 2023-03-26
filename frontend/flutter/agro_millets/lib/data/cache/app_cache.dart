import 'package:agro_millets/data/auth_state_repository.dart';
import 'package:flutter/material.dart';

class AppCache {
  ValueNotifier<AuthState> authState =
      ValueNotifier<AuthState>(AuthState.initial());
}

AppCache appCache = AppCache();
