import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:intl/number_symbols_data.dart';
import 'package:passenger_frontend/constants/app_styles.dart';

import '../modals/payment.dart';

class PaymentHistory extends StatefulWidget {
  final List<Payment> paymentList;

  PaymentHistory({
    required this.paymentList,
    Key? key,
  }) : super(key: key);

  @override
  _PaymentHistoryState createState() => _PaymentHistoryState(paymentList);
}

class _PaymentHistoryState extends State<PaymentHistory> {
  final List<Payment> paymentList;
  DateTime? fromDate;
  DateTime? toDate;
  NumberFormat numberFormat = NumberFormat("0.00", "en_US"); // "0.00" means two decimal places

  _PaymentHistoryState(this.paymentList);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:  PreferredSize(
        preferredSize: Size.fromHeight(120.0),
        child: AppBar(
          backgroundColor: Colors.white,
          elevation: 0, // Removes the back button
          title: Padding(
            padding: const EdgeInsets.only(top: 30),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  CupertinoIcons.money_dollar_circle, // Replace with your desired icon
                  color: Styles.secondaryColor, // Blue icon color
                ),
                const SizedBox(
                    width: 8), // Add some spacing between icon and text
                Text(
                  "Payment History",
                  style: TextStyle(
                      color: Styles.primaryColor), // Blue title color
                ),
              ],
            ),
          ),
        ),
      ),
      body:  ListView.builder(
        itemCount:  paymentList.length , // Display the first 3 items or less
        itemBuilder: (context, index) {
          // Build your list item here using payments[index]
          Payment payment = paymentList[index]; // Access the payment object

          return ClipRRect(
            // Wrap Card with ClipRRect for border radius
            borderRadius: BorderRadius.circular(50.0), // Set the desired border radius
            child: Card(
              // elevation: 2,
              color: Colors.white,
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Row(
                  children: [
                    const Icon(
                      CupertinoIcons.ticket,
                      size: 30,
                      color: Colors.grey,
                    ),
                    const SizedBox(width: 20),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            payment.relatedName ?? '', // Access payment-related data
                            style: TextStyle(
                              fontFamily: "poppins",
                              color: Color.fromARGB(255, 91, 88, 88),
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            ),
                          ),
                          Text(
                            '${DateFormat('yyyy-MM-dd HH:mm').format(payment.date)}',
                            style: const TextStyle(
                              fontFamily: "poppins",
                              color: Colors.black38,
                              fontWeight: FontWeight.w500,
                              fontSize: 13,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Text(
                      'Rs ${numberFormat.format(payment.amount)}', // Access payment-related data and format it
                      style: TextStyle(
                        fontFamily: "poppins",
                        color: Color(0xFF3D50AC),
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
