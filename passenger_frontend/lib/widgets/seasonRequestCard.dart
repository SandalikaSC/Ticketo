import 'dart:convert';
// import 'dart:js';
// import 'dart:js_inter

import 'package:flutter/material.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/constants/payhereCredentials.dart';
import 'package:passenger_frontend/services/season_service.dart';
import 'package:passenger_frontend/utils/error_handler.dart';
import 'package:passenger_frontend/widgets/customSnackBar.dart';
import 'package:payhere_mobilesdk_flutter/payhere_mobilesdk_flutter.dart';

class RequestInformationCard extends StatefulWidget {
  final String seasonId;
  final String status;
  final String appliedDate;
  final String startStation;
  final String endStation;
  final String travelClass;
  final String appliedMonth;
  final double price;

  RequestInformationCard({
    required this.seasonId,
    required this.status,
    required this.appliedDate,
    required this.startStation,
    required this.endStation,
    required this.travelClass,
    required this.appliedMonth,
    required this.price,
  });
  @override
  _RequestInformationCardState createState() => _RequestInformationCardState(
      seasonId,
      status,
      appliedDate,
      startStation,
      endStation,
      travelClass,
      appliedMonth,
      price);
}

class _RequestInformationCardState extends State<RequestInformationCard> {
  String? seasonId;
  String? status;
  String? appliedDate;
  String? startStation;
  String? endStation;
  String? travelClass;
  String? appliedMonth;
  double? price;

  _RequestInformationCardState(
      this.seasonId,
      this.status,
      this.appliedDate,
      this.startStation,
      this.endStation,
      this.travelClass,
      this.appliedMonth,
      this.price);
  Future<void> deleteSeasonRequest() async {
    final SeasonService seasonService = SeasonService();
    try {
      final response = await seasonService.getSeasonInfo();
      final responseData = json.decode(response.body);
      // Print the response body (content)

      if (response.statusCode == 200) {
        final dynamic decodedResponse = json.decode(response.body);

        setState(() {
          seasonId = null;
          status = null;
          appliedDate = null;
          startStation = null;
          endStation = null;
          travelClass = null;
          appliedMonth = null;
          price = null;
        });
      } else {
        showCustomToast(context, "error", "Something Went wrong Try again");
      }
    } catch (e) {
      print('Error occurred: $e'); // Print the exception details
      showCustomToast(context, "error", "Something Went wrong Try again");
    }
  }

  @override
  Widget build(BuildContext context) {
    if (seasonId != null &&
        status != null &&
        appliedDate != null &&
        startStation != null &&
        endStation != null &&
        travelClass != null &&
        appliedMonth != null &&
        price != null) {
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
                        Text(status ?? "",
                            style: TextStyle(
                                color: Styles.secondaryColor,
                                fontWeight: FontWeight.bold,
                                fontSize: 20)),
                        Text(appliedMonth ?? "",
                            style: TextStyle(
                                color: const Color.fromARGB(255, 93, 124, 248),
                                fontWeight: FontWeight.bold,
                                fontSize: 20)),
                        SizedBox(height: 16.0),
                        Text(appliedDate ?? ""),
                        Text(startStation ?? ""),
                        Text(endStation ?? ""),
                        Text(travelClass ?? ""),
                        Text("Rs. " + (price.toString())),
                      ],
                    ),
                  ],
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  if (status != 'PAID')
                    ElevatedButton(
                      onPressed: () {
                        deleteSeasonRequest();
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
                  if (status != 'REJECTED' ||
                      status != 'PAID' ||
                      status != 'PENDING')
                    ElevatedButton(
                      onPressed: () {
                        displayGateway(price ?? 200.00);
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
    } else {
      return Text('No Pending Season Request');
    }
  }

  void displayGateway(double payAmount) {
    Map paymentObject = {
      "sandbox": true, // true if using Sandbox Merchant ID
      "merchant_id": PayHereAccountCredentials().merchantId,
      "merchant_secret":
          PayHereAccountCredentials().merchantSecret, // See step 4e
      "notify_url": "http://sample.com/notify",
      "order_id": "ItemNo12345",
      "items": "One Time Payment",
      "amount": payAmount,
      "currency": "LKR",
      "first_name": "Dileepa",
      "last_name": "Bandara",
      "email": "contact.dileepabandara@gmail.com",
      "phone": "0712691003",
      "address": "No.474/1, Ranjanagama Road, Gepallwa, Uhumeeya",
      "city": "Kurunegala",
      "country": "Sri Lanka",
      "delivery_address": "No. 46, Galle road, Kalutara South",
      "delivery_city": "Kalutara",
      "delivery_country": "Sri Lanka",
      "custom_1": "",
      "custom_2": ""
    };

    PayHere.startPayment(paymentObject, (paymentId) {
      print("One Time Payment Success. Payment Id: $paymentId");
      showCustomToast(context, "success", "Success");
    }, (error) {
      print("One Time Payment Failed. Error: $error");
      showCustomToast(context, "error", error);
    }, () {
      // showCustomToast(context, "error", "dissmisses");
      paySeason(seasonId);
    });
  }

  Future<void> paySeason(seasonId) async {
    if (!mounted) return; // Check if the widget is still mounted

    try {
      final response = await SeasonService().paySeason(seasonId);
      final responseData = json.decode(response.body);

      if (response.statusCode == 200) {
        setState(() {
          status = "PAID";
        });
        showCustomToast(context, "success", "Successfully paid for the season");
      }
      if (response.statusCode == 400) {
        showCustomToast(context, "error", "Something went wrong try again");
      }
    } catch (e) {
      print('Error occurred: $e'); // Print the exception details
      showCustomToast(context, "error", "Something went wrong try again");
    }
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
