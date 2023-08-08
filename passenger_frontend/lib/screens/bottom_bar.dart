import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/screens/guest_home_screen.dart';
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
    const GuestHomeScreen(),
    const TicketScreen(),
    const WalletPage(),
    const ProfilePage(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: _widgetOptions[_selectedIndex]),
      bottomNavigationBar: Theme(
        data: Theme.of(context).copyWith(
          // Define the text theme for BottomNavigationBar
          textTheme: Theme.of(context)
              .textTheme
              .copyWith(bodySmall: Styles.fontFamily),
        ),
        child: BottomNavigationBar(
          currentIndex: _selectedIndex,
          onTap: _onItemTapped,
          elevation: 10,
          showSelectedLabels: true,
          // Show labels for selected items
          showUnselectedLabels: true,
          // Show labels for unselected items
          selectedItemColor: primary,
          unselectedItemColor: Colors.blueGrey,
          type: BottomNavigationBarType.fixed,

          items: const [
            BottomNavigationBarItem(
              // ignore: deprecated_member_use
              icon: Icon(Icons.home),
              label: "Home", // Custom label for the Home item
            ),
            BottomNavigationBarItem(
              icon: Icon(FontAwesomeIcons.ticketSimple),
              label: "Ticket", // Custom label for the Ticket item
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.wallet),
              label: "Wallet", // Custom label for the Wallet item
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.account_circle_outlined),
              label: "Profile", // Custom label for the Profile item
            ),
          ],
        ),
      ),
    );
  }
}
