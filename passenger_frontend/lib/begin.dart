import 'package:flutter/material.dart';
import 'package:passenger_frontend/screens/test.dart';
import './screens/guest_home_screen.dart';

class BeginApp extends StatelessWidget {
  const BeginApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Future.delayed(const Duration(seconds: 5), () {
      Navigator.pushReplacement(
        context,
        // MaterialPageRoute(builder: (context) =>   MyApp()),
        MaterialPageRoute(builder: (context) => const GuestHomeScreen()),
      );
    });

    return Scaffold(
      body: Center(
        child: Image.asset(
          'assets/logo.png', // Replace with the path to your image file
          width: 400,
          height: 400,
        ),
      ),
    );
  }
}
