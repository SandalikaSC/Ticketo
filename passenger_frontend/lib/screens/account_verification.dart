import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:gap/gap.dart';
import 'package:passenger_frontend/screens/login.dart';
import 'package:passenger_frontend/services/user_service.dart';
import 'package:passenger_frontend/utils/error_handler.dart';
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
  Timer? _timer;
  final UserService userService = UserService();

  @override
  void initState() {
    super.initState();
    startTimer();
  }

  void startTimer() {
    const oneSec = const Duration(seconds: 1);
    _timer = Timer.periodic(oneSec, (Timer timer) {
      if (_minutes == 0 && _seconds == 0) {
        timer.cancel();
      } else {
        setState(() {
          //FlutterError (setState() called after dispose(): _OTPVerificationScreenState#4c6b6(lifecycle state: defunct, not mounted)
// This error happens if you call setState() on a State object for a widget that no longer appears in the widget tree (e.g., whose parent widget no longer includes the widget in its build). This error can occur when code calls setState() from a timer or an animation callback.
// The preferred solution is to cancel the timer or stop listening to the animation in the dispose() callback. Another solution is to check the "mounted" property of this object before calling setState() to ensure the object is still in the tree.
// This error might indicate a memory leak if setState() is being called because another object is retaining a reference to this State object after it has been removed from the tree. To avoid memory leaks, consider breaking the reference to this object during dispose().
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

  void _verifyOTP() async {
    setState(() {
      _remainingAttempts--;
    });

    // if (_remainingAttempts < 1) {
    //   showCustomToast(context, "error", "SignUp Fail try again later");
    //   Navigator.push(
    //     context,
    //     MaterialPageRoute(
    //       builder: (context) => LoginPage(),
    //     ),
    //   );
    // } else {
    String enteredOTP = _getEnteredOTP();
    try {
      final response = await userService.signUp(
          widget.firstName,
          widget.lastName,
          widget.phoneNumber,
          widget.nic,
          widget.emailAddress,
          widget.password,
          enteredOTP);
      final responseData = json.decode(response.body);
      final message = responseData['message'];

      if (response.statusCode == 200) {
        showCustomToast(context, "success", "SignUp succcessfully.");
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => LoginPage(),
          ),
        );
      } else if (response.statusCode == 400) {
        if (_remainingAttempts < 1) {
          showCustomToast(context, "error", "SignUp failed");
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => LoginPage(),
            ),
          );
        } else {
          showCustomToast(context, "error", message + " Try again");
        }
      }
    } catch (e) {
      ErrorHandler.showErrorSnackBar(
          context, 'Unknown error occurred. Please try again later.');
    }
  }

  String _getEnteredOTP() {
    String otp = '';
    for (int i = 0; i < 4; i++) {
      otp += _otpControllers[i].text;
    }
    return otp;
  }

  List<TextEditingController> _otpControllers =
      List.generate(4, (_) => TextEditingController());

  @override
  void dispose() {
    _timer?.cancel(); // Cancel the timer when the widget is disposed
    for (var controller in _otpControllers) {
      controller.dispose();
    }
    super.dispose();
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
                FontAwesomeIcons.message,
                size: 100,
                color: Colors.blue,
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
                children: List.generate(4,
                    (index) => OTPDigitBox(controller: _otpControllers[index])),
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
  final TextEditingController controller;

  OTPDigitBox({required this.controller});

  @override
  _OTPDigitBoxState createState() => _OTPDigitBoxState();
}

class _OTPDigitBoxState extends State<OTPDigitBox> {
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
        controller: widget.controller,
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
