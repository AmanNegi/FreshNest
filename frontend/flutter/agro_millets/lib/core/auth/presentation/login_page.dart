import 'package:agro_millets/core/auth/application/auth.dart';
import 'package:agro_millets/core/auth/presentation/signup_page.dart';
import 'package:agro_millets/globals.dart';
import 'package:agro_millets/widgets/action_button.dart';
import 'package:agro_millets/widgets/custom_text_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class LoginPage extends ConsumerStatefulWidget {
  const LoginPage({super.key});

  @override
  ConsumerState<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends ConsumerState<LoginPage> {
  late AuthManager _authManager;
  String email = "", password = "";

  @override
  void initState() {
    _authManager = AuthManager(context, ref);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Login")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 15.0),
        child: Column(
          children: [
            SizedBox(height: 0.025 * getHeight(context)),
            CustomTextField(
              onChanged: (v) => email = v,
              label: "Email",
            ),
            CustomTextField(
              onChanged: (v) => password = v,
              label: "Password",
            ),
            SizedBox(height: 0.5 * getHeight(context)),
            ActionButton(
              onPressed: () async {
                await _authManager.loginUsingEmailPassword(
                    email: email, password: password);
              },
              text: "Login",
            ),
            SizedBox(height: 0.015 * getHeight(context)),
            ActionButton(
              onPressed: () async {
                await _authManager.googleAuth();
              },
              text: "Login using Google",
            ),
            SizedBox(height: 0.015 * getHeight(context)),
            GestureDetector(
              onTap: () => goToPage(
                context,
                const SignUpPage(),
                clearStack: true,
              ),
              child: RichText(
                text: TextSpan(
                  style: Theme.of(context).textTheme.bodyMedium,
                  children: const [
                    TextSpan(text: "Don't have an account?"),
                    TextSpan(text: "SignUp"),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
