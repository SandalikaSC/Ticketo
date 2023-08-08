import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProfilePage extends StatelessWidget {
  static const routeName = '/profile';
  const ProfilePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<SharedPreferences>(
        future: SharedPreferences.getInstance(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return CircularProgressIndicator(); // Loading indicator while fetching data
          }

          if (!snapshot.hasData) {
            return Text('No data available'); // Handle the case of no data
          }

          final sharedPreferences = snapshot.data!;
          final email = sharedPreferences.getString('email') ?? 'N/A'; // Retrieve email from SharedPreferences
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
                            '$firstName $lastName', // Display concatenated first name and last name
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 15),
                          Text(
                            email, // Display the stored email
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
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildOption({
    required IconData icon,
    required String title,
    Color textColor = Colors.black,
  }) {
    return Row(
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
    );
  }
}
