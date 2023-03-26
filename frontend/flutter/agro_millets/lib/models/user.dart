import 'package:equatable/equatable.dart';

enum UserType { ADMIN, FARMER, CUSTOMER }

class User extends Equatable {
  final String name;
  final String email;
  final String phoneNumber;
  final UserType usertype;

  const User({
    required this.name,
    required this.usertype,
    required this.email,
    required this.phoneNumber,
  });

  @override
  List<Object?> get props => [name, email, phoneNumber];
}
