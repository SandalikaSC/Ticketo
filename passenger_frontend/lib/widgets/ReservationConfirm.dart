import 'dart:convert';
// import 'dart:js';

import 'package:flutter/material.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/screens/bottom_bar.dart';
import 'package:passenger_frontend/services/trainScheduleService.dart';
import 'package:passenger_frontend/utils/error_handler.dart';
import 'package:passenger_frontend/widgets/customSnackBar.dart';

class ConfirmationDialog extends StatelessWidget {
  final String seats;
  final String coachData;
  final String start;
  final String destination;
  final String trainName;
  final VoidCallback onConfirm;

  ConfirmationDialog({
    required this.seats,
    required this.coachData,
    required this.start,
    required this.destination,
    required this.trainName,
    required this.onConfirm,
  });

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(
        'Confirmation',
        style: TextStyle(
          fontSize: 18.0,
          fontWeight: FontWeight.bold,
          color: Styles.secondaryColor,
        ),
      ),
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('Seats  $seats'),
          Text('Coach Data  $coachData'),
          Text('Start  $start'),
          Text('End  $destination'),
        ],
      ),
      actions: [
        ElevatedButton(
          onPressed: () {
            Navigator.of(context).pop(); // Close the dialog
          },
          child: Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: () {
            // Call the provided callback function

            // saveReservation();
            Navigator.of(context).pop();
            showCustomToast(context, "success", "Reservation Completed");
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (context) => const BottomBar()),
            );
            // Close the dialog
          },
          child: Text('Confirm'),
        ),
      ],
    );
  }

  static Future<void> showConfirmationDialog(
    BuildContext context, {
    required String seats,
    required String coachData,
    required String start,
    required String destination,
    required String trainName,
    required VoidCallback onConfirm,
  }) async {
    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return ConfirmationDialog(
          seats: seats,
          coachData: coachData,
          start: start,
          destination: destination,
          trainName: trainName,
          onConfirm: onConfirm,
        );
      },
    );
  }
}
