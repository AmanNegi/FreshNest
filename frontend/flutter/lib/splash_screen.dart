import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

import 'core/admin/presentation/admin_page.dart';
import 'core/auth/presentation/login_page.dart';
import 'core/home/presentation/home_page.dart';
import 'data/cache/app_cache.dart';

class Splashscreen extends StatefulWidget {
  const Splashscreen({Key? key}) : super(key: key);

  @override
  _SplashscreenState createState() => _SplashscreenState();
}

class _SplashscreenState extends State<Splashscreen> {
  // video controller
  late VideoPlayerController _controller;

  @override
  void initState() {
    super.initState();

    _controller = VideoPlayerController.asset(
      'assets/splash/splash.mp4',
    )
      ..initialize().then((_) {
        setState(() {});
      })
      ..setVolume(0.0);

    _playVideo();
  }
  getHomePage() {
    if (!appState.value.isLoggedIn) {
      return const LoginPage();
    }
    return const RolePage();
  }

  void _playVideo() async {
    // playing video
    _controller.play();

    //add delay till video is complite
    await Future.delayed(const Duration(seconds: 3));

    // navigating to home screen

    Navigator.of(context).pushReplacement(MaterialPageRoute(
        builder: (BuildContext context)=> getHomePage()));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: _controller.value.isInitialized
            ? AspectRatio(
          aspectRatio: _controller.value.aspectRatio,
          child: VideoPlayer(
            _controller,
          ),
        )
            : Container(),
      ),
    );
  }
}

class RolePage extends StatelessWidget {
  const RolePage({super.key});

  @override
  Widget build(BuildContext context) {
    return appState.value.user!.userType == "admin"
        ? const AdminPage()
        : const HomePage();
  }
}
