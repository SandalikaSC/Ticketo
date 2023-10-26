import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:intl/intl.dart';
import 'location_share.dart';
import 'schedule_share.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:permission_handler/permission_handler.dart'; // Import the permission_handler package

// Define the Schedule class
class Schedule {
  final String trainName;
  final int scheduleId;
  final int trainId;
  final String startStationName;
  final String endStationName;
  final String startTime;
  final String endTime;

  Schedule({
    required this.trainName,
    required this.scheduleId,
    required this.trainId,
    required this.startStationName,
    required this.endStationName,
    required this.startTime,
    required this.endTime,
  });
}

void main() async {
  await dotenv.load(fileName: ".env"); // Load environment variables
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

  List<Schedule> schedules = [];

  @override
  void initState() {
    super.initState();
    requestLocationPermission(); // Request location permission
    fetchSchedules().then((fetchSchedules) {
      setState(() {
        schedules = fetchSchedules;
      });
    }).catchError((error) {
      // Handle the error gracefully, e.g., show an error message.
      if (kDebugMode) {
        print("Error: $error");
      }
    });
  }

  Future<void> requestLocationPermission() async {
    final PermissionStatus status = await Permission.location.request();
    if (status.isGranted) {
      // Permission granted, you can now use the location.
    } else if (status.isDenied) {
      // Permission denied, handle accordingly (e.g., show a message).
      if (kDebugMode) {
        print('Location permission is denied.');

      }
    } else if (status.isPermanentlyDenied) {
      // Permission permanently denied, open app settings so the user can enable it.
      openAppSettings();
    }
  }

  Future<List<Schedule>> fetchSchedules() async {
    final baseUrl = dotenv.env['BASE_URL'];
    final Uri uri = Uri.parse('$baseUrl/trainguard/get-schedule');
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
      final Map<String, dynamic> data = json.decode(response.body);
      List<Schedule> schedules = [];

      for (var scheduleData in data['schedule']) {
        // Assuming 'schedule' is the key in the response that contains the schedule data.

        // Parse the date-time strings
        DateTime startTime = DateTime.parse(scheduleData['startTime']);
        DateTime endTime = DateTime.parse(scheduleData['endTime']);

        // Format the date-time objects to display only the time portion
        String startTimeFormatted = DateFormat('HH:mm').format(startTime);
        String endTimeFormatted = DateFormat('HH:mm').format(endTime);

        Schedule schedule = Schedule(
          trainName: scheduleData['trainName'],
          scheduleId: scheduleData['scheduleId'],
          trainId: scheduleData['trainId'],
          startStationName: scheduleData['startStationName']['name'],
          endStationName: scheduleData['endStationName']['name'],
          startTime: startTimeFormatted,
          endTime: endTimeFormatted,
        );
        schedules.add(schedule);
      }

      return schedules;
    } else {
      throw Exception('Failed to load schedules');
    }
  }

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
                padding: const EdgeInsets.only(
                    top: 60, bottom: 30, left: 40, right: 40),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Welcome Back!',
                          style: TextStyle(
                              fontSize: 26,
                              fontWeight: FontWeight.bold,
                              color: Colors.white),
                        ),
                        const SizedBox(height: 10),
                        const Text(
                          'NadeeDarshika',
                          style: TextStyle(fontSize: 18, color: Colors.white),
                        ),
                        const SizedBox(height: 5),
                        Text(
                          '14th of August, 2023',
                          style:
                          TextStyle(fontSize: 16, color: Colors.grey[300]),
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
                  style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF3D50AC)),
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
                    DateTime dayDate = currentDate
                        .add(Duration(days: index - currentDate.weekday + 1));
                    bool isToday = dayDate.day == currentDate.day &&
                        dayDate.month == currentDate.month &&
                        dayDate.year == currentDate.year;
                    bool isTwelfth = dayDate.day == 12;
                    bool isSelected = dayDate.day == selectedDate.day &&
                        dayDate.month == selectedDate.month &&
                        dayDate.year == selectedDate.year;

                    return GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const LocationSharingPage(scheduleId: 0,),
                          ),
                        );
                      },
                      child: Column(
                        children: [
                          Container(
                            width: 36,
                            height: 36,
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? const Color(0xFF3D50AC)
                                  : (isToday || isTwelfth)
                                  ? const Color(0xFF3D50AC)
                                  : Colors.transparent,
                              shape: BoxShape.circle,
                            ),
                            child: Center(
                              child: Text(
                                dayNames[index],
                                style: TextStyle(
                                  color: isSelected || isToday || isTwelfth
                                      ? Colors.white
                                      : Colors.black,
                                  fontWeight:
                                  (isSelected || isToday || isTwelfth)
                                      ? FontWeight.bold
                                      : FontWeight.normal,
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            dayDate.day.toString(),
                            style: TextStyle(
                              color: isSelected || isToday || isTwelfth
                                  ? const Color(0xFFFA6F5D)
                                  : Colors.black,
                              fontWeight: (isSelected || isToday || isTwelfth)
                                  ? FontWeight.bold
                                  : FontWeight.normal,
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
                itemCount: schedules.length, // Use the fetched schedules length
                itemBuilder: (context, index) {
                  final schedule = schedules[index]; // Get the schedule from the fetched list
                  return GestureDetector(
                    onTap: () {
                      // Handle the tap event
                      if (kDebugMode) {
                        print('Tapped schedule: ${schedule.trainName}');
                      }
                    },
                    child: Container(
                      margin: const EdgeInsets.symmetric(
                          horizontal: 10, vertical: 10),
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
                                  mainAxisAlignment:
                                  MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      schedule.trainName, // Updated title
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
                                            builder: (context) =>
                                                ScheduleSharePage(
                                                  trainName: schedule.trainName,
                                                  scheduleId: schedule.scheduleId,
                                                ),
                                          ),
                                        );
                                      },
                                      style: OutlinedButton.styleFrom(
                                        side: const BorderSide(
                                          color: Color(0xFFFA6F5D),
                                          width: 2.0,
                                        ),
                                        shape: RoundedRectangleBorder(
                                          borderRadius:
                                          BorderRadius.circular(20.0),
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
                                  mainAxisAlignment:
                                  MainAxisAlignment.spaceBetween,
                                  children: [
                                    Column(
                                      crossAxisAlignment:
                                      CrossAxisAlignment.start,
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 16),
                                          child: Text(
                                            'Start',
                                            style: TextStyle(
                                              fontSize: 14,
                                              color: Colors.grey[600],
                                            ),
                                          ),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 16),
                                          child: RichText(
                                            text: TextSpan(
                                              children: [
                                                TextSpan(
                                                  text: schedule.startStationName + '\n', // Updated start station name
                                                  style: const TextStyle(
                                                    fontSize: 18,
                                                    fontWeight: FontWeight.bold,
                                                    color: Color(0xFF3D50AC),
                                                  ),
                                                ),
                                                TextSpan(
                                                  text: schedule.startTime,
                                                  style: const TextStyle(
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
                                      '--------',
                                      style: TextStyle(
                                        fontSize: 18,
                                        fontWeight: FontWeight.bold,
                                        color: Color(0xFFFA6F5D),
                                      ),
                                    ),
                                    const SizedBox(width: 10),
                                    Column(
                                      crossAxisAlignment:
                                      CrossAxisAlignment.end,
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 16),
                                          child: Text(
                                            'End',
                                            style: TextStyle(
                                              fontSize: 14,
                                              color: Colors.grey[600],
                                            ),
                                          ),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 16),
                                          child: RichText(
                                            text: TextSpan(
                                              children: [
                                                TextSpan(
                                                  text: schedule.endStationName + '\n', // Updated end station name
                                                  style: const TextStyle(
                                                    fontSize: 18,
                                                    fontWeight: FontWeight.bold,
                                                    color: Color(0xFF3D50AC),
                                                  ),
                                                ),
                                                TextSpan(
                                                  text: schedule.endTime,
                                                  style: const TextStyle(
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