import 'dart:ffi';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/modals/ReservationTicket.dart';
import 'package:passenger_frontend/modals/Traveller.dart';
import 'package:passenger_frontend/widgets/ReservationConfirm.dart';

class ReservationInformationScreen extends StatefulWidget {
  final String selectedCoach;
  final List<List<int>> selectedSeats;
  final ReservationTicket reservationTicket;
  final int scheduleID;
    List<Traveler>? travelers;

  ReservationInformationScreen({
    required this.selectedCoach,
    required this.selectedSeats,
    required this.reservationTicket,
    required this.scheduleID,
    this.travelers
  });

  @override
  _ReservationInformationScreenState createState() =>
      _ReservationInformationScreenState();
}

class _ReservationInformationScreenState
    extends State<ReservationInformationScreen> {
  bool _isNameValid(String input) {
    // Define a regular expression to match English letters (both uppercase and lowercase)
    RegExp englishLetters = RegExp(r'^[a-zA-Z]+$');

    // Use the RegExp's `hasMatch` method to check if the input contains only English letters
    return englishLetters.hasMatch(input);
  }
  bool _isNICValid(String input) {
    // Define a regular expression to match a NIC pattern:
    // - Either exactly 10 digits or 9 digits ending with 'V'
    RegExp nicPattern = RegExp(r'^\d{10}$|^\d{9}V$');

    // Use the RegExp's `hasMatch` method to check if the input matches either pattern
    return nicPattern.hasMatch(input);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      appBar:
        AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title:  Center(
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
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Reservation Details Section
              Card(
                elevation: 2.0,
                margin: EdgeInsets.symmetric(vertical: 10.0),
                child: Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Reservation Details',
                        style: TextStyle(
                          fontSize: 18.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 10.0),
                      Text('Coach: ${widget.selectedCoach}'),
                      Text('Schedule ID: ${widget.scheduleID}'),
                      Text('Seats:'),
                      for (int row = 0;
                          row < widget.selectedSeats.length;
                          row++)
                        for (int col = 0;
                            col < widget.selectedSeats[row].length;
                            col++)
                          if (widget.selectedSeats[row][col] == 1)
                            Text('${String.fromCharCode(row + 65)}${col + 1}'),
                    ],
                  ),
                ),
              ),

              // Traveler Information Section
              Card(
                elevation: 2.0,
                margin: EdgeInsets.symmetric(vertical: 10.0),
                child: Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Traveler Information',
                        style: TextStyle(
                          fontSize: 18.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 10.0),
//add to enter name and nic textfields for each passenger
// Traveler Information Section
                      Card(
                        elevation: 2.0,
                        margin: EdgeInsets.symmetric(vertical: 10.0),
                        child: Padding(
                          padding: EdgeInsets.all(16.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              // Text(
                              //   'Traveler Information',
                              //   style: TextStyle(
                              //     fontSize: 18.0,
                              //     fontWeight: FontWeight.bold,
                              //   ),
                              // ),
                              SizedBox(height: 10.0),
                              // Add text fields for traveler information

                              ListView.builder(
                                shrinkWrap: true,
                                itemCount: int.parse(widget.reservationTicket.passengers), // Use the length of the travelers list
                                itemBuilder: (BuildContext context, int index) {
                                  Traveler? traveler =  widget.travelers?[index]; // Access the traveler from the list
                                  return Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text('Passenger ${index + 1}'),
                                      TextFormField(
                                        decoration: InputDecoration(labelText: 'Name'),
                                        initialValue: traveler?.name, // Set the initial value from the traveler object
                                        onChanged: (value) {

                                            setState(() {
                                              traveler?.name = value;
                                            });


                                        },
                                        validator: (value) {

                                          if (!_isNameValid(value!)) {
                                           return "Name is not valid";
                                          }
                                          return null;
                                        },
                                      ),
                                      TextFormField(
                                        decoration: InputDecoration(labelText: 'NIC'),
                                        initialValue: traveler?.nic, // Set the initial value from the traveler object
                                        onChanged: (value) {
                                          setState(() {
                                            traveler?.nic = value;
                                          });
                                        },
                                        validator: (value) {

                                          if (!_isNICValid(value!)) {
                                            return "NIC is not valid";
                                          }
                                          return null;
                                        },
                                      ),
                                      SizedBox(height: 10.0),
                                    ],
                                  );
                                },
                              )

                            ],
                          ),
                        ),
                      ),

                     ],
                  ),
                ),
              ),

              // Buttons Section
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  ElevatedButton(
                    onPressed: () {
                      // Add your back button logic here
                    },
                    child: Text('Back'),
                  ),
                  ElevatedButton(
                    onPressed: () {
                      // Example usage of the ConfirmationDialog
                      ConfirmationDialog.showConfirmationDialog(
                        context,
                        seats: "C2, C3",
                        coachData: "Coach A",
                        startDestination: widget.reservationTicket.startStation!.name,
                        trainName: "Galu Kumari Train",
                        onConfirm: () {
                          // Add your confirmation logic here
                          // This code will be executed when the "Confirm" button is pressed.
                        },
                      );

                    },
                    child: Text('Confirm'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
