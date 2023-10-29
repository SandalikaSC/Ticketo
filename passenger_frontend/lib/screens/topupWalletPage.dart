import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/constants/payhereCredentials.dart';
import 'package:passenger_frontend/screens/bottom_bar.dart';
import 'package:passenger_frontend/services/WalletService.dart';
import 'package:passenger_frontend/utils/error_handler.dart';
import 'package:passenger_frontend/widgets/customSnackBar.dart';
import 'package:payhere_mobilesdk_flutter/payhere_mobilesdk_flutter.dart';

class TopUpWalletPage extends StatefulWidget {
  const TopUpWalletPage({Key? key}) : super(key: key);

  @override
  _TopUpWalletPageState createState() => _TopUpWalletPageState();
}

class _TopUpWalletPageState extends State<TopUpWalletPage> {
  final _formKey = GlobalKey<FormState>();
  final WalletService walletService = WalletService();
  final TextEditingController _payAmountController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(80.0),
        child: AppBar(
          backgroundColor: Colors.white,
          elevation: 0, // Removes the back button
          title: Padding(
            padding: const EdgeInsets.only(top: 30),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  CupertinoIcons.creditcard_fill, // Replace with your desired icon
                  color: Styles.secondaryColor, // Blue icon color
                ),
                const SizedBox(
                    width: 8), // Add some spacing between icon and text
                Text(
                  "Top Up My Wallet",
                  style: TextStyle(
                      color: Styles.primaryColor), // Blue title color
                ),
              ],
            ),
          ),
        ),
      ),
      body: Form(
        key: _formKey, // Wrap the form widget with the Form widget
        child: SingleChildScrollView( // Wrap the content with SingleChildScrollView
          child: Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: TextFormField(
                  controller: _payAmountController,
                  decoration: InputDecoration(
                    labelText: 'Enter Payment Amount',
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Styles.primaryColor), // Change to your desired color
                    ),
                    suffixIcon:
                    Icon(Icons.monetization_on_outlined), // Add your desired icon here
                  ),
                  keyboardType: TextInputType.number,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Enter Amount.';
                    }

                    int? payment = int.tryParse(value);
                    if (payment == null || payment <= 0) {
                      return 'Please enter a valid amount.';
                    }

                    return null;
                  },
                ),
              ),
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    int? paymentAmount = int.tryParse(_payAmountController.text);

                    displayGateway(paymentAmount!);
                  }
                },
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all<Color>(Styles.primaryColor), // Background color
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                    RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20.0), // Rounded corners
                    ),
                  ),
                  foregroundColor: MaterialStateProperty.all<Color>(Colors.white), // Text color
                ),
                child: Text('Process Payment'),
              ),
              SizedBox(height: 16.0), // Add space below the button
              Image.asset('assets/images/undraw_Transfer_money_re_6o1h.png'),
              SizedBox(height: 16.0), // Add space below the image
            ],
          ),
        ),
      ),
    );
  }
  Future<void> topUpWallet(amount) async {
    if (!mounted) return; // Check if the widget is still mounted

    try {
      final response = await walletService.toUpWallet(amount);
      final responseData = json.decode(response.body);

      if (response.statusCode == 200) {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) =>  BottomBar(initialIndex: 2),

          ),
        );
        showCustomToast(context, "success", "You have successfully topup the wallet");

      }
      if (response.statusCode == 400) {
        showCustomToast(context, "error", "Something went wrong try again");

      }

    } catch (e) {
      print('Error occurred: $e'); // Print the exception details
      ErrorHandler.showErrorSnackBar(
          context, 'Unknown error occurred. Please try again later.$e');
    }
  }
  void displayGateway(int payAmount) {

    Map paymentObject = {
      "sandbox": true,             // true if using Sandbox Merchant ID
      "merchant_id":PayHereAccountCredentials().merchantId,
      "merchant_secret":PayHereAccountCredentials().merchantSecret,       // See step 4e
      "notify_url": "http://sample.com/notify",
      "order_id": "ItemNo12345",
      "items": "One Time Payment",
      "amount":payAmount,
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

    PayHere.startPayment(
        paymentObject,
            (paymentId) {
          print("One Time Payment Success. Payment Id: $paymentId");
          showCustomToast(context, "success", "Success");
        },
            (error) {
          print("One Time Payment Failed. Error: $error");
          showCustomToast(context, "error",error);
        },
            (){
topUpWallet(payAmount);


        }
    );
  }
}
