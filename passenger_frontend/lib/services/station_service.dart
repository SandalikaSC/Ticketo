import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:passenger_frontend/modals/station.dart';

class StationService {
  Future<http.Response> getAllStations() async {
    try {
      var baseUrl = dotenv.env['BASE_URL'];
      final response = await http.get(Uri.parse('${baseUrl}/allstations'),headers: {'Content-Type': 'application/json'},);
       return response;

    } catch (e) {
      // You can handle errors here if needed
      rethrow;
    }
  }
  Future<http.Response> addTicket(
      String startStation,
      String endStation,
      int tripType,
      String startDate,
      String returnDate,
      String passengers,
      String classname) async {
    try {
      var baseUrl = dotenv.env['BASE_URL'];
      final response = await http.post(
        Uri.parse('${baseUrl}/ticket/addticket'),
        // Replace with your Node.js server address
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'startStation': startStation,
          'endStation': endStation,
          'tripType': tripType,
          'startDate': startDate,
          'returnDate': returnDate,
          'passengers': passengers,
          "classname": classname
        }),
      );
      return response;
    } catch (e) {
      // You can handle errors here if needed
      rethrow;
    }
  }


}
