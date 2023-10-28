import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:passenger_frontend/constants/app_styles.dart';

class TopUpWalletPage extends StatefulWidget {
  const TopUpWalletPage({Key? key}) : super(key: key);

  @override
  _TopUpWalletPageState createState() => _TopUpWalletPageState();
}

class _TopUpWalletPageState extends State<TopUpWalletPage> {
  final _formKey = GlobalKey<FormState>();
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
                    // Form is valid, you can process the payment here.
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
}
