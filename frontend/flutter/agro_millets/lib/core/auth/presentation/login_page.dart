import 'package:agro_millets/colors.dart';
import 'package:agro_millets/core/auth/application/auth.dart';
import 'package:agro_millets/core/auth/presentation/signup_page.dart';
import 'package:agro_millets/globals.dart';
import 'package:agro_millets/widgets/action_button.dart';
import 'package:agro_millets/widgets/custom_text_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';

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
    _authManager.loginUsingEmailPassword(
        email: "asterjoules@gmail.com", password: "~");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 15.0),
        child: Column(
          children: [
            const SizedBox(height: kToolbarHeight),
            Image.asset(
              "assets/icon.png",
              color: lightColor,
              height: 100,
              width: 100,
            ),
            SizedBox(height: 0.025 * getHeight(context)),
            const Center(
              child: Text(
                "Agro Millets",
                style: TextStyle(
                  fontSize: 25,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const Center(
              child: Text(
                "Bringing the farm to your doorstep",
                style: TextStyle(
                  fontSize: 12,
                ),
              ),
            ),
            SizedBox(height: 0.025 * getHeight(context)),
            CustomTextField(
              onChanged: (v) => email = v,
              label: "Email",
            ),
            const SizedBox(height: 10),
            CustomTextField(
              isPassword: true,
              onChanged: (v) => password = v,
              label: "Password",
            ),
            SizedBox(height: 0.3 * getHeight(context)),
            ActionButton(
              isFilled: false,
              onPressed: () async {
                await _authManager.loginUsingEmailPassword(
                    email: email, password: password);
              },
              text: "Log in",
            ),
            SizedBox(height: 0.015 * getHeight(context)),
            GestureDetector(
              onTap: () async {
                await _authManager.googleAuth();
              },
              // text: "Login using Google",
              child: Container(
                height: 0.06 * getHeight(context),
                decoration: BoxDecoration(
                  color: Theme.of(context).primaryColor,
                  borderRadius: BorderRadius.circular(10.0),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    Icon(
                      MdiIcons.google,
                      color: Colors.white,
                    ),
                    SizedBox(width: 10),
                    Text(
                      "Log in using Google",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                      ),
                    )
                  ],
                ),
              ),
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
                  children: [
                    const TextSpan(text: "Don't have an account?"),
                    TextSpan(
                      text: " SignUp",
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        color: Theme.of(context).primaryColor,
                      ),
                    ),
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
