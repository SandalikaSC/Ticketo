import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'landing_page.dart';
import 'reset_password.dart';
import 'package:logger/logger.dart';
import '../utils/error_handler.dart'; // Import the ErrorHandler
import '../utils/input_validations.dart'; // Import the Input Validations
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
//import '../services/auth_service.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import '../services/api_service.dart';
import 'guard_home.dart';

final Logger logger = Logger();

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  LoginPageState createState() => LoginPageState();
}

class LoginPageState extends State<LoginPage> {
  bool isLoading = false;
  bool isPasswordVisible = false;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _loginUser() async {
    setState(() {
      isLoading = true; // Set loading to true when login button is pressed
    });

    if (_formKey.currentState!.validate()) {
      String email = _emailController.text.trim();
      String password = _passwordController.text.trim();

      try {
        // Create an instance of ApiService with the base URL
        final apiService = ApiService();

// Call the loginUser method using the instance
        final response = await apiService.loginUser(email, password);

        if (response.statusCode == 200) {
          final responseData = json.decode(response.body);
          logger.d(responseData);
          if (responseData is List<dynamic>) {
            // Handle the case where responseData is an array
            logger.e('Received a JSON array response: $responseData');
            // Handle the unexpected response accordingly
          } else if (responseData is Map<String, dynamic>) {
            // Handle the case where responseData is a map
            if (kDebugMode) {
              print('responseData type: ${responseData.runtimeType}');
            }
            if (kDebugMode) {
              print('responseData content: $responseData');
            }
            final accessToken = responseData['accessToken'];

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
            logger.i('Login successful');
            if (userTypeList.contains("TICKET_CHECKER")) {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => const LandingPage()),
              );
            } else if (userTypeList.contains("DRIVER")) {
              if (kDebugMode) {
                print("Navigating to TrainGuardHomePage");
              }
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                    builder: (context) => const TrainGuardHomePage()),
              );
            } else {
              if (kDebugMode) {
                print("invalid user role");
              }
            }
          }
          // Login successful
          // Handle the response data as needed
          logger.i('Login successful');
          // logger.d(response.body);

          // Navigate to the home page after successful login
          // Navigator.pushReplacement(
          //   context,
          //   MaterialPageRoute(builder: (context) => const LandingPage()),
          // );
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
    setState(() {
      isLoading = false; // Reset loading to false after login attempt
    });
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
                      // onPressed: _loginUser,
                      onPressed: isLoading ? null : _loginUser,
                      style: ElevatedButton.styleFrom(
                        // primary: const Color(0xFF3D50AC),
                        primary: isLoading ? Colors.grey : const Color(0xFF3D50AC),
                        padding: const EdgeInsets.all(12.0),
                        minimumSize: const Size.fromHeight(60),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(35),
                        ),
                      ),
                      child: isLoading
                          ? const SizedBox(
                        width: 24,
                        height: 24,
                        child: CircularProgressIndicator(
                          valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                        ),
                      ): const Text(
                        'Login',
                        style: TextStyle(
                          fontFamily: 'Poppins',
                          fontSize: 24,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
