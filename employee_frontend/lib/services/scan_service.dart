import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'dart:convert'; // Import this to use JSON encoding/decoding

class ApiService {
  static const String baseUrl = 'http://192.168.8.158:5000/api'; // Replace with your backend API URL

  static Future<void> sendScannedData(String id,String data ) async {
    if (kDebugMode) {
      print('INSIDE SERVICE SCAN');
    }
    final Uri uri = Uri.parse('$baseUrl/scan-data'); // Replace with your API endpoint

    final response = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'id': id,'resultData': data}), // Convert the body data to JSON-encoded string
    );

    if (response.statusCode == 200) {
      if (kDebugMode) {
        print('Data sent successfully');
      }
    } else {
      if (kDebugMode) {
        print('Failed to send data: ${response.statusCode}');
      }
    }
  }
}
