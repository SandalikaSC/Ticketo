import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:logger/logger.dart';
import 'dart:convert';

import 'otp_entry.dart';

final Logger logger = Logger();

class ResetPasswordPage extends StatefulWidget {
  const ResetPasswordPage({Key? key}) : super(key: key);

  @override
  ResetPasswordPageState createState() => ResetPasswordPageState();
}

class ResetPasswordPageState extends State<ResetPasswordPage> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _mobileNumberController = TextEditingController();
  bool _showMobileInput = false;
  bool _showEmailInput = true;
  bool _showEmailTry = false;
  bool _isSendingOtp = false;

  Future<void> _sendOtp() async {
    final email = _emailController.text;
    final mobileNumber = _mobileNumberController.text;

    if (_isSendingOtp) {
      return;
    }

    setState(() {
      _isSendingOtp = true;
    });

    try {
      var baseUrl = dotenv.env['BASE_URL'];
      final response = await http.post(
        Uri.parse('$baseUrl/generate-otp'),
        headers: {"Content-Type": "application/json"},
        body: json.encode({
          "email": email,
          "mobileNumber": mobileNumber,
        }),
      );

      if (response.statusCode == 200) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => OtpEntryPage(
              email: email,
              mobileNumber: mobileNumber,
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
      logger.d(error);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Failed to send OTP")),
      );
    } finally {
      setState(() {
        _isSendingOtp = false;
      });
    }
  }

  void _showEmailForm() {
    setState(() {
      _showMobileInput = false;
      _showEmailInput = true;
      _showEmailTry = false;
      _emailController.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Reset Password'),
        backgroundColor: const Color(0xFF3D50AC),
      ),
      body: Stack(
        children: [
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (_showEmailInput)
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Enter the email associated with your account',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 20),
                      const Text(
                        'Email address',
                        style: TextStyle(
                          fontSize: 20,
                        ),
                      ),
                      const SizedBox(height: 10),
                      TextField(
                        controller: _emailController,
                        decoration: InputDecoration(
                          filled: true,
                          fillColor: Colors.grey[200],
                          border: OutlineInputBorder(
                            borderSide: BorderSide.none,
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
                      ),
                    ],
                  ),
                if (_showMobileInput)
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Enter the mobile number associated with your account',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 20),
                      const Text(
                        'Mobile number',
                        style: TextStyle(
                          fontSize: 20,
                        ),
                      ),
                      const SizedBox(height: 10),
                      TextField(
                        controller: _mobileNumberController,
                        decoration: InputDecoration(
                          filled: true,
                          fillColor: Colors.grey[200],
                          border: OutlineInputBorder(
                            borderSide: BorderSide.none,
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
                      ),
                    ],
                  ),
                if (_showEmailInput && !_showEmailTry)
                  GestureDetector(
                    onTap: () {
                      setState(() {
                        _showMobileInput = true;
                        _showEmailInput = false;
                        _showEmailTry = true;
                      });
                    },
                    child: const Text(
                      'Try in another way',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.blue,
                      ),
                    ),
                  ),
                if (_showEmailTry)
                  GestureDetector(
                    onTap: _showEmailForm,
                    child: const Text(
                      'Try with email',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.blue,
                      ),
                    ),
                  ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: _isSendingOtp ? null : _sendOtp,
                  style: ElevatedButton.styleFrom(
                    primary: const Color(0xFF3D50AC),
                    padding: const EdgeInsets.all(16.0),
                    minimumSize: const Size(100, 0),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  child: const Text(
                    'Send',
                    style: TextStyle(
                      fontSize: 20,
                    ),
                  ),
                ),
              ],
            ),
          ),
          if (_isSendingOtp)
            const Center(
              child: CircularProgressIndicator(),
            ),
        ],
      ),
    );
  }
}

void main() {
  runApp(const MaterialApp(
    home: ResetPasswordPage(),
  ));
}
