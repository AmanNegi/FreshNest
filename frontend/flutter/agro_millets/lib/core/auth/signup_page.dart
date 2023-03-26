import 'package:agro_millets/core/auth/login_page.dart';
import 'package:agro_millets/globals.dart';
import 'package:agro_millets/home_page.dart';
import 'package:agro_millets/widgets/action_button.dart';
import 'package:agro_millets/widgets/custom_text_field.dart';
import 'package:flutter/material.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  String email = "", password = "", username = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("SignUp")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 15.0),
        child: Column(
          children: [
            CustomTextField(
              onChanged: (v) => username = v,
              label: "Username",
            ),
            CustomTextField(
              onChanged: (v) => email = v,
              label: "Email",
            ),
            CustomTextField(
              onChanged: (v) => password = v,
              label: "Password",
            ),
            const SizedBox(height: 20),
            ActionButton(
              onPressed: () {
                goToPage(context, const HomePage(), clearStack: true);
              },
              text: "Signup",
            ),
            GestureDetector(
              onTap: () =>
                  goToPage(context, const LoginPage(), clearStack: true),
              child: RichText(
                text: TextSpan(
                    style: Theme.of(context).textTheme.bodyMedium,
                    children: const [
                      TextSpan(text: "Already have an account?"),
                      TextSpan(text: "Login"),
                    ]),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
