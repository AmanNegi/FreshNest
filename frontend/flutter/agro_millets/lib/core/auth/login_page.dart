import 'package:agro_millets/core/auth/signup_page.dart';
import 'package:agro_millets/globals.dart';
import 'package:agro_millets/widgets/action_button.dart';
import 'package:agro_millets/widgets/custom_text_field.dart';
import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String email = "", password = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Login")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 15.0),
        child: Column(
          children: [
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
              onPressed: () {},
              text: "Login",
            ),
            GestureDetector(
              onTap: () => goToPage(context, const SignUpPage()),
              child: RichText(
                text: TextSpan(
                    style: Theme.of(context).textTheme.bodyMedium,
                    children: const [
                      TextSpan(text: "Don't have an account?"),
                      TextSpan(text: "SignUp"),
                    ]),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
