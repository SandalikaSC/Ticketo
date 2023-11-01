import 'dart:convert';
import 'dart:math';

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

  int selected = 0;
  List<dynamic> seatReservations = [];
  List<Map<String, dynamic>> seats = [];
  List<String> coachCodes = [];
  List<String> coachCodesList = [];
  String selectedCoach = 'Coach A';
  List<List<int>> seatArrangement =
      List.generate(8, (row) => List.generate(5, (col) => 0));
  final random = Random();
  int rCol = 0;
  int rCol2 = 0;
  int rRow = 0;
  @override
  void initState() {
    super.initState();

    loadTrainInfo();
    rRow = random.nextInt(5);
    rCol = random.nextInt(5);
    rCol2 = random.nextInt(5);
  }

  void loadTrainInfo() async {
    if (!mounted) return;
    try {
      final TrainScheduleService trainScheduleService = TrainScheduleService();
      final response = await trainScheduleService.getTrainInfo(scheduleId,
          reservationTicket.classname, reservationTicket.depatureDate);

      final responseData = json.decode(response.body);
      if (response.statusCode == 200) {
        final dynamic decodedResponse = json.decode(response.body);
        if (decodedResponse != null) {
          setState(() {
            seatReservations = decodedResponse['coachArrangements'];
          });
          coachCodes = extractUniqueCoachCodes(seatReservations);

          setState(() {
            selectedCoach = coachCodes.isNotEmpty ? coachCodes[0] : 'Coach A';
            coachCodesList = coachCodes;
            // seats = seatReservations[0]['seats'];
          });
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
                    int selectedCoachIndex =
                        coachCodesList.indexOf(newValue ?? 'Coach A');
                    setState(() {
                      selectedCoach =
                          newValue ?? 'Coach A'; // Update the selected coach
                      // seats = seatReservations[selectedCoachIndex]['seats'];
                      updateSeatArrangement();
                    });
                  },
                  items: coachCodesList
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
                _buildLegendItem(
                    'Reserved', Color.fromARGB(255, 247, 152, 140)),
                _buildLegendItem('Selected', Styles.primaryColor),
                _buildLegendItem(
                    'Unselected', Color.fromARGB(255, 214, 211, 211)),
              ],
            ),
          ),

//add here seats  there are 8 rows and each row consist with 5 seats . in a row between 3rd and 4th seat there is a gap. each seat is named by2 digits first digit represent row number second digit represetnt column number

          // Seat arrangement
          Expanded(
            // child: GridView.builder(
            //   gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            //     crossAxisCount: 5,
            //   ),
            //   itemCount: 8 * 5, // Total seats
            //   itemBuilder: (BuildContext context, int index) {
            //     int row = index ~/ 5;
            //     int col = index % 5;
            //     String seatCode = '${String.fromCharCode(row + 65)}${col + 1}';
            //     int seatCodeint = row + col * 10;
            //     List<int> seatCodes =
            //         seats.map((seat) => seat['seatCode'] as int).toList();
            //     // bool isReserved =
            //     // getReserveSeatCodes(seatCodes).contains(seatCodeint);
            //     Color seatColor = seatArrangement[row][col] == 1
            //         ? Styles.primaryColor
            //         : (seatArrangement[row][col] == 2
            //             ? const Color.fromARGB(255, 247, 152, 140)
            //             : Color.fromARGB(255, 214, 211, 211));

            //     return GestureDetector(
            //       onTap: () {
            //         setState(() {
            //           if (seatArrangement[row][col] == 0) {
            //             // Implement your logic here when a seat is tapped
            //             // For example, you can mark it as selected or unselected.
            //             // seatArrangement[row][col] = 1; // Mark as selected
            //           } else if (seatArrangement[row][col] == 1) {
            //             // seatArrangement[row][col] = 0; // Mark as unselected
            //           }
            //         });
            //       },
            //       child: Container(
            //         width: 20, // Adjust the width as needed
            //         height: 20,
            //         margin: EdgeInsets.only(
            //           right: 5,
            //           left: 5,
            //           bottom: 35,
            //         ),
            //         decoration: BoxDecoration(
            //           color: seatColor,
            //           border:
            //               Border.all(color: Color.fromARGB(255, 118, 112, 112)),
            //           borderRadius: BorderRadius.circular(8.0),
            //         ),
            //         child: Center(
            //           child: Text('${String.fromCharCode(row + 65)}${col + 1}'),
            //         ),
            //       ),
            //     );
            //   },
            // ),

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

                // int randomNumber = random.nextInt(8);
                // int randomNumbercol = random.nextInt(5);
                if (row == rRow) {
                  if (col == rCol || col == rCol2) {
                    seatArrangement[row][col] == 2;
                    seatColor = Color.fromARGB(255, 246, 170, 160);
                  }
                }

                return GestureDetector(
                  onTap: () {
                    setState(() {
                      if (seatArrangement[row][col] == 0) {
                        if (selected >=
                                int.parse(
                                    widget.reservationTicket.passengers) ||
                            selected >= 8) {
                          showCustomToast(
                              context, "error", "Maximum seats Selected");
                        } else {
                          seatArrangement[row][col] = 1; // Mark as selected
                          selected++;
                        }
                      } else if (seatArrangement[row][col] == 1) {
                        seatArrangement[row][col] = 0; // Mark as unselected
                        selected--;
                      } else {}
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

                    if (selected < int.parse(reservationTicket.passengers)) {
                      showCustomToast(
                          context, "error", "More seats need to be selected");
                    } else {
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
                              reservationTicket: reservationTicket,
                              scheduleID: widget.scheduleId,
                              travelers: travelers),
                        ),
                      );
                    }
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

  List<String> extractUniqueCoachCodes(List<dynamic> coachArrangements) {
    Set<String> uniqueCodes = Set<String>();
    for (var arrangement in coachArrangements) {
      uniqueCodes.add(arrangement['code']);
    }
    return uniqueCodes.toList();
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

  getReserveSeatCodes(seat) {}
  void updateSeatArrangement() {
    // Reset seatArrangement to its initial state (all unselected)
    setState(() {
      seatArrangement = List.generate(8, (row) => List.generate(5, (col) => 0));
    });

    seatArrangement[rRow][rCol] = 0;
    seatArrangement[rRow][rCol2] = 0;
    rRow = random.nextInt(5);
    rCol = random.nextInt(5);
    rCol2 = random.nextInt(5);
    seatArrangement[rRow][rCol] = 2;
    seatArrangement[rRow][rCol2] = 2;

    setState(() {
      selected = 0;
    });
  }
}
