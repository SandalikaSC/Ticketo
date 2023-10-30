import 'package:flutter/material.dart';
import 'package:passenger_frontend/constants/app_styles.dart';

class RequestInformationCard extends StatelessWidget {
  final String status;
  final String appliedDate;
  final String startStation;
  final String endStation;
  final String travelClass;
  final String appliedMonth;
  final String price;

  RequestInformationCard({
    required this.status,
    required this.appliedDate,
    required this.startStation,
    required this.endStation,
    required this.travelClass,
    required this.appliedMonth,
    required this.price,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      margin: EdgeInsets.all(16.0),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Request Information',
              style: TextStyle(
                fontSize: 20.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 16.0),
            Divider(height: 1, thickness: 1), // Add a divider line
            SizedBox(height: 16.0),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Status',
                          style: TextStyle(fontWeight: FontWeight.bold)),
                      Text('Applied Month',
                          style: TextStyle(fontWeight: FontWeight.bold)),
                      SizedBox(height: 16.0),
                      Text('Applied Date',
                          style: TextStyle(fontWeight: FontWeight.bold)),
                      Text('Start Station',
                          style: TextStyle(fontWeight: FontWeight.bold)),
                      Text('End Station',
                          style: TextStyle(fontWeight: FontWeight.bold)),
                      Text('Class',
                          style: TextStyle(fontWeight: FontWeight.bold)),
                      Text('Price',
                          style: TextStyle(fontWeight: FontWeight.bold)),
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(status,
                          style: TextStyle(
                              color: Styles.secondaryColor,
                              fontWeight: FontWeight.bold,
                              fontSize: 20)),
                      Text(appliedMonth,
                          style: TextStyle(
                              color: const Color.fromARGB(255, 93, 124, 248),
                              fontWeight: FontWeight.bold,
                              fontSize: 20)),
                      SizedBox(height: 16.0),
                      Text(appliedDate),
                      Text(startStation),
                      Text(endStation),
                      Text(travelClass),
                      Text("Rs. " + price),
                    ],
                  ),
                ],
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: () {
                    // Add your button click action here
                  },
                  style: ElevatedButton.styleFrom(
                    primary: Styles.secondaryColor, // Background color
                    onPrimary: Colors.white, // Text color
                    shape: RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius.circular(20.0), // Round corners
                    ),
                  ),
                  child: Text('Delete'),
                ),
                if (status != 'REJECTED')
                  ElevatedButton(
                    onPressed: () {
                      // Add your button click action here
                    },
                    style: ElevatedButton.styleFrom(
                      primary: Styles.primaryColor, // Background color
                      onPrimary: Colors.white, // Text color
                      shape: RoundedRectangleBorder(
                        borderRadius:
                            BorderRadius.circular(20.0), // Round corners
                      ),
                    ),
                    child: Text('Pay'),
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// void main() {
//   runApp(MaterialApp(
//     home: Scaffold(
//       appBar: AppBar(
//         title: Text('Request Information Card Example'),
//       ),
//       body: Center(
//         child: RequestInformationCard(
//           status: 'Pending',
//           appliedDate: '2023-10-29',
//           startStation: 'Station A',
//           endStation: 'Station B',
//           travelClass: 'First Class',
//           appliedMonth: 'October 2023',
//           price: 75.50,
//         ),
//       ),
//     ),
//   ));
// }
