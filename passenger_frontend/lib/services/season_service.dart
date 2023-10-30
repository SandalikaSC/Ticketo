import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class SeasonService {
  Future<http.Response> sendSeasonRequest(
      duration,
      startStation,
      endStation,
      designation,
      workplace,
      workplaceAddress,
      seasonType,
      seasonClass,
      applicationForm) async {
    try {
      var baseUrl = dotenv.env['BASE_URL'];
      final sharedPreferences = await SharedPreferences.getInstance();
      final accessToken = sharedPreferences.getString('accessToken') ?? '';
      final response = await http.post(
        Uri.parse('${baseUrl}/season/requestseason'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        },
        body: jsonEncode({
          "duration": duration,
          "startStation": startStation,
          "endStation": endStation,
          "designation": designation,
          "workplace": workplace,
          "workplaceAddress": workplaceAddress,
          "seasonType": seasonType,
          "seasonClass": seasonClass,
          "applicationForm": "applicationForm"
        }),
      );
      return response;
    } catch (e) {
      // You can handle errors here if needed
      rethrow;
    }
  }

  Future<http.Response> getSeasonInfo() async {
    try {
      var baseUrl = dotenv.env['BASE_URL'];
      final sharedPreferences = await SharedPreferences.getInstance();
      final accessToken = sharedPreferences.getString('accessToken') ?? '';
      final response = await http.get(
        Uri.parse('${baseUrl}/season/getseasoninfo'),
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
}
