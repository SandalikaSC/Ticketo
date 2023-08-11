import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class StationService {
  Future<http.Response> getAllStations() async {
    try {
      var baseUrl = dotenv.env['BASE_URL'];
      final response = await http.get(Uri.parse('http://192.168.176.116:5000/api/allstations'),headers: {'Content-Type': 'application/json'},);
       return response;

    } catch (e) {
      // You can handle errors here if needed
      rethrow;
    }
  }

}
