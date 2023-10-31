import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/modals/ReservationTicket.dart';
import 'package:passenger_frontend/screens/SeatBookingScreen.dart';
import 'package:passenger_frontend/services/trainScheduleService.dart';
import 'package:passenger_frontend/utils/error_handler.dart';
import 'package:passenger_frontend/widgets/ScheduleWidject.dart';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:timezone/data/latest.dart' as tzdata;
import 'package:timezone/timezone.dart';
import '../modals/schedule.dart';

class TrainSchedule extends StatefulWidget {
  final ReservationTicket
      reservationTicket; // Replace String with the type of data you want to pass

  TrainSchedule({required this.reservationTicket, Key? key}) : super(key: key);
  @override
  State<TrainSchedule> createState() => _TrainScheduleState(reservationTicket);
}

class _TrainScheduleState extends State<TrainSchedule> {
  List<dynamic> _schedules = [];
  String? startStation;
  String? endStation;

  final ReservationTicket reservationTicket;
  _TrainScheduleState(this.reservationTicket);
  String dateString = "2023-08-16T00:35:00.000Z";

  void _loadSchedules() async {
    if (!mounted) return;
    try {
      final TrainScheduleService trainScheduleService = TrainScheduleService();
      final response =
          await trainScheduleService.getSchedules(reservationTicket);

      final responseData = json.decode(response.body);
      // ErrorHandler.showErrorSnackBar(context, responseData.toString());
      // Print the response body (content)
      if (response.statusCode == 200) {
        final dynamic decodedResponse = json.decode(response.body);
        if (decodedResponse != null && decodedResponse['schedules'] != null) {
          // final List<> data = decodedResponse['schedules'];
          setState(() {
            _schedules = decodedResponse['schedules']["sortSchedules"];
            startStation = decodedResponse['schedules']['startStation'];
            endStation = decodedResponse['schedules']['endStation'];
          });
        } else {
          _schedules = List.empty();
        }
      } else {}
    } catch (e) {
      print('Error occurred: $e'); // Print the exception details
      ErrorHandler.showErrorSnackBar(
          context, 'Unknown error occurred. Please try again later.');
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
      //add if schedules are emplty then disply no schedules found
      body: _schedules.isEmpty
          ? Center(
              child: Text('No Schedules Found'),
            )
          : ListView.builder(
              itemCount: _schedules.length,
              itemBuilder: (context, index) {
                final schedule =
                    _schedules[index]; // Get the schedule at the current index

                final int scheduleId = schedule['scheduleId'];

                final int start = schedule['start'];
                final int end = schedule['end'];
                final String driverId = schedule['driverId'];
                final List<String> workingDays =
                    List<String>.from(schedule['WorkingDays']);
                final List<String> notWorking =
                    List<String>.from(schedule['notWorking']);

                // Access information about the train
                final Map<String, dynamic> train = schedule['Train'];
                final int trainId = train['trainId'];
                final String trainName = train['trainName'];
                final String trainNumber = train['trainNumber'];
                final String? starting = schedule['starting'];
                final String? ending = schedule['ending'];

                final String startTime =
                    getTime(DateTime.parse(schedule['startTime']));
                final String endTime =
                    getTime(DateTime.parse(schedule['endTime']));
                // Initialize the time zone data

                // Access the station schedule for this schedule
                final List<Map<String, dynamic>> stationSchedule =
                    List<Map<String, dynamic>>.from(
                        schedule['StationSchedule']);

                return Column(
                  children: [
                    GestureDetector(
                      onTap: () {
                        // Navigate to the new screen here
                        Navigator.of(context).push(
                          MaterialPageRoute(
                              builder: (context) => SeatBookingScreen(
                                    reservationTicket: reservationTicket,
                                    scheduleId: scheduleId,
                                    schedule: schedule,
                                  )),
                        );
                      },
                      child: scheduleWidget(
                          classname: reservationTicket.classname,
                          start: startStation,
                          end: endStation,
                          StartTime: startTime,
                          name: trainName,
                          endTime: endTime,
                          date: workingDays.toString(),
                          endingStation: ending,
                          startingStation: starting),
                    ),
                    // Add any desired spacing or dividers between scheduleWidget items.
                    SizedBox(
                        height:
                            16.0), // Example: Adds 16 pixels of vertical space
                    Divider(), // Example: Adds a horizontal divider line
                  ],
                );
                // return Column(
                //   children: [
                //     GestureDetector(
                //       onTap: () {
                //         // Navigate to the new screen here
                //         Navigator.of(context).push(
                //           MaterialPageRoute(
                //             builder: (context) =>
                //                 SeatBookingScreen(widget.reservationTicket, 3),
                //           ),
                //         );
                //       },
                //       child: scheduleWidget(
                //         classname: "First class",
                //         end: "Colombo Fort",
                //         start: "Galle",
                //         StartTime: "08:55 AM",
                //         name: "Gale Kumari",
                //         endTime: "10:15 AM",
                //         date: "2023-08-15",
                //       ),
                //     ),
                //     scheduleWidget(
                //       classname: "First class",
                //       end: "Beliatta",
                //       start: "Maradana",
                //       StartTime: "02:55 PM",
                //       name: "Gale Kumari",
                //       endTime: "06:30 PM",
                //       date: "2023-08-16",
                //     ),
                //     scheduleWidget(
                //       classname: "First class",
                //       end: "Galle",
                //       start: "Maradana",
                //       StartTime: "04:55 AM",
                //       name: "Sagarika",
                //       endTime: "08:20 AM",
                //       date: "2023-08-16",
                //     ),
                //   ],
                // );
              },
            ),
    );
  }

  String getTime(DateTime parse) {
    tzdata.initializeTimeZones();
    // Define your local time zone (Sri Lanka)
    String localTimeZone = "Asia/Colombo";

    // Convert the UTC DateTime to the local time zone
    TZDateTime localDateTime =
        TZDateTime.from(parse, getLocation(localTimeZone));

    // Format the local time as a string
    return DateFormat('HH:mm:ss').format(localDateTime);
  }
}
