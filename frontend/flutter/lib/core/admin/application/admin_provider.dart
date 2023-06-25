import 'package:fresh_nest/models/millet_item.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final adminProvider =
    ChangeNotifierProvider<AdminProvider>((ref) => AdminProvider());

class AdminProvider extends ChangeNotifier {
  List<MilletItem> _recentItems = [];

  List<MilletItem> getItems() => [..._recentItems];

  void updateItems(List<MilletItem> items) {
    if (listEquals(items, _recentItems)) return;
    _recentItems = items;
    notifyListeners();
  }
}
