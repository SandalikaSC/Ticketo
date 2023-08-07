import 'dart:async';

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:gap/gap.dart';
import 'package:passenger_frontend/screens/login.dart';
import 'package:passenger_frontend/widgets/customSnackBar.dart';

class OTPVerificationScreen extends StatefulWidget {
  final String firstName;
  final String lastName;
  final String phoneNumber;
  final String emailAddress;
  final String nic;
  final String password;

  OTPVerificationScreen(
      {required this.firstName,
      required this.lastName,
      required this.phoneNumber,
      required this.nic,
      required this.password,
      required this.emailAddress});

  @override
  _OTPVerificationScreenState createState() => _OTPVerificationScreenState();
}

class _OTPVerificationScreenState extends State<OTPVerificationScreen> {
  int _remainingAttempts = 3;
  int _minutes = 3;
  int _seconds = 0;

  @override
  void initState() {
    super.initState();
    startTimer();
  }

  void startTimer() {
    const oneSec = const Duration(seconds: 1);
    Timer.periodic(oneSec, (Timer timer) {
      if (_minutes == 0 && _seconds == 0) {
        timer.cancel();
      } else {
        setState(() {
          if (_seconds == 0) {
            _minutes--;
            _seconds = 59;
          } else {
            _seconds--;
          }
        });
      }
    });
  }

  void _verifyOTP() {
    setState(() {
      _remainingAttempts--;
    });

    if (_remainingAttempts < 1) {
      showCustomToast(context, "error", "SignUp Fail try again later");
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => LoginPage(),
        ),
      );
    } else {}
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Icon(
                FontAwesomeIcons
                    .message, // Replace with the desired FontAwesomeIcons icon
                size: 100, // Set the size of the icon
                color: Colors.blue, // Set the color of the icon
              ),
              SizedBox(height: 20),
              Text(
                "Let's verify your identity",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 20),
              Text(
                "We sent you the OTP to ${widget.emailAddress}",
                style: TextStyle(fontSize: 18),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 40),
              Text(
                "Enter OTP code below to verify",
                style: TextStyle(fontSize: 18),
              ),
              SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  OTPDigitBox(),
                  OTPDigitBox(),
                  OTPDigitBox(),
                  OTPDigitBox(),
                ],
              ),
              SizedBox(height: 20),
              Text(
                "Time Remaining: $_minutes:${_seconds.toString().padLeft(2, '0')}",
                style: TextStyle(fontSize: 18),
              ),
              SizedBox(height: 20),
              _remainingAttempts >= 1
                  ? ElevatedButton(
                      onPressed: _verifyOTP,
                      child: Text("Verify"),
                    )
                  : SizedBox(),
            ],
          ),
        ),
      ),
    );
  }
}

class OTPDigitBox extends StatefulWidget {
  @override
  _OTPDigitBoxState createState() => _OTPDigitBoxState();
}

class _OTPDigitBoxState extends State<OTPDigitBox> {
  TextEditingController _controller = TextEditingController();
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 50,
      height: 50,
      margin: EdgeInsets.all(5),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.blue),
        borderRadius: BorderRadius.circular(8),
      ),
      child: TextField(
        controller: _controller,
        keyboardType: TextInputType.number,
        maxLength: 1,
        textAlign: TextAlign.center,
        style: TextStyle(fontSize: 20),
        onChanged: (value) {
          if (value.isNotEmpty) {
            FocusScope.of(context).nextFocus();
          }
        },
        decoration: InputDecoration(
          counterText: '',
          border: InputBorder.none,
          contentPadding: EdgeInsets.zero,
        ),
      ),
    );
  }
}
