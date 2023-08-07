import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert'; // Import jsonEncode
import 'login.dart';

class PasswordResetPage extends StatefulWidget {
  final String email;
  final String mobileNumber;

  const PasswordResetPage({required this.email, required this.mobileNumber, Key? key})
      : super(key: key);

  @override
  _PasswordResetPageState createState() => _PasswordResetPageState();
}

class _PasswordResetPageState extends State<PasswordResetPage> {
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();
  bool _passwordsMatch = true;
  bool _showPassword = false;

  @override
  void dispose() {
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  void _resetPassword() async {
    String newPassword = _passwordController.text;
    String confirmPassword = _confirmPasswordController.text;

    if (newPassword == confirmPassword) {
      bool passwordUpdatedSuccessfully = await sendPasswordToBackend(newPassword, confirmPassword);

      if (passwordUpdatedSuccessfully) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const LoginPage()), // Navigate to LoginPage
        );
      } else {
        // Handle the error or show an error message to the user
        showDialog(
          context: context,
          builder: (context) {
            return AlertDialog(
              title: const Text('Error'),
              content: const Text('Failed to update password. Please try again later.'),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: const Text('OK'),
                ),
              ],
            );
          },
        );
      }
    } else {
      setState(() {
        _passwordsMatch = false;
      });
    }
  }

  Future<bool> sendPasswordToBackend(String newPassword, String confirmPassword) async {
    final response = await http.post(
      Uri.parse('http://192.168.8.158:5000/api/reset-password'),
      headers: {'Content-Type': 'application/json'}, // Set the content type to JSON
      body: jsonEncode({
        'email': widget.email,
        'mobileNumber': widget.mobileNumber,
        'password': newPassword,
        'confirmPassword': confirmPassword,
      }),
    );

    if (response.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Password Reset'),
        backgroundColor: const Color(0xFF3D50AC),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const SizedBox(height: 20),
            Text(
              'Reset your password for\n${widget.email}\nor ${widget.mobileNumber}',
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 18),
            ),
            const SizedBox(height: 20),
            TextField(
              controller: _passwordController,
              obscureText: !_showPassword,
              decoration: InputDecoration(
                labelText: 'New Password',
                suffixIcon: GestureDetector(
                  onTap: () {
                    setState(() {
                      _showPassword = !_showPassword;
                    });
                  },
                  child: Icon(
                    _showPassword ? Icons.visibility : Icons.visibility_off,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: _confirmPasswordController,
              obscureText: !_showPassword,
              onChanged: (_) {
                setState(() {
                  _passwordsMatch = _passwordController.text == _confirmPasswordController.text;
                });
              },
              decoration: InputDecoration(
                labelText: 'Confirm Password',
                errorText: _passwordsMatch ? null : 'Passwords do not match',
                suffixIcon: GestureDetector(
                  onTap: () {
                    setState(() {
                      _showPassword = !_showPassword;
                    });
                  },
                  child: Icon(
                    _showPassword ? Icons.visibility : Icons.visibility_off,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _resetPassword,
              style: ElevatedButton.styleFrom(
                primary: const Color(0xFF3D50AC),
                padding: const EdgeInsets.all(16.0),
                minimumSize: const Size(100, 0),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              child: const Text(
                'Reset Password',
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
    home: PasswordResetPage(email: '', mobileNumber: ''),
  ));
}
