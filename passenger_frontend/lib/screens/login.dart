import 'dart:io';
import 'package:flutter/material.dart';
import 'package:passenger_frontend/screens/bottom_bar.dart';
import 'package:passenger_frontend/services/user_service.dart';
import 'reset_password.dart'; // Import the ResetPasswordPage
import 'signup.dart';
import 'package:logger/logger.dart';
import '../utils/error_handler.dart'; // Import the ErrorHandler
import '../utils/input_validations.dart'; // Import the Input Validations
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

final Logger logger = Logger();

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  LoginPageState createState() => LoginPageState();
}

class LoginPageState extends State<LoginPage> {
  bool isPasswordVisible = false;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final UserService userService =
      UserService(); // Replace with your Node.js server address

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _loginUser() async {
    if (_formKey.currentState!.validate()) {
      String email = _emailController.text.trim();
      String password = _passwordController.text.trim();

      try {
        final response = await userService.loginUser(email, password);

        if (response.statusCode == 200) {
          final responseData = json.decode(response.body);
          logger.d(responseData);
          if (responseData is List<dynamic>) {
            // Handle the case where responseData is an array
            logger.e('Received a JSON array response: $responseData');
            // Handle the unexpected response accordingly
          } else if (responseData is Map<String, dynamic>) {
            // Handle the case where responseData is a map
            print('responseData type: ${responseData.runtimeType}');
            print('responseData content: $responseData');

            final accessToken = responseData['accessToken'];
            // final refreshToken = responseData['refreshToken'];
            // final userType = List<String>.from(responseData['userType']);
            Map<String, dynamic> decodedToken = JwtDecoder.decode(accessToken);

            SharedPreferences prefs = await SharedPreferences.getInstance();

            await prefs.setString('id', decodedToken['id']);
            await prefs.setString(
                'nic', decodedToken['nic'] ?? ''); // Use empty string if null
            await prefs.setString('email', decodedToken['email']);
            await prefs.setString('dob',
                decodedToken['dob'].toString()); // Convert DateTime to String
            await prefs.setString('firstName', decodedToken['firstName']);
            await prefs.setString('lastName', decodedToken['lastName']);
            await prefs.setString('mobileNumber', decodedToken['mobileNumber']);
            await prefs.setString('accessToken', accessToken);

            // Convert userType List to String and store it in shared preferences
            List<String> userTypeList =
                List<String>.from(decodedToken['userType']);
            await prefs.setStringList('user_type', userTypeList);
          }
          // Login successful
          // Handle the response data as needed
          logger.i('Login successful');
          // logger.d(response.body);

          // Navigate to the home page after successful login
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => const BottomBar()),
          );
        } else {
          // Login failed
          // Handle the error response as needed
          logger.e('Login failed. Status Code: ${response.statusCode}');
          logger.d(response.body);

          // Show a login error message using the ErrorHandler
          // ErrorHandler.showLoginErrorSnackBar(context);
          ErrorHandler.showErrorSnackBar(
              context, 'Login failed. Please check your email and password.');
        }
      } catch (e, stackTrace) {
        // Handle any network or server-related errors
        logger.e('Error: $e', e, stackTrace);
        if (e is HttpException) {
          logger.w('Network Error occurred.');

          // Show a network error message using the ErrorHandler
          // ErrorHandler.showNetworkErrorSnackBar(context);
          ErrorHandler.showErrorSnackBar(
              context, 'Network error occurred. Please try again later.');
        } else {
          logger.w('Unknown Error occurred.');

          // Show an unknown error message using the ErrorHandler
          // ErrorHandler.showUnknownErrorSnackBar(context);
          ErrorHandler.showErrorSnackBar(
              context, 'Unknown error occurred. Please try again later.');
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.all(5.0),
                  child: SizedBox(
                    width: 400,
                    height: 400,
                    child: Image.asset(
                      'assets/logo.png', // Replace with the path to your logo image file
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: TextFormField(
                    controller: _emailController,
                    keyboardType: TextInputType.emailAddress,
                    decoration: InputDecoration(
                      prefixIcon: const Icon(
                        Icons.email,
                        color: Colors.grey,
                      ),
                      hintText: 'Email',
                      filled: true,
                      fillColor: Colors.grey[200],
                      border: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.circular(25),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter your email';
                      }
                      if (!InputValidations.isValidEmail(value)) {
                        return 'Please enter a valid email address';
                      }
                      return null;
                    },
                  ),
                ),
                const SizedBox(height: 10),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: TextFormField(
                    controller: _passwordController,
                    obscureText: !isPasswordVisible,
                    decoration: InputDecoration(
                      prefixIcon: const Icon(
                        Icons.lock,
                        color: Colors.grey,
                      ),
                      suffixIcon: IconButton(
                        icon: Icon(
                          isPasswordVisible
                              ? Icons.visibility
                              : Icons.visibility_off,
                          color: Colors.grey,
                        ),
                        onPressed: () {
                          setState(() {
                            isPasswordVisible = !isPasswordVisible;
                          });
                        },
                      ),
                      hintText: 'Password',
                      filled: true,
                      fillColor: Colors.grey[200],
                      border: OutlineInputBorder(
                        borderSide: BorderSide.none,
                        borderRadius: BorderRadius.circular(25),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter your password';
                      }
                      if (!InputValidations.isValidPassword(value)) {
                        return 'Password must be at least 6 characters long';
                      }
                      return null;
                    },
                  ),
                ),
                const SizedBox(height: 25),
                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const ResetPasswordPage()),
                    );
                  },
                  child: const Text(
                    'Forgot Password?',
                    style: TextStyle(
                      fontFamily: 'Poppins',
                      fontSize: 20,
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 80),
                  child: SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: _loginUser,
                      style: ElevatedButton.styleFrom(
                        primary: const Color(0xFF3D50AC),
                        padding: const EdgeInsets.all(12.0),
                        minimumSize: const Size.fromHeight(60),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(35),
                        ),
                      ),
                      child: const Text(
                        'Login',
                        style: TextStyle(
                          fontFamily: 'Poppins',
                          fontSize: 24,
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      'Don\'t have an account? ',
                      style: TextStyle(
                        fontFamily: 'Poppins',
                        fontSize: 22,
                      ),
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const SignupPage()),
                        );
                      },
                      child: const Text(
                        'Signup',
                        style: TextStyle(
                          fontFamily: 'Poppins',
                          fontSize: 20,
                          decoration: TextDecoration.underline,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
