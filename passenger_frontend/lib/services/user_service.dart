import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class UserService {
  Future<http.Response> loginUser(String email, String password) async {
    try {
      var baseUrl = dotenv.env['BASE_URL'];
      final response = await http.post(
        Uri.parse('$baseUrl/api/login'),
        // Replace with your Node.js server address
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );
      return response;
    } catch (e) {
      // You can handle errors here if needed
      rethrow;
    }
  }

  Future<http.Response> signUp(
      String firstName,
      String lastName,
      String phoneNumber,
      String nic,
      String email,
      String password,
      String otp) async {
    try {
      var baseUrl = dotenv.env['BASE_URL'];
      final response = await http.post(
        Uri.parse('${baseUrl}/signup'),
        // Replace with your Node.js server address
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'firstName': firstName,
          'lastName': lastName,
          'phoneNumber': phoneNumber,
          'nic': nic,
          'email': email,
          'password': password,
          "otp": otp
        }),
      );
      return response;
    } catch (e) {
      // You can handle errors here if needed
      rethrow;
    }
  }

  Future<http.Response> accountVerify(String nic, String otp) async {
    try {
      var baseUrl = dotenv.env['BASE_URL'];
      final response = await http.post(
        Uri.parse('$baseUrl/api/login'),
        // Replace with your Node.js server address
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'nic': nic,
          'otp': otp,
        }),
      );
      return response;
    } catch (e) {
      // You can handle errors here if needed
      rethrow;
    }
  }

  Future<http.Response> verifyAccount(String firstName, String lastName,
      String phoneNumber, String nic, String email, String password) async {
    try {
      var baseUrl = dotenv.env['BASE_URL'];
      print(baseUrl);
      final response = await http.post(
        Uri.parse('${baseUrl}/verifyaccount'),
        // Replace with your Node.js server address
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'firstName': firstName,
          'lastName': lastName,
          'phoneNumber': phoneNumber,
          'nic': nic,
          'email': email,
          'password': password
        }),
      );
      return response;
    } catch (e) {
      // You can handle errors here if needed
      rethrow;
    }
  }
}
