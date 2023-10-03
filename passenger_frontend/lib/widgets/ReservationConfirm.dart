import 'package:flutter/material.dart';

class ConfirmationDialog extends StatelessWidget {
  final String seats;
  final String coachData;
  final String startDestination;
  final String trainName;
  final VoidCallback onConfirm;

  ConfirmationDialog({
    required this.seats,
    required this.coachData,
    required this.startDestination,
    required this.trainName,
    required this.onConfirm,
  });

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text('Confirmation'),
      content: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('Seats: $seats'),
          Text('Coach Data: $coachData'),
          Text('Start Destination: $startDestination'),
          Text('Train Name: $trainName'),
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
            onConfirm(); // Call the provided callback function
            Navigator.of(context).pop(); // Close the dialog
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
        required String startDestination,
        required String trainName,
        required VoidCallback onConfirm,
      }) async {
    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return ConfirmationDialog(
          seats: seats,
          coachData: coachData,
          startDestination: startDestination,
          trainName: trainName,
          onConfirm: onConfirm,
        );
      },
    );
  }
}
