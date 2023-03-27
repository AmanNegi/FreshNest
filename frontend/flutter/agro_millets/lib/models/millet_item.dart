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

  MilletItem({
    required this.name,
    required this.listedBy,
    required this.description,
    required this.price,
    required this.images,
    required this.id,
  });

  MilletItem copyWith({
    String? name,
    String? listedBy,
    String? description,
    String? id,
    double? price,
    List<dynamic>? images,
  }) {
    return MilletItem(
      name: name ?? this.name,
      listedBy: listedBy ?? this.listedBy,
      description: description ?? this.description,
      price: price ?? this.price,
      images: images ?? this.images,
      id: id ?? this.id,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'name': name,
      'listedBy': listedBy,
      'description': description,
      'price': price,
      'images': images,
      "_id": id,
    };
  }

  factory MilletItem.fromMap(Map<String, dynamic> map) {
    return MilletItem(
      name: map['name'] as String,
      listedBy: map['listedBy'] as String,
      description: map['description'] as String,
      price: map['price'] * 1.0,
      images: List<dynamic>.from((map['images'] as List<dynamic>)),
      id: map['_id'],
    );
  }

  String toJson() => json.encode(toMap());

  factory MilletItem.fromJson(String source) =>
      MilletItem.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'MilletItem(name: $name, listedBy: $listedBy, description: $description, price: $price, images: $images)';
  }

  @override
  bool operator ==(covariant MilletItem other) {
    if (identical(this, other)) return true;

    return other.id == id &&
        other.name == name &&
        other.listedBy == listedBy &&
        other.description == description &&
        other.price == price &&
        listEquals(other.images, images);
  }

  @override
  int get hashCode {
    return name.hashCode ^
        listedBy.hashCode ^
        description.hashCode ^
        price.hashCode ^
        images.hashCode;
  }
}
