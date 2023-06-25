import 'package:fresh_nest/core/auth/application/auth.dart';
import 'package:fresh_nest/core/auth/presentation/login_page.dart';
import 'package:fresh_nest/core/home/presentation/widgets/loading_widget.dart';
import 'package:fresh_nest/globals.dart';
import 'package:fresh_nest/main.dart';
import 'package:fresh_nest/widgets/action_button.dart';
import 'package:fresh_nest/widgets/custom_text_field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';

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
    return LoadingWidget(
      isLoading: _authManager.isLoading,
      child: _getSignUpPage(context),
    );
  }

  SingleChildScrollView _getSignUpPage(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 15.0),
      child: Column(
        children: [
          const SizedBox(height: kToolbarHeight),
          Image.asset(
            "assets/logo_app.png",
            height: 100,
            width: 100,
          ),
          SizedBox(height: 0.015 * getHeight(context)),
          const Center(
            child: Text(
              "Fresh Nest",
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
            onChanged: (v) => username = v,
            label: "Username",
          ),
          const SizedBox(height: 10),
          CustomTextField(
            keyboardType: TextInputType.emailAddress,
            onChanged: (v) => email = v,
            label: "Email",
          ),
          const SizedBox(height: 10),
          CustomTextField(
            keyboardType: TextInputType.visiblePassword,
            isPassword: true,
            onChanged: (v) => password = v,
            label: "Password",
          ),
          const SizedBox(height: 10),
          CustomTextField(
            keyboardType: TextInputType.phone,
            onChanged: (v) => phone = v,
            label: "Phone",
          ),
          _getUserTypeDropDown(context),
          SizedBox(height: 0.025 * getHeight(context)),
          ActionButton(
            isFilled: false,
            onPressed: () async {
              var res = await _authManager.signUpUsingEmailPassword(
                email: email.trim(),
                name: username.trim(),
                password: password.trim(),
                phone: phone.trim(),
                userType: dropdownValue,
              );
              if (res == 1 && mounted) {
                goToPage(context, const RolePage(), clearStack: true);
              }
            },
            text: "Sign up",
          ),
          SizedBox(height: 0.015 * getHeight(context)),
          GestureDetector(
            onTap: () async {
              var res = await _authManager.googleAuth();
              if (res == 1 && mounted) {
                goToPage(context, const RolePage(), clearStack: true);
              }
            },
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
                    "Sign up using Google",
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
              const LoginPage(),
              clearStack: true,
            ),
            child: RichText(
              text: TextSpan(
                style: Theme.of(context).textTheme.bodyMedium,
                children: [
                  const TextSpan(text: "Already have an account?"),
                  TextSpan(
                    text: " Login",
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
