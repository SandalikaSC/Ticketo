import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'login.dart';
import './train_guard/notification_page.dart'; // Import the LoginPage

class ProfilePage extends StatelessWidget {
  static const routeName = '/profile';
  const ProfilePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   automaticallyImplyLeading: false,
      //   elevation: 0, // Removes the back button
      //   title: const Padding(
      //     padding: EdgeInsets.only(top: 20.0),
      //     child: Row(
      //       mainAxisAlignment: MainAxisAlignment.center,
      //       children: [
      //         Icon(
      //           CupertinoIcons
      //               .person_crop_circle, // Replace with your desired icon
      //           color: Color(0xFF3D51A9), // Blue icon color
      //         ),
      //         SizedBox(
      //             width: 8), // Add some spacing between icon and text
      //         Text(
      //           "My Profile",
      //           style:
      //           TextStyle(color:Color(0xFF3D51A9)), // Blue title color
      //         ),
      //       ],
      //     ),
      //   ),
      //   centerTitle: true, // Center aligns the title
      //   backgroundColor: Colors.white,
      // ),
      body: FutureBuilder<SharedPreferences>(
        future: SharedPreferences.getInstance(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const CircularProgressIndicator(); // Loading indicator while fetching data
          }

          if (!snapshot.hasData) {
            return const Text('No data available'); // Handle the case of no data
          }

          final sharedPreferences = snapshot.data!;
          final email = sharedPreferences.getString('email') ?? 'N/A';
          final firstName = sharedPreferences.getString('firstName') ?? '';
          final lastName = sharedPreferences.getString('lastName') ?? '';

          return Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const CircleAvatar(
                      radius: 50,
                      backgroundImage: AssetImage('assets/profile_image.png'),
                    ),
                    const SizedBox(width: 30),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 15),
                          Text(
                            '$firstName $lastName',
                            style: const TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 15),
                          Text(
                            email,
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.grey[600],
                            ),
                          ),
                          const SizedBox(height: 80),
                        ],
                      ),
                    ),
                  ],
                ),
                _buildOption(
                  icon: Icons.person_outline,
                  title: 'Personal Info',
                ),
                const SizedBox(height: 20),
                _buildOption(
                  icon: Icons.notifications_none,
                  title: 'Notification',
                  onTap: () {
                    Navigator.pushNamed(context, NotificationPage.routeName);
                  },
                ),
                const SizedBox(height: 20),
                _buildOption(
                  icon: Icons.dashboard_outlined,
                  title: 'View Dashboard',
                ),
                const SizedBox(height: 60),
                const SizedBox(height: 20),
                _buildOption(
                  icon: Icons.help_outline,
                  title: 'Help Center',
                ),
                const SizedBox(height: 20),
                _buildOption(
                  icon: Icons.policy_outlined,
                  title: 'Privacy Policy',
                ),
                const SizedBox(height: 20),
                _buildOption(
                  icon: Icons.logout,
                  title: 'Logout',
                  textColor: const Color(0xFFFA6F5D),
                  onTap: () {
                    // Handle logout action here
                    _handleLogout(context);
                  },
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  void _handleLogout(BuildContext context) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.clear(); // Clear the shared preferences

    // Navigate to the login page and remove all routes on top
    Navigator.pushNamedAndRemoveUntil(
      context,
      '/login', // Replace with the actual route name for your login page
          (Route<dynamic> route) => false,
    );
  }

  Widget _buildOption({
    required IconData icon,
    required String title,
    Color textColor = Colors.black,
    VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Row(
        children: [
          Icon(
            icon,
            size: 24,
          ),
          const SizedBox(width: 10),
          Text(
            title,
            style: TextStyle(
              fontSize: 18,
              color: textColor,
            ),
          ),
          const Spacer(),
          const Icon(Icons.arrow_forward),
        ],
      ),
    );
  }
}
