import 'package:equatable/equatable.dart';


class User extends Equatable {
  final String name;
  final String email;
  final String phone;
  final String usertype;

  const User({
    required this.name,
    required this.usertype,
    required this.email,
    required this.phone,
  });

  @override
  List<Object?> get props => [name, email, phone];
}
