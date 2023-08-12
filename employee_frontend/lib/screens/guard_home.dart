import 'package:flutter/material.dart';
import './train_guard/home_content.dart'; // Import your home page content
import './train_guard/profile_page.dart'; // Import your profile page content

class TrainGuardHomePage extends StatefulWidget {
  const TrainGuardHomePage({Key? key}) : super(key: key);

  @override
  _TrainGuardHomePageState createState() => _TrainGuardHomePageState();
}

class _TrainGuardHomePageState extends State<TrainGuardHomePage> {
  int _currentIndex = 0;

  final List<Widget> _pages = [
    const HomeContentPage(), // Your home page content
    const ProfilePage(), // Your profile page content
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: _pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
