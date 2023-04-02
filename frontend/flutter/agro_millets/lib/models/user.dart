// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class User {
  final String id;
  final String name;
  final String email;
  final String phone;
  final String userType;

  const User({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    required this.userType,
  });

  @override
  List<Object> get props => [name, email, phone, userType, id];

  User copyWith(
      {String? name,
      String? email,
      String? phone,
      String? userType,
      String? id}) {
    return User(
      name: name ?? this.name,
      email: email ?? this.email,
      phone: phone ?? this.phone,
      userType: userType ?? this.userType,
      id: id ?? this.id,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'name': name,
      'email': email,
      'phone': phone,
      'userType': userType,
      "_id": id,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      name: map['name'] as String,
      email: map['email'] as String,
      phone: map['phone'] ?? "",
      userType: map['userType'] as String,
      id: map['_id'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) =>
      User.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  bool get stringify => true;
}
