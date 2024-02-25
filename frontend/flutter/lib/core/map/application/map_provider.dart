import 'package:flutter/material.dart';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fresh_nest/models/user.dart';

final mapProvider = ChangeNotifierProvider<MapProvider>((ref) => MapProvider());

class MapProvider extends ChangeNotifier {
  List<User> _stores = [];

  void setStores(List<User> list) {
    _stores = list;
    notifyListeners();
  }

  List<User> getStores() => [..._stores];
}
