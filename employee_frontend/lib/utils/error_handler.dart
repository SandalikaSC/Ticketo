import 'package:flutter/material.dart';

class ErrorHandler {
  static void showErrorSnackBar(BuildContext context, String errorMessage) {
    // Show a SnackBar with the provided error message
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Center(
          child: Text(
            errorMessage,
            style: const TextStyle(fontSize: 18, color: Colors.white),
            textAlign: TextAlign.center,
          ),
        ),
        backgroundColor: const Color(0xFFFA6F5D),
      ),
    );
  }
}
