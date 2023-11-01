import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:convert';
import 'dart:async';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';

class NotificationPage extends StatefulWidget {
  static const routeName = '/notification';

  const NotificationPage({Key? key}) : super(key: key);

  @override
  _NotificationPageState createState() => _NotificationPageState();
}

class _NotificationPageState extends State<NotificationPage> {
  // Sample list of notifications
  List<NotificationItem> notifications = [];

  @override
  void initState() {
    super.initState();
    // Load notifications when the page is initially loaded
    fetchNotifications();
  }


  Future<void> fetchNotifications() async {
    final baseUrl = dotenv.env['BASE_URL'];
    final Uri uri = Uri.parse('$baseUrl/trainguard/get-notification');
    final sharedPreferences = await SharedPreferences.getInstance();
    final accessToken = sharedPreferences.getString('accessToken') ?? '';

    final response = await http.get(
      uri,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $accessToken',
      },
    );

    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData = json.decode(response.body);
      final List<dynamic> data = responseData['notifications'];
      
      setState(() {
        notifications = data.map((notification) {
          final delay = notification['delay'];

          final delayText = (delay == 'NaN' || delay == '0' || delay == 'null')
              ? 'with no delay'
              : '$delay minutes late';

          final dateFormatter = DateFormat("yyyy-MM-dd hh.mm a");
          final formattedDate = dateFormatter.format(DateTime.parse(notification['date']));

          return NotificationItem(
            name: notification['trainName'],
            dateTime: formattedDate,
            description: notification['currentLocation'],
            delay: delayText,
          );
        }).toList();
      });


    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notifications'),
      ),
      body: FutureBuilder(
        future: fetchNotifications(),
        builder: (context, snapshot) {
          // if (snapshot.connectionState == ConnectionState.waiting) {
          //   return const CircularProgressIndicator(); // Loading indicator while fetching data
          // }

          if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          }

          return ListView.builder(
            itemCount: notifications.length,

            itemBuilder: (context, index) {
              return Container(
                decoration: BoxDecoration(
                  color: Colors.grey[300],
                  borderRadius: BorderRadius.circular(10.0),
                ),
                margin: const EdgeInsets.fromLTRB(16.0, 8.0, 16.0, 8.0),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            notifications[index].name,
                            style: const TextStyle(
                              color: Color(0xFF3D51A9),
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            notifications[index].dateTime,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Arrived ${notifications[index].description} ${notifications[index].delay} ',
                            style: const TextStyle(
                              fontSize: 14,
                              color: Color(0xFFFA6F5D),
                              fontWeight: FontWeight.bold,
                            ),
                          ),

                        ],
                      ),
                      const Icon(
                        Icons.notifications,
                        color: Color(0xFF3D51A9),
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}



class NotificationItem {
  final String name;
  final String dateTime;
  final String description;
  final String delay;

  NotificationItem({
    required this.name,
    required this.dateTime,
    required this.description, required this.delay,
  });
}
