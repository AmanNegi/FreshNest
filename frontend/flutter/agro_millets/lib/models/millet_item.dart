// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:flutter/foundation.dart';

class MilletItem {
  final String id;
  final String name;
  final String listedBy;
  final String description;
  final double price;
  final List<dynamic> images;
  final DateTime listedAt;

  MilletItem({
    required this.id,
    required this.name,
    required this.listedBy,
    required this.description,
    required this.price,
    required this.images,
    required this.listedAt,
  });

  MilletItem copyWith({
    String? id,
    String? name,
    String? listedBy,
    String? description,
    double? price,
    List<dynamic>? images,
    DateTime? listedAt,
  }) {
    return MilletItem(
      id: id ?? this.id,
      name: name ?? this.name,
      listedBy: listedBy ?? this.listedBy,
      description: description ?? this.description,
      price: price ?? this.price,
      images: images ?? this.images,
      listedAt: listedAt ?? this.listedAt,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      '_id': id,
      'name': name,
      'listedBy': listedBy,
      'description': description,
      'price': price,
      'images': images,
      'listedAt': listedAt.toIso8601String(),
    };
  }

  factory MilletItem.fromMap(Map<String, dynamic> map) {
    return MilletItem(
      id: map['_id'] as String,
      name: map['name'] as String,
      listedBy: map['listedBy'] as String,
      description: map['description'] as String,
      price: map['price'] * 1.0,
      images: List<dynamic>.from((map['images'] as List<dynamic>)),
      listedAt: DateTime.parse(map['listedAt']),
    );
  }

  String toJson() => json.encode(toMap());

  factory MilletItem.fromJson(String source) =>
      MilletItem.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'MilletItem(id: $id, name: $name, listedBy: $listedBy, description: $description, price: $price, images: $images, listedAt: $listedAt)';
  }

  @override
  bool operator ==(covariant MilletItem other) {
    if (identical(this, other)) return true;

    return other.id == id &&
        other.name == name &&
        other.listedBy == listedBy &&
        other.description == description &&
        other.price == price &&
        listEquals(other.images, images) &&
        other.listedAt == listedAt;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        name.hashCode ^
        listedBy.hashCode ^
        description.hashCode ^
        price.hashCode ^
        images.hashCode ^
        listedAt.hashCode;
  }
}
