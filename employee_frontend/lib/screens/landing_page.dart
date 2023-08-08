import 'package:flutter/material.dart';
import './fine_page.dart';
import './history_page.dart';
import './profile_page.dart';
import './scan_page.dart';

class LandingPage extends StatefulWidget {
  const LandingPage({Key? key}) : super(key: key);

  @override
  MainPageState createState() => MainPageState();
}

class MainPageState extends State<LandingPage> {
  int _currentIndex = 0;

  final List<Widget> _pages = [
    const ScanPage(),
    const FinePage(),
    HistoryPage(),
    const ProfilePage(),
  ];

  final List<String> _titles = ['Scan', 'Fine', 'History', 'Profile'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          _titles[_currentIndex],
          style: const TextStyle(color: Colors.white),
        ),
      ),
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
            icon: Column(
              children: [
                ColorFiltered(
                  colorFilter: ColorFilter.mode(
                    Color(0xFF3D51A9),
                    BlendMode.srcIn,
                  ),
                  child: ImageIcon(
                    AssetImage('assets/icons/scan.png'),
                    size: 24,
                  ),
                ),
                Text(
                  'Scan',
                  style: TextStyle(color: Color(0xFF3D51A9)),
                ),
              ],
            ),
            label: 'Scan',
          ),
          BottomNavigationBarItem(
            icon: Column(
              children: [
                ColorFiltered(
                  colorFilter: ColorFilter.mode(
                    Color(0xFF3D51A9),
                    BlendMode.srcIn,
                  ),
                  child: ImageIcon(
                    AssetImage('assets/icons/fine.png'),
                    size: 24,
                  ),
                ),
                Text(
                  'Fine',
                  style: TextStyle(color: Color(0xFF3D51A9)),
                ),
              ],
            ),
            label: 'Fine',
          ),
          BottomNavigationBarItem(
            icon: Column(
              children: [
                ColorFiltered(
                  colorFilter: ColorFilter.mode(
                    Color(0xFF3D51A9),
                    BlendMode.srcIn,
                  ),
                  child: ImageIcon(
                    AssetImage('assets/icons/history.png'),
                    size: 24,
                  ),
                ),
                Text(
                  'History',
                  style: TextStyle(color: Color(0xFF3D51A9)),
                ),
              ],
            ),
            label: 'History',
          ),
          BottomNavigationBarItem(
            icon: Column(
              children: [
                ColorFiltered(
                  colorFilter: ColorFilter.mode(
                    Color(0xFF3D51A9),
                    BlendMode.srcIn,
                  ),
                  child: ImageIcon(
                    AssetImage('assets/icons/profile.png'),
                    size: 24,
                  ),
                ),
                Text(
                  'Profile',
                  style: TextStyle(color: Color(0xFF3D51A9)),
                ),
              ],
            ),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
