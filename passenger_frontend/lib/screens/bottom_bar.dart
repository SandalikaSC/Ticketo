import 'package:fluentui_icons/fluentui_icons.dart';
import 'package:flutter/material.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/screens/home_screen.dart';
import 'package:passenger_frontend/screens/profile_screen.dart';
import 'package:passenger_frontend/screens/ticket_screen.dart';
import 'package:passenger_frontend/screens/wallet_screen.dart';

class BottomBar extends StatefulWidget {
  const BottomBar({Key? key}) : super(key: key);

  @override
  State<BottomBar> createState() => _BottomBarState();
}

class _BottomBarState extends State<BottomBar> {
  int _selectedIndex = 0;
  static final List<Widget> _widgetOptions = <Widget>[
    const HomeScreen(),
    const TicketScreen(),
    const WalletScreen(),
    const ProfileScreen(),
  ];
void _onItemTapped(int index){
  setState(() {
    _selectedIndex=index;
  });
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: _widgetOptions[_selectedIndex]),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        elevation: 10,
        showSelectedLabels: false,
        showUnselectedLabels: false,
        selectedItemColor: primary,
        unselectedItemColor: Colors.blueGrey,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(
              icon: Icon(FluentSystemIcons.ic_fluent_home_filled),
              label: "Home",
              activeIcon: Icon(FluentSystemIcons.ic_fluent_home_filled)),
          BottomNavigationBarItem(
              icon: Icon(FluentSystemIcons.ic_fluent_ticket_regular),
              label: "Ticket",
              activeIcon: Icon(FluentSystemIcons.ic_fluent_ticket_filled),
          ),

          BottomNavigationBarItem(
              icon: Icon(FluentSystemIcons.ic_fluent_data_usage_regular),
              label: "Wallet",
              activeIcon: Icon(FluentSystemIcons.ic_fluent_data_usage_filled),
          ),
          BottomNavigationBarItem(
              icon: Icon(FluentSystemIcons.ic_fluent_person_regular),
              label: "Profile",
              activeIcon: Icon(FluentSystemIcons.ic_fluent_person_filled),
          ),

        ],
      ),
    );
  }
}