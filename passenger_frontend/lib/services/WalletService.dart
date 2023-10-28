import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class WalletService {
  Future<http.Response> getWalletInfo() async {
    try {
      var baseUrl = dotenv.env['BASE_URL'];
      final sharedPreferences = await SharedPreferences.getInstance();
      final accessToken = sharedPreferences.getString('accessToken') ?? '';
      final response = await http.get(
        Uri.parse('${baseUrl}/wallet/getwalletinfo'),
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
