import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/modals/ReservationTicket.dart';
import 'package:passenger_frontend/modals/Traveller.dart';
import 'package:passenger_frontend/screens/reservationInformation.dart';
import 'package:passenger_frontend/services/trainScheduleService.dart';
import 'package:passenger_frontend/utils/error_handler.dart';
import 'package:passenger_frontend/widgets/customSnackBar.dart';

class SeatBookingScreen extends StatefulWidget {
  final ReservationTicket reservationTicket;
  final int scheduleId;
  final Map<String, dynamic> schedule;

  SeatBookingScreen({
    Key? key,
    required this.reservationTicket,
    required this.scheduleId,
    required this.schedule,
  }) : super(key: key);
  @override
  _SeatBookingScreenState createState() =>
      _SeatBookingScreenState(reservationTicket, scheduleId, schedule);
}

class _SeatBookingScreenState extends State<SeatBookingScreen> {
  final ReservationTicket reservationTicket;
  final int scheduleId;
  Map<String, dynamic> schedule;
  _SeatBookingScreenState(
      this.reservationTicket, this.scheduleId, this.schedule);
  List<List<int>> seatArrangement =
      List.generate(8, (row) => List.generate(5, (col) => 0));
  String selectedCoach = 'Coach A';

  @override
  void initState() {
    super.initState();

    loadTrainInfo();
  }

  void loadTrainInfo() async {
    if (!mounted) return;
    try {
      final TrainScheduleService trainScheduleService = TrainScheduleService();
      final response = await trainScheduleService.getTrainInfo(
          scheduleId, reservationTicket.depatureDate);

      final responseData = json.decode(response.body);
      if (response.statusCode == 200) {
        final dynamic decodedResponse = json.decode(response.body);
        if (decodedResponse != null && decodedResponse['schedules'] != null) {
          setState(() {});
        } else {}
      } else {}
    } catch (e) {
      print('Error occurred: $e'); // Print the exception details
      ErrorHandler.showErrorSnackBar(
          context, 'Unknown error occurred. Please try again later.');
    }
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
                    "Book Your Seat",
                    style: TextStyle(
                        color: Styles.primaryColor), // Blue title color
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
      body: Column(
        children: [
          // Row to select coach
          Padding(
            padding: EdgeInsets.all(16.0),
            child: Row(
              children: [
                Text('Select Coach:    '),
                DropdownButton<String>(
                  value: selectedCoach, // Use the selectedCoach variable here
                  onChanged: (String? newValue) {
                    setState(() {
                      selectedCoach =
                          newValue ?? 'Coach A'; // Update the selected coach
                    });
                  },
                  items: <String>['Coach A', 'Coach B', 'Coach C', 'Coach D']
                      .map<DropdownMenuItem<String>>((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
          // Row to explain labels
          Padding(
            padding: EdgeInsets.all(16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildLegendItem('Reserved', Styles.secondaryColor),
                _buildLegendItem('Selected', Styles.primaryColor),
                _buildLegendItem(
                    'Unselected', Color.fromARGB(255, 214, 211, 211)),
              ],
            ),
          ),
          // Seat arrangement
          Expanded(
            child: GridView.builder(
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 5,
              ),
              itemCount: 6 * 5, // Total seats
              itemBuilder: (BuildContext context, int index) {
                int row = index ~/ 5;
                int col = index % 5;
                Color seatColor = seatArrangement[row][col] == 1
                    ? Styles.primaryColor
                    : (seatArrangement[row][col] == 2
                        ? Styles.secondaryColor
                        : Color.fromARGB(255, 214, 211, 211));

                return GestureDetector(
                  onTap: () {
                    setState(() {
                      if (seatArrangement[row][col] == 0) {
                        // if (seatArrangement.length <=
                        //         int.parse(
                        //             widget.reservationTicket.passengers) ||
                        //     seatArrangement.length == 8) {
                        //   showCustomToast(
                        //       context, "error", "Maximum seats Selected");
                        // } else {
                        seatArrangement[row][col] = 1; // Mark as selected
                        // }
                      } else if (seatArrangement[row][col] == 1) {
                        seatArrangement[row][col] = 0; // Mark as unselected
                      }
                    });
                  },
                  child: Container(
                    margin: EdgeInsets.only(
                      right: 5,
                      left: 5,
                      bottom: 25,
                    ),
                    decoration: BoxDecoration(
                      color: seatColor,
                      border:
                          Border.all(color: Color.fromARGB(255, 118, 112, 112)),
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    child: Center(
                      child: Text('${String.fromCharCode(row + 65)}${col + 1}'),
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: EdgeInsets.all(16.0),
            child: Text(
              'Note: You can reserve up to 8 seats.',
              style: TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                ElevatedButton(
                  onPressed: () {
                    // Handle cancel button click
                    Navigator.pop(context);
                  },
                  child: Text('Cancel'),
                ),
                ElevatedButton(
                  onPressed: () {
                    // Handle confirm button click

                    // if (seatArrangement.length <
                    //     int.parse(widget.reservationTicket.passengers)) {
                    //   showCustomToast(context, "error", "Invalid Seat Count");
                    // } else if (seatArrangement.length >
                    //     int.parse(widget.reservationTicket.passengers)) {
                    //   showCustomToast(context, "info", "More Seats to Select");
                    // } else {
                    List<Traveler> travelers = List.generate(
                      int.parse(widget.reservationTicket.passengers),
                      (index) => Traveler(name: '', nic: ''),
                    );
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => ReservationInformationScreen(
                            selectedCoach: selectedCoach,
                            selectedSeats: seatArrangement,
                            reservationTicket: widget.reservationTicket,
                            scheduleID: widget.scheduleId,
                            travelers: travelers),
                      ),
                    );
                    // }
                  },
                  child: Text('Confirm'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLegendItem(String label, Color color) {
    return Row(
      children: [
        Container(
          width: 20.0,
          height: 20.0,
          color: color,
        ),
        SizedBox(width: 8.0),
        Text(label),
      ],
    );
  }
}
