import 'package:agro_millets/models/comment.dart';
import 'package:agro_millets/models/millet_item.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final commentProvider =
    ChangeNotifierProvider<CommentProvider>((ref) => CommentProvider());

class CommentProvider extends ChangeNotifier {
  List<CommentItem> _items = [];

  List<CommentItem> getComments() => [..._items];

  void updateItems(List<CommentItem> items) {
    if (listEquals(items, _items)) return;
    print("Updating Comments...");
    _items = items;
    notifyListeners();
  }
}
