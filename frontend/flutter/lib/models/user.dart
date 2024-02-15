import 'dart:convert';

import 'package:collection/collection.dart';

class User {
  Location location;
  String id;
  String email;
  String phone;
  String name;
  String password;
  String userType;
  List<dynamic> images;
  DateTime createdAt;

  User({
    required this.location,
    required this.id,
    required this.email,
    required this.phone,
    required this.name,
    required this.password,
    required this.userType,
    required this.images,
    required this.createdAt,
  });

  User copyWith({
    Location? location,
    String? id,
    String? email,
    String? phone,
    String? name,
    String? password,
    String? userType,
    List<dynamic>? images,
    DateTime? createdAt,
  }) {
    return User(
      location: location ?? this.location,
      id: id ?? this.id,
      email: email ?? this.email,
      phone: phone ?? this.phone,
      name: name ?? this.name,
      password: password ?? this.password,
      userType: userType ?? this.userType,
      images: images ?? this.images,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'location': location.toMap(),
      '_id': id,
      'email': email,
      'phone': phone,
      'name': name,
      'password': password,
      'userType': userType,
      'images': images,
      'createdAt': createdAt.toIso8601String(),
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      location: Location.fromMap(map['location']),
      id: map['_id'] ?? '',
      email: map['email'] ?? '',
      phone: map['phone'] ?? '',
      name: map['name'] ?? '',
      password: map['password'] ?? '',
      userType: map['userType'] ?? '',
      images: List<dynamic>.from(map['images']),
      createdAt: DateTime.parse(map['createdAt']),
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) => User.fromMap(json.decode(source));

  @override
  String toString() {
    return 'User(location: $location, _id: $id, email: $email, phone: $phone, name: $name, password: $password, userType: $userType, images: $images, createdAt: $createdAt)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    final listEquals = const DeepCollectionEquality().equals;

    return other is User &&
        other.location == location &&
        other.id == id &&
        other.email == email &&
        other.phone == phone &&
        other.name == name &&
        other.password == password &&
        other.userType == userType &&
        listEquals(other.images, images) &&
        other.createdAt == createdAt;
  }

  @override
  int get hashCode {
    return location.hashCode ^
        id.hashCode ^
        email.hashCode ^
        phone.hashCode ^
        name.hashCode ^
        password.hashCode ^
        userType.hashCode ^
        images.hashCode ^
        createdAt.hashCode;
  }
}

class Location {
  String type;
  List<double> coordinates;

  Location({
    required this.type,
    required this.coordinates,
  });

  Location copyWith({
    String? type,
    List<double>? coordinates,
  }) {
    return Location(
      type: type ?? this.type,
      coordinates: coordinates ?? this.coordinates,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'type': type,
      'coordinates': coordinates,
    };
  }

  factory Location.fromMap(Map<String, dynamic> map) {
    return Location(
      type: map['type'] ?? '',
      coordinates: List<double>.from(map['coordinates']),
    );
  }

  String toJson() => json.encode(toMap());

  factory Location.fromJson(String source) =>
      Location.fromMap(json.decode(source));

  @override
  String toString() => 'Location(type: $type, coordinates: $coordinates)';

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    final listEquals = const DeepCollectionEquality().equals;

    return other is Location &&
        other.type == type &&
        listEquals(other.coordinates, coordinates);
  }

  @override
  int get hashCode => type.hashCode ^ coordinates.hashCode;
}
