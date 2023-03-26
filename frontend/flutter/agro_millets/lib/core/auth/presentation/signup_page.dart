import 'package:agro_millets/core/auth/application/auth.dart';
import 'package:agro_millets/core/auth/presentation/login_page.dart';
import 'package:agro_millets/globals.dart';
import 'package:agro_millets/widgets/action_button.dart';
import 'package:agro_millets/widgets/custom_text_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class SignUpPage extends ConsumerStatefulWidget {
  const SignUpPage({super.key});

  @override
  ConsumerState<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends ConsumerState<SignUpPage> {
  late AuthManager _authManager;
  String dropdownValue = "customer";
  String email = "", password = "", username = "", phone = "";

  @override
  void initState() {
    _authManager = AuthManager(context, ref);
    super.initState();
  }

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
              keyboardType: TextInputType.emailAddress,
              onChanged: (v) => email = v,
              label: "Email",
            ),
            CustomTextField(
              keyboardType: TextInputType.visiblePassword,
              onChanged: (v) => password = v,
              label: "Password",
            ),
            CustomTextField(
              keyboardType: TextInputType.phone,
              onChanged: (v) => phone = v,
              label: "Phone",
            ),
            _getUserTypeDropDown(context),
            SizedBox(height: 0.2 * getHeight(context)),
            ActionButton(
              onPressed: () async {
                await _authManager.signUpUsingEmailPassword(
                  email: email,
                  name: username,
                  password: password,
                  phone: phone,
                  userType: dropdownValue,
                );
                // goToPage(context, const HomePage(), clearStack: true);
              },
              text: "Signup",
            ),
            SizedBox(height: 0.015 * getHeight(context)),
            ActionButton(
              onPressed: () async {
                await _authManager.googleAuth();
              },
              text: "Sign Up using Google",
            ),
            SizedBox(height: 0.015 * getHeight(context)),
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

  _getUserTypeDropDown(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10.0),
      child: DropdownButtonFormField(
        value: dropdownValue,
        items: const [
          DropdownMenuItem(value: "customer", child: Text("Customer")),
          DropdownMenuItem(value: "farmer", child: Text("Farmer")),
        ],
        onChanged: (v) {
          dropdownValue = v ?? dropdownValue;
          setState(() {});
        },
      ),
    );
  }
}
