import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/modals/ReservationTicket.dart';
import 'package:passenger_frontend/widgets/ScheduleWidject.dart';

class TrainSchedule extends StatefulWidget {

  final ReservationTicket  reservationTicket; // Replace String with the type of data you want to pass

  TrainSchedule({required this.reservationTicket, Key? key}) : super(key: key);
  @override
  State<TrainSchedule> createState() => _TrainScheduleState();
}

class _TrainScheduleState extends State<TrainSchedule> {

  void _loadSchedules() async {
    if (!mounted) return;
    final response = await trainScheduleService.loadSchedules();
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
                passengers: 5,
                endTime: "10:15 AM",
                date: "2023-08-15",
              ),
              scheduleWidget(
                classname: "First class",
                end: "Colombo Fort",
                start: "Matara",
                StartTime: "06:55 AM",
                name: "Ruhunu Kumari",
                passengers: 5,
                endTime: "09:25 AM",
                date: "2023-08-15",
              ),
              scheduleWidget(
                classname: "First class",
                end: "Beliatta",
                start: "Maradana",
                StartTime: "02:55 PM",
                name: "Gale Kumari",
                passengers: 5,
                endTime: "06:30 PM",
                date: "2023-08-16",
              ),
              scheduleWidget(
                classname: "First class",
                end: "Galle",
                start: "Maradana",
                StartTime: "04:55 AM",
                name: "Sagarika",
                passengers: 5,
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
