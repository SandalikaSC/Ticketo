import 'dart:convert';
import 'dart:ffi';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/modals/ReservationTicket.dart';
import 'package:passenger_frontend/modals/Traveller.dart';
import 'package:passenger_frontend/screens/bottom_bar.dart';
import 'package:passenger_frontend/services/trainScheduleService.dart';
import 'package:passenger_frontend/utils/error_handler.dart';
import 'package:passenger_frontend/widgets/ReservationConfirm.dart';
import 'package:passenger_frontend/widgets/customSnackBar.dart';

class ReservationInformationScreen extends StatefulWidget {
  final String selectedCoach;
  final List<List<int>> selectedSeats;
  final ReservationTicket reservationTicket;
  final int scheduleID;
  List<Traveler>? travelers;

  ReservationInformationScreen(
      {required this.selectedCoach,
      required this.selectedSeats,
      required this.reservationTicket,
      required this.scheduleID,
      this.travelers});

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

  bool _validateTravelerInformation() {
    for (int index = 0; index < widget.travelers!.length; index++) {
      Traveler? traveler = widget.travelers?[index];
      if (!_isNameValid(traveler?.name ?? '') ||
          !_isNICValid(traveler?.nic ?? '')) {
        return false; // Validation failed for at least one traveler
      }
    }
    return true; // All travelers' information is valid
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
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
                  style:
                      TextStyle(color: Styles.primaryColor), // Blue title color
                ),
              ],
            ),
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Reservation Details Section
            Center(
              child: Card(
                color: Color.fromARGB(255, 231, 242, 255),
                elevation: 2.0,
                margin: EdgeInsets.symmetric(vertical: 10.0),
                child: Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        'Reservation Details',
                        style: TextStyle(
                          fontSize: 28.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 10.0),
                      Text(
                        'Coach  ${widget.selectedCoach}',
                        style: TextStyle(
                            fontSize: 18.0,
                            fontWeight: FontWeight.bold,
                            color: Colors.blueGrey),
                      ),
                      // Text('Schedule ID: ${widget.scheduleID}'),
                      Text('Seats ',
                          style: TextStyle(
                              fontSize: 18.0,
                              fontWeight: FontWeight.bold,
                              color: Colors.blueGrey)),
                      Text(
                        '${getSelectedSeats(widget.selectedSeats).toString()}',
                        style: TextStyle(
                          fontSize: 18.0,
                          fontWeight: FontWeight.bold,
                          color: Styles.secondaryColor,
                        ),
                      )
                    ],
                  ),
                ),
              ),
            ),

            // Traveler Information Section
            // Inside the 'Traveler Information Section' Card, uncomment and modify the code as follows:

            Padding(
              padding: const EdgeInsets.all(18.0),
              child: Card(
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

                      // Add text fields for traveler information
                      ListView.builder(
                        shrinkWrap: true,
                        itemCount:
                            int.parse(widget.reservationTicket.passengers),
                        itemBuilder: (BuildContext context, int index) {
                          // Access the traveler from the list
                          Traveler? traveler = widget.travelers?[index];

                          return Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Passenger ${index + 1}'),
                              TextFormField(
                                decoration: InputDecoration(labelText: 'Name'),
                                initialValue: traveler?.name,
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
                                initialValue: traveler?.nic,
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
            ),

            // Buttons Section

            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                ElevatedButton(
                  onPressed: () {
                    if (_validateTravelerInformation()) {
                      ConfirmationDialog.showConfirmationDialog(
                        context,
                        seats:
                            getSelectedSeats(widget.selectedSeats).toString(),
                        coachData: widget.selectedCoach,
                        start: widget.reservationTicket.startStation!.name,
                        destination: widget.reservationTicket.endStation!.name,
                        trainName: "Galu Kumari Train",
                        onConfirm: () {
                          // Add your confirmation logic here
                          // This code will be executed when the "Confirm" button is pressed.
                        },
                      );
                    } else {
                      // Show an error message or handle the validation failure as needed.
                      // For example, display a snackbar or dialog to inform the user.
                    }
                  },
                  child: Text('Back'),
                ),
                ElevatedButton(
                  onPressed: () {
                    // Example usage of the ConfirmationDialog
                    ConfirmationDialog.showConfirmationDialog(
                      context,
                      seats: getSelectedSeats(widget.selectedSeats).toString(),
                      coachData: widget.selectedCoach,
                      start: widget.reservationTicket.startStation!.name,
                      destination: widget.reservationTicket.endStation!.name,
                      trainName: "Galu Kumari Train",
                      onConfirm: () {
                        Navigator.of(context).pop();
                        showCustomToast(
                            context, "success", "Reservation Completed");
                        Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const BottomBar()),
                        );
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
    );
  }
  // void saveReservation() async {
  //   try {
  //     final TrainScheduleService trainScheduleService = TrainScheduleService();

  //     final response = await trainScheduleService.saveReservation();

  //     final responseData = json.decode(response.body);

  //     if (response.statusCode == 200) {
  //       final dynamic decodedResponse = json.decode(response.body);
  //       if (decodedResponse != null) {
  //       } else {}
  //     } else {}
  //   } catch (e) {
  //     print('Error occurred: $e'); // Print the exception details
  //     ErrorHandler.showErrorSnackBar(
  //         context, 'Unknown error occurred. Please try again later.');
  //   }
  // }

  List<String> getSelectedSeats(List<List<int>> selectedSeats) {
    List<String> result = [];
    for (int row = 0; row < selectedSeats.length; row++) {
      for (int col = 0; col < selectedSeats[row].length; col++) {
        if (selectedSeats[row][col] == 1) {
          result.add('${String.fromCharCode(row + 65)}${col + 1}');
        }
      }
    }
    return result;
  }
}
