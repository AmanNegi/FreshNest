import 'package:agro_millets/core/auth/presentation/login_page.dart';
import 'package:agro_millets/globals.dart';
import 'package:agro_millets/core/home/home_page.dart';
import 'package:agro_millets/widgets/action_button.dart';
import 'package:agro_millets/widgets/custom_text_field.dart';
import 'package:flutter/material.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  String dropdownValue = "customer";
  String email = "", password = "", username = "", phone = "";

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
              onPressed: () {
                goToPage(context, const HomePage(), clearStack: true);
              },
              text: "Signup",
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
        decoration: const InputDecoration(
            // border: InputBorder.none,
            // contentPadding: EdgeInsets.symmetric(
            //   horizontal: 15.0,
            //   vertical: 10.0,
            // ),
            ),
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
