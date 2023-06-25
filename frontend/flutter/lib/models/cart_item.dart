// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:fresh_nest/models/millet_item.dart';

class CartItem {
  final String item;
  final int count;

  CartItem({
    required this.item,
    required this.count,
  });


  CartItem copyWith({
    String? item,
    int? count,
  }) {
    return CartItem(
      item: item ?? this.item,
      count: count ?? this.count,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'item': item,
      'count': count,
    };
  }

  factory CartItem.fromMap(Map<String, dynamic> map) {
    return CartItem(
      item: map['item'] as String,
      count: map['count'] as int,
    );
  }

  String toJson() => json.encode(toMap());

  factory CartItem.fromJson(String source) => CartItem.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() => 'CartItem(item: $item, count: $count)';

  @override
  bool operator ==(covariant CartItem other) {
    if (identical(this, other)) return true;
  
    return 
      other.item == item &&
      other.count == count;
  }

  @override
  int get hashCode => item.hashCode ^ count.hashCode;
}
