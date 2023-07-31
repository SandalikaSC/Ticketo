import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  final String baseUrl;

  ApiService(this.baseUrl);

  Future<http.Response> loginUser(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/api/login'), // Replace with your Node.js server address
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

// Add other API methods as needed (e.g., signup, reset password, etc.)
}
