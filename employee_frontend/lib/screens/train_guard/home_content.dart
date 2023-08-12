import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'location_share.dart';
void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(
        body: HomeContentPage(),
      ),
    ),
  );
}

class HomeContentPage extends StatefulWidget {
  const HomeContentPage({Key? key}) : super(key: key);

  @override
  _HomeContentPageState createState() => _HomeContentPageState();
}

class _HomeContentPageState extends State<HomeContentPage> {
  DateTime currentDate = DateTime.now();
  DateTime selectedDate = DateTime.now(); // Initialize with the current date

  List<String> dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  List<Map<String, dynamic>> dummySchedules = [
    {
      'time': '09:00 AM',
      'trainName': 'Express Train',
      'platform': 'Platform 3',
    },
    {
      'time': '02:30 PM',
      'trainName': 'Local Train',
      'platform': 'Platform 1',
    },
    {
      'time': '04:00 PM',
      'trainName': 'High-speed Train',
      'platform': 'Platform 5',
    },
    {
      'time': '10:30 AM',
      'trainName': 'Commuter Train',
      'platform': 'Platform 2',
    },
    {
      'time': '03:45 PM',
      'trainName': 'Express Route',
      'platform': 'Platform 4',
    },
    {
      'time': '06:15 PM',
      'trainName': 'Night Express',
      'platform': 'Platform 6',
    },
    // Add more dummy schedules here
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.only(
                bottomLeft: Radius.circular(50.0),
                bottomRight: Radius.circular(50.0),
              ),
              child: Container(
                color: const Color(0xFF3D50AC),
                padding: const EdgeInsets.only(top: 60, bottom: 30, left: 40, right: 40),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Welcome Back!',
                          style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                        const SizedBox(height: 10),
                        const Text(
                          'Nadee Darshika',
                          style: TextStyle(fontSize: 18, color: Colors.white),
                        ),
                        const SizedBox(height: 5),
                        Text(
                          '14th of August, 2023',
                          style: TextStyle(fontSize: 16, color: Colors.grey[300]),
                        ),
                      ],
                    ),
                    const CircleAvatar(
                      backgroundColor: Colors.grey,
                      radius: 40,
                      backgroundImage: AssetImage('assets/profile_image.png'),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),
            const Padding(
              padding: EdgeInsets.only(left: 20),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'My Schedules',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Color(0xFF3D50AC)),
                ),
              ),
            ),
            const SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.3),
                      spreadRadius: 2,
                      blurRadius: 5,
                      offset: const Offset(0, 3),
                    ),
                  ],
                  borderRadius: BorderRadius.circular(10),
                ),
                padding: const EdgeInsets.all(16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: List.generate(7, (index) {
                    DateTime dayDate = currentDate.add(Duration(days: index - currentDate.weekday + 1));
                    bool isToday = dayDate.day == currentDate.day && dayDate.month == currentDate.month && dayDate.year == currentDate.year;
                    bool isTwelfth = dayDate.day == 12;
                    bool isSelected = dayDate.day == selectedDate.day && dayDate.month == selectedDate.month && dayDate.year == selectedDate.year;

                    return GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => LocationSharingPage(),
                          ),
                        );
                      },
                      child: Column(
                        children: [
                          Container(
                            width: 36,
                            height: 36,
                            decoration: BoxDecoration(
                              color: isSelected ? const Color(0xFF3D50AC) : (isToday || isTwelfth) ? const Color(0xFF3D50AC) : Colors.transparent,
                              shape: BoxShape.circle,
                            ),
                            child: Center(
                              child: Text(
                                dayNames[index],
                                style: TextStyle(
                                  color: isSelected || isToday || isTwelfth ? Colors.white : Colors.black,
                                  fontWeight: (isSelected || isToday || isTwelfth) ? FontWeight.bold : FontWeight.normal,
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            dayDate.day.toString(),
                            style: TextStyle(
                              color: isSelected || isToday || isTwelfth ? const Color(0xFFFA6F5D) : Colors.black,
                              fontWeight: (isSelected || isToday || isTwelfth) ? FontWeight.bold : FontWeight.normal,
                            ),
                          ),
                        ],
                      ),
                    );
                  }),
                ),
              ),
            ),
            // Updated Schedule cards
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.6,
              child: ListView.builder(
                itemCount: dummySchedules.length,
                itemBuilder: (context, index) {
                  final schedule = dummySchedules[index];
                  return GestureDetector(
                    onTap: () {
                      // Handle the tap event
                      if (kDebugMode) {
                        print('Tapped schedule: ${schedule['trainName']}');
                      }
                    },
                    child: Container(
                      margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                      decoration: BoxDecoration(
                        color: Colors.white70,
                        boxShadow: [
                          BoxShadow(
                            color: Colors.grey.withOpacity(0.3),
                            spreadRadius: 2,
                            blurRadius: 5,
                            offset: const Offset(0, 3),
                          ),
                        ],
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.all(10),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      schedule['trainName'], // Updated title
                                      style: const TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.black,
                                      ),
                                    ),
                                    OutlinedButton(
                                      onPressed: () {
                                        // Handle the start button press
                                        Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                            builder: (context) => const LocationSharingPage(),
                                          ),
                                        );
                                      },
                                      style: OutlinedButton.styleFrom(
                                        side: const BorderSide(
                                          color: Color(0xFFFA6F5D),
                                          width: 2.0,
                                        ),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(20.0),
                                        ),
                                      ),
                                      child: const Text(
                                        'Start',
                                        style: TextStyle(
                                          fontSize: 14,
                                          fontWeight: FontWeight.bold,
                                          color: Color(0xFFFA6F5D),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                                Divider(
                                  color: Colors.grey[300], // Divider color
                                  thickness: 1, // Divider thickness
                                  height: 10, // Space between title and divider
                                ),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.symmetric(horizontal: 16),
                                          child: Text(
                                            'Start',
                                            style: TextStyle(
                                              fontSize: 14,
                                              color: Colors.grey[600],
                                            ),
                                          ),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.symmetric(horizontal: 16),
                                          child: RichText(
                                            text: const TextSpan(
                                              children: [
                                                TextSpan(
                                                  text: 'Galle\n',
                                                  style: TextStyle(
                                                    fontSize: 18,
                                                    fontWeight: FontWeight.bold,
                                                    color: Color(0xFF3D50AC),
                                                  ),
                                                ),
                                                TextSpan(
                                                  text: '8:00 a.m',
                                                  style: TextStyle(
                                                    fontSize: 16,
                                                    fontWeight: FontWeight.bold,
                                                    color: Colors.black,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(width: 10),
                                    const Text(
                                      '--------------------------',
                                      style: TextStyle(
                                        fontSize: 18,
                                        fontWeight: FontWeight.bold,
                                        color: Color(0xFFFA6F5D),
                                      ),
                                    ),
                                    const SizedBox(width: 10),
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.end,
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.symmetric(horizontal: 16),
                                          child: Text(
                                            'End',
                                            style: TextStyle(
                                              fontSize: 14,
                                              color: Colors.grey[600],
                                            ),
                                          ),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.symmetric(horizontal: 16),
                                          child: RichText(
                                            text: const TextSpan(
                                              children: [
                                                TextSpan(
                                                  text: 'Colombo\n',
                                                  style: TextStyle(
                                                    fontSize: 18,
                                                    fontWeight: FontWeight.bold,
                                                    color: Color(0xFF3D50AC),
                                                  ),
                                                ),
                                                TextSpan(
                                                  text: '11:00 a.m',
                                                  style: TextStyle(
                                                    fontSize: 16,
                                                    fontWeight: FontWeight.bold,
                                                    color: Colors.black,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
