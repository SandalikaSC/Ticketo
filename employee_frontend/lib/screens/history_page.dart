import 'package:flutter/material.dart';

class HistoryPage extends StatelessWidget {
  static const routeName = '/history';

  // Sample user history data
  final List<Map<String, String>> userHistory = [
    {
      'username': 'P.G. Kaveesha',
      'nic': '992547827V',
      'time': '16:14:52',
      'startStation': 'Galle',
      'endStation': 'Colombo',
    },
    // Add more users here with their history data
    {
      'username': 'User2',
      'nic': '123456789V',
      'time': '12:34:56',
      'startStation': 'Station A',
      'endStation': 'Station B',
    },
    // ...
  ];

  HistoryPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: ListView.builder(
        itemCount: userHistory.length,
        itemBuilder: (context, index) {
          final userData = userHistory[index];
          return Padding(
            padding: const EdgeInsets.all(8.0),
            child: Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
                side: const BorderSide(
                  color: Color(0xFF3D51A9),
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.all(15),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            userData['username']!,
                            style: const TextStyle(
                              color: Colors.black,
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            userData['nic']!,
                            style: const TextStyle(
                              color: Colors.grey,
                              fontSize: 15,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          userData['time']!,
                          style: const TextStyle(
                            color: Color(0xFF3D51A9),
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    Expanded(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text(
                            '${userData['startStation']} - ${userData['endStation']}',
                            style: const TextStyle(
                              color: Color(0xFFFA6F5D),
                              fontSize: 18,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
