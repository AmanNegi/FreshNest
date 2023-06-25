import 'package:fresh_nest/models/millet_item.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final homeProvider =
    ChangeNotifierProvider<HomeProvider>((ref) => HomeProvider());

class HomeProvider extends ChangeNotifier {
  List<MilletItem> _items = [];

  List<MilletItem> getItems() => [..._items];

  void updateItems(List<MilletItem> items) {
    if (listEquals(items, _items)) return;
    _items = items;
    notifyListeners();
  }
}
