import 'package:flutter/material.dart';

import 'main.dart';
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
    Navigator.pushReplacement(context, MaterialPageRoute(builder: (context)=>App().getHomePage()));
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