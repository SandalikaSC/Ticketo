import 'package:flutter/material.dart';

class NotificationPage extends StatelessWidget {
  static const routeName = '/notification';

  const NotificationPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notifications'),
      ),
      body: const Center(
        child: Text('Your notifications will be displayed here.'),
      ),
    );
  }
}
