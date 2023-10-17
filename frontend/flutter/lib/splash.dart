import 'package:flutter/material.dart';

import 'package:fresh_nest/core/admin/presentation/admin_page.dart';
import 'package:fresh_nest/core/auth/presentation/login_page.dart';
import 'package:fresh_nest/core/home/presentation/home_page.dart';
import 'package:fresh_nest/data/cache/app_cache.dart';

import 'colors.dart';

class Splash extends StatefulWidget {
  const Splash({ Key? key }) : super(key: key);

  @override
  State<Splash> createState() => _SplashState();
}

class _SplashState extends State<Splash> {
  @override
  void initState() {
    super.initState();
    _naviagteToHome();
  }


  _naviagteToHome()async{
    await Future.delayed(const Duration(milliseconds: 1700), () {});
    // ignore: use_build_context_synchronously
    Navigator.pushReplacement(context, MaterialPageRoute(builder: (context)=>getHomePage()));
  }

  getHomePage() {
    if (!appState.value.isLoggedIn) {
      return const LoginPage();
    }
    return const RolePage();
  }

  @override
 Widget build(BuildContext context) {
    return Scaffold(
    body: Stack(
      children: [
        Center(
          child: Transform.scale(
            scale: 0.6,
            child: Container(
              decoration: const BoxDecoration(
                image: DecorationImage(image: AssetImage("assets/logo.png")),
              ),
            ),
          ),
        ),
        const Align(
          alignment: Alignment.bottomCenter,
          child: Padding(
            padding: EdgeInsets.only(bottom: 200.0),
            child: Text(
              "Your cozy corner \nfor farm fresh \n delights!",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 20.0,
                color: lightColor,
                fontFamily: 'Sriracha',
              ),
            ),
          ),
        ),
      ],
    ),
  );
  }

}


// Only takes part during startup
class RolePage extends StatelessWidget {
  const RolePage({super.key});

  @override
  Widget build(BuildContext context) {
    return appState.value.user!.userType == "admin"
        ? const AdminPage()
        : const HomePage();
  }
}