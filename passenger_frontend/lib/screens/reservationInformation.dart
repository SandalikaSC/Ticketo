import 'dart:ffi';
import 'package:flutter/material.dart';
import 'package:passenger_frontend/modals/ReservationTicket.dart';

class ReservationInformationScreen extends StatefulWidget {
  final String selectedCoach;
  final List<List<int>> selectedSeats;
  final ReservationTicket reservationTicket;
  final int scheduleID;

  ReservationInformationScreen({
    required this.selectedCoach,
    required this.selectedSeats,
    required this.reservationTicket,
    required this.scheduleID,
  });

  @override
  _ReservationInformationScreenState createState() =>
      _ReservationInformationScreenState();
}

class _ReservationInformationScreenState
    extends State<ReservationInformationScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Reservation Information'),
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
                      Text('Selected Coach: ${widget.selectedCoach}'),
                      Text('Selected Schedule ID: ${widget.scheduleID}'),
                      Text('Selected Seats:'),
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
                      for (final passenger=int.parse(widget.reservationTicket.passengers;))
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Name: ${passenger.name}'),
                            Text('NIC: ${passenger.nic}'),
                            SizedBox(height: 10.0),
                          ],
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
                      // Add your confirm button logic here
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
