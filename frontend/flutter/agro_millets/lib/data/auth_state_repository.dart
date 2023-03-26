// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:agro_millets/data/cache/app_cache.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:agro_millets/models/user.dart';

final authProvider =
    ChangeNotifierProvider<AuthProvider>((ref) => AuthProvider());

class AuthProvider extends ChangeNotifier {
  AuthState _authState = AuthState.initial();

  User? getCurrentUser() => _authState.user;
  bool isLoggedIn() => _authState.isLoggedIn;

  bool isAdmin() {
    return _authState.user == null
        ? false
        : _authState.user!.userType == "admin";
  }

  bool isFarmer() {
    return _authState.user == null
        ? false
        : _authState.user!.userType == "farmer";
  }

  enterApp(User user) {
    _authState = AuthState(isLoggedIn: true, user: user);
    appCache.authState.value = _authState;
    notifyListeners();
  }

  exitApp() {
    _authState = AuthState.initial();
    appCache.authState.value = _authState;
    notifyListeners();
  }
}

class AuthState {
  final bool isLoggedIn;
  final User? user;

  const AuthState({
    required this.user,
    this.isLoggedIn = false,
  });

  factory AuthState.initial() {
    return const AuthState(user: null, isLoggedIn: false);
  }
}
