import 'dart:convert';
// import 'dart:js_interop';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:passenger_frontend/screens/applySeason.dart';
import 'package:passenger_frontend/services/season_service.dart';
import 'package:passenger_frontend/utils/error_handler.dart';
import 'package:passenger_frontend/widgets/SeasonTicket.dart';
import 'package:passenger_frontend/widgets/seasonRequestCard.dart';

class SeasonPage extends StatefulWidget {
  const SeasonPage({super.key});

  @override
  State<SeasonPage> createState() => _SeasonPageState();
}

class _SeasonPageState extends State<SeasonPage> {
  final SeasonService seasonService = SeasonService();
  dynamic myseasonData;
  dynamic seasonReqData;

  @override
  void initState() {
    super.initState();
    _loadSeasonInfo();
  }

  Future<void> _loadSeasonInfo() async {
    if (!mounted) return; // Check if the widget is still mounted

    try {
      final response = await seasonService.getSeasonInfo();
      final responseData = json.decode(response.body);
      // Print the response body (content)

      if (response.statusCode == 200) {
        final dynamic decodedResponse = json.decode(response.body);

        setState(() {
          myseasonData = decodedResponse['myseason'];
          seasonReqData = decodedResponse['seasonReq'];
        });
      }
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
    List<Widget> children = [
      Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => SeasonApplication()),
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
    ];

    if (myseasonData != null) {
      children.insert(
          0,
          SeasonTicket(
              qrCodeData: List<int>.from(myseasonData['qrcode']['data']),
              start: myseasonData['startStation'].toString(),
              end: myseasonData['endStation'].toString(),
              classname: myseasonData['seasonClass'].toString() + " Class",
              month: myseasonData['month'].toString(),
              type: myseasonData['seasonType']));
    } else {
      children.insert(0, Center(child: Text('No Seasons')));
    }
    if (seasonReqData != null) {
      children.insert(
          2,
          RequestInformationCard(
            seasonId: seasonReqData['seasonId'],
            status: seasonReqData['status'],
            appliedDate: seasonReqData['applyedDate'],
            startStation: seasonReqData['startStation'].toString(),
            endStation: seasonReqData['endStation'].toString(),
            travelClass: seasonReqData['seasonClass'].toString() + " Class",
            appliedMonth: seasonReqData['month'],
            price: seasonReqData['price'],
          ));
    } else {
      children.insert(2, Center(child: Text('No Requests')));
    }
    return Scaffold(
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.0), // Add padding for spacing

        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: children,
        ),
      ),
    );
  }
}
