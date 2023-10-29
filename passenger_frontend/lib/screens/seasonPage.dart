import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:passenger_frontend/screens/applySeason.dart';
import 'package:passenger_frontend/widgets/SeasonTicket.dart';
import 'package:passenger_frontend/widgets/seasonRequestCard.dart';

class SeasonPage extends StatefulWidget {
  const SeasonPage({super.key});

  @override
  State<SeasonPage> createState() => _SeasonPageState();
}

class _SeasonPageState extends State<SeasonPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: EdgeInsets.all(16.0), // Add padding for spacing
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // SeasonTicket(
            //     qrCodeData: [69, 78, 68, 174, 130],
            //     start: "Ahangama",
            //     end: "Galle",
            //     classname: "Second Class",
            //     month: "October",
            //     type: "Govenment"),
            Center(
              child: ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => SeasonApplication()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  primary: Colors.red, // Background color
                  onPrimary: Colors.white, // Text color
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20.0), // Round corners
                  ),
                ),
                child: Text('Apply Season'),
              ),
            ),
            RequestInformationCard(
              status: 'Pending',
              appliedDate: '2023-10-29',
              startStation: 'Station A',
              endStation: 'Station B',
              travelClass: 'First Class',
              appliedMonth: 'October 2023',
              price: 75.50,
            ),
          ],
        ),
      ),
    );
  }
}
