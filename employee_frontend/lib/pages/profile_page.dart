import 'package:flutter/material.dart';

class ProfilePage extends StatelessWidget {
  static const routeName = '/profile';
  const ProfilePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
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
                      const Text(
                        'John Doe',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 15),
                      Text(
                        'john.doe@example.com',
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
