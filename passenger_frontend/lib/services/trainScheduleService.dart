import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:passenger_frontend/modals/ReservationTicket.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class TrainScheduleService {
  Future<http.Response> getSchedules(ReservationTicket reservationTicket) async {
    try {
      var baseUrl = dotenv.env['BASE_URL'];
      var uri = Uri.parse('${baseUrl}/getallschedules').replace(
        queryParameters: {
          'startStation': reservationTicket.startStation!.stationId,
          'endStation': reservationTicket.endStation!.stationId,
          'departureDate': reservationTicket.depatureDate,
          'returnDate': reservationTicket.returnDate,
        },
      );

      final response = await http.get(
        uri,
        headers: {
          'Content-Type': 'application/json',
        },
      );

      return response;
    } catch (e) {
      // You can handle errors here if needed
      rethrow;
    }
  }

}
