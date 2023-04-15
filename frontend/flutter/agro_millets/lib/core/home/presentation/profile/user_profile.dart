import 'package:agro_millets/colors.dart';
import 'package:agro_millets/data/auth_state_repository.dart';
import 'package:agro_millets/globals.dart';
import 'package:agro_millets/widgets/custom_text_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class UserProfile extends StatefulWidget {
  const UserProfile({super.key});

  @override
  State<UserProfile> createState() => _UserProfileState();
}

class _UserProfileState extends State<UserProfile> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text("Profile"),
      ),
      body: Consumer(
        builder: (context, ref, child) {
          var user = ref.read(authProvider).getCurrentUser();

          return ListView(
            padding: const EdgeInsets.symmetric(horizontal: 15.0),
            children: [
              CustomTextField(
                value: user == null ? "" : user.name,
                isEditable: false,
              ),
              const SizedBox(height: 20),
              CustomTextField(
                value: user == null ? "" : user.email,
                isEditable: false,
              ),
              const SizedBox(height: 20),
              CustomTextField(
                value: user == null ? "" : user.phone,
                isEditable: false,
              ),
              const SizedBox(height: 20),
              Container(
                height: 0.065 * getHeight(context),
                decoration: BoxDecoration(
                    color: lightColor,
                    borderRadius: BorderRadius.circular(15.0)),
                child: Center(
                  child: Text(
                    "App Access: ${user!.userType}",
                    style: const TextStyle(color: Colors.white),
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
