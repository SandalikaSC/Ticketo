import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class TicketService {
  Future<http.Response> getAllTickets() async {
    try {
      var baseUrl = dotenv.env['BASE_URL'];
      final sharedPreferences = await SharedPreferences.getInstance();
      final accessToken = sharedPreferences.getString('accessToken') ?? '';
      final response = await http.get(
        Uri.parse('${baseUrl}/ticket/gettickets'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
      );
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
      final sharedPreferences = await SharedPreferences.getInstance();
      final accessToken = sharedPreferences.getString('accessToken') ?? '';
      final response = await http.post(
        Uri.parse('${baseUrl}/ticket/addticket'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode({
          'startStation': int.parse(startStation),
          'endStation': int.parse(endStation),
          'tripType': tripType,
          'startDate': startDate,
          'returnDate': returnDate,
          'passengers': int.parse(passengers),
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
