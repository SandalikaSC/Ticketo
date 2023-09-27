import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/modals/ReservationTicket.dart';
import 'package:passenger_frontend/services/trainScheduleService.dart';
import 'package:passenger_frontend/widgets/ScheduleWidject.dart';

class GuestTrainSchedule extends StatefulWidget {

  final ReservationTicket  reservationTicket; // Replace String with the type of data you want to pass

  GuestTrainSchedule({required this.reservationTicket, Key? key}) : super(key: key);
  @override
  State<GuestTrainSchedule> createState() => _GuestTrainScheduleState();
}

class _GuestTrainScheduleState extends State<GuestTrainSchedule> {

  void _loadSchedules() async {
    if (!mounted) return;

    final TrainScheduleService trainScheduleService= TrainScheduleService();
    final response = await trainScheduleService.getSchedules(widget.reservationTicket);

    final responseData = json.decode(response.body);
    // Print the response body (content)

    if (response.statusCode == 200) {
      final dynamic decodedResponse = json.decode(response.body);

      // if (decodedResponse != null && decodedResponse['stations'] != null) {
      //   final List<dynamic> data = decodedResponse['stations'];
      //   setState(() {
      //     _stations = data
      //         .map((stationData) => Station(
      //       stationId: stationData['stationId'] ?? 0,
      //       name: stationData['name'] ?? '',
      //       latitude: stationData['latitude'] ?? 0.0,
      //       longitude: stationData['longitude'] ?? 0.0,
      //       contactNumber: stationData['contactNumber'] ?? '',
      //     ))
      //         .toList();
      //   });
      // } else {
      //   _stations = List.empty();
      // }
    }
  }

  @override
  void initState() {
    super.initState();

    _loadSchedules();
  }

  @override
  void dispose() {
    // Cancel any ongoing operations, such as network requests
    // or async computations.
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(80.0),
        child: AppBar(
          backgroundColor: Colors.white,
          elevation: 0, // Removes the back button
          title: Center(
            child: Padding(
              padding: const EdgeInsets.only(top: 30),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    CupertinoIcons.tram_fill, // Replace with your desired icon
                    color: Styles.secondaryColor, // Blue icon color
                  ),
                  const SizedBox(
                      width: 8), // Add some spacing between icon and text
                  Text(
                    "Train Schedules",
                    style: TextStyle(
                        color: Styles.primaryColor), // Blue title color
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
      body: ListView.builder(
        // Only one scheduleWidget for now
        itemBuilder: (BuildContext context, int index) {
          return Column(
            children: [
              scheduleWidget(
                classname: "First class",
                end: "Colombo Fort",
                start: "Galle",
                StartTime: "08:55 AM",
                name: "Gale Kumari",
                endTime: "10:15 AM",
                date: "2023-08-15",
              ),
              scheduleWidget(
                classname: "First class",
                end: "Colombo Fort",
                start: "Matara",
                StartTime: "06:55 AM",
                name: "Ruhunu Kumari",
                endTime: "09:25 AM",
                date: "2023-08-15",
              ),
              scheduleWidget(
                classname: "First class",
                end: "Beliatta",
                start: "Maradana",
                StartTime: "02:55 PM",
                name: "Gale Kumari",
                endTime: "06:30 PM",
                date: "2023-08-16",
              ),
              scheduleWidget(
                classname: "First class",
                end: "Galle",
                start: "Maradana",
                StartTime: "04:55 AM",
                name: "Sagarika",
                endTime: "08:20 AM",
                date: "2023-08-16",
              ),
            ],
          );
        },
      ),
    );
  }
}
