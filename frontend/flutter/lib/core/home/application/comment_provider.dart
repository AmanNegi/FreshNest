import 'package:fresh_nest/models/comment.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final commentProvider =
    ChangeNotifierProvider<CommentProvider>((ref) => CommentProvider());

class CommentProvider extends ChangeNotifier {
  List<CommentItem> _items = [];

  List<CommentItem> getComments() => [..._items];

  void updateItems(List<CommentItem> items, {bool notify = true}) {
    if (listEquals(items, _items)) return;
    _items = items;
    if (notify) notifyListeners();
  }
}
