import 'package:flutter/material.dart'; 
import 'package:flutter_dotenv/flutter_dotenv.dart'; 
import 'package:shared_preferences/shared_preferences.dart';
import './screens/login.dart';
import './screens/landing_page.dart'; // Import your LandingPage
import './screens/guard_home.dart'; // Import your TrainGuardHomePage 

void main() async{
  await dotenv.load();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Your App Name',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF3D51A9),
        ),
      ),
      routes: {
        '/login': (context) => const LoginPage(),
        '/landing': (context) => const LandingPage(),
        '/guardHome': (context) => const TrainGuardHomePage(),

      },
      initialRoute: '/login',
    );
  }
}
