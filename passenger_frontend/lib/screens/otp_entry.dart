import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:passenger_frontend/screens/password_reset.dart';
import 'reset_password.dart';

class OtpEntryPage extends StatefulWidget {
  final String email;
  final String mobileNumber;

  const OtpEntryPage({
    required this.email,
    required this.mobileNumber,
    Key? key,
  }) : super(key: key);

  @override
  _OtpEntryPageState createState() => _OtpEntryPageState();
}

class _OtpEntryPageState extends State<OtpEntryPage> {
  int _remainingSeconds = 120; // Change to 2 minutes
  bool _isTimerExpired = false;
  bool _isVerifyingOtp = false; // Added
  bool _isRegeneratingOtp = false; // Added

  final List<TextEditingController> _otpControllers = List.generate(
    4,
        (index) => TextEditingController(),
  );

  @override
  void initState() {
    super.initState();
    startCountdown();
  }

  void startCountdown() {
    Future.delayed(const Duration(seconds: 1), () {
      if (_remainingSeconds > 0) {
        setState(() {
          _remainingSeconds--;
        });
        if (_remainingSeconds <= 15) {
          _isTimerExpired = true;
        }
        startCountdown();
      } else {
        _isTimerExpired = true;
      }
    });
  }

  @override
  void dispose() {
    for (final controller in _otpControllers) {
      controller.dispose();
    }
    super.dispose();
  }

  Future<void> _verifyOtp() async {
    setState(() {
      _isVerifyingOtp = true;
    });

    final enteredOtp = _otpControllers.map((controller) => controller.text).join();

    try {
      final response = await http.post(
        Uri.parse("http://192.168.8.158:5000/api/verify-otp"),
        headers: {"Content-Type": "application/json"},
        body: json.encode({
          "email": widget.email,
          "mobileNumber": widget.mobileNumber,
          "otp": enteredOtp,
        }),
      );

      if (response.statusCode == 200) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => PasswordResetPage(
              email: widget.email,
              mobileNumber: widget.mobileNumber,
            ),
          ),
        );
      } else {
        final responseData = json.decode(response.body);
        final errorMessage = responseData["message"];
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(errorMessage)),
        );
      }
    } catch (error) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Failed to verify OTP")),
      );
    } finally {
      setState(() {
        _isVerifyingOtp = false;
      });
    }
  }

  Future<void> _regenerateOtp() async {
    setState(() {
      _isRegeneratingOtp = true;
    });

    try {
      final response = await http.post(
        Uri.parse("http://192.168.8.158:5000/api/generate-otp"), // Replace with your backend URL
        headers: {"Content-Type": "application/json"},
        body: json.encode({
          "email": widget.email,
          "mobileNumber": widget.mobileNumber,
        }),
      );

      if (response.statusCode == 200) {
        // Successfully regenerated OTP, reset timer and re-enable the "Verify OTP" button
        setState(() {
          _remainingSeconds = 120;
          _isTimerExpired = false;
        });

        // Navigate to ResetPasswordPage
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => const ResetPasswordPage(),
          ),
        );
      } else {
        final responseData = json.decode(response.body);
        final errorMessage = responseData["message"];
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(errorMessage)),
        );
      }
    } catch (error) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Failed to regenerate OTP")),
      );
    } finally {
      setState(() {
        _isRegeneratingOtp = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Enter OTP'),
        backgroundColor: const Color(0xFF3D50AC),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Time Remaining: $_remainingSeconds seconds',
              style: TextStyle(
                fontSize: 16,
                color: _isTimerExpired ? Colors.red : Colors.black,
              ),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(
                4,
                    (index) => SizedBox(
                  width: 60,
                  child: Column(
                    children: [
                      TextField(
                        controller: _otpControllers[index],
                        keyboardType: TextInputType.number,
                        maxLength: 1,
                        textAlign: TextAlign.center,
                        style: const TextStyle(fontSize: 20),
                        decoration: const InputDecoration(
                          counterText: '',
                          border: OutlineInputBorder(),
                        ),
                      ),
                      const SizedBox(height: 10),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: _isVerifyingOtp || _remainingSeconds <= 0 ? null : _verifyOtp,
              style: ElevatedButton.styleFrom(
                primary: const Color(0xFF3D50AC),
                padding: const EdgeInsets.all(16.0),
                minimumSize: const Size(100, 0),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              child: _isVerifyingOtp
                  ? const CircularProgressIndicator() // Show CircularProgressIndicator while verifying OTP
                  : const Text(
                'Verify OTP',
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
            ),
            if (_remainingSeconds <= 0) // Display "Time has ended" message when time expires
              const Padding(
                padding: EdgeInsets.symmetric(vertical: 8.0),
                child: Text(
                  'Time has ended',
                  style: TextStyle(
                    color: Colors.red,
                    fontSize: 16,
                  ),
                ),
              ),
            if (_remainingSeconds <= 0) // Display "Regenerate OTP" button when time exceeds 2 minutes
              ElevatedButton(
                onPressed: _isRegeneratingOtp ? null : _regenerateOtp,
                style: ElevatedButton.styleFrom(
                  primary: const Color(0xFF3D50AC),
                  padding: const EdgeInsets.all(16.0),
                  minimumSize: const Size(100, 0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                child: _isRegeneratingOtp
                    ? const CircularProgressIndicator() // Show CircularProgressIndicator while regenerating OTP
                    : const Text(
                  'Regenerate OTP',
                  style: TextStyle(
                    fontSize: 20,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

void main() {
  runApp(const MaterialApp(
    home: OtpEntryPage(email: 'example@example.com', mobileNumber: '1234567890'),
  ));
}
