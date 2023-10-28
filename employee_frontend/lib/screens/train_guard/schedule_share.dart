import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:async';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class StationData {
  final int stationId;
  final String stationName;
  final String arrivalTime;
  final String actualArrivalTime;
  final int delayArrival;
  final String departureTime;
  final String actualDepartureTime;
  final int delayDeparture;
  int arrivalStatus;
  String date;
  String reason;

  StationData({
    required this.stationId,
    required this.stationName,
    required this.arrivalTime,
    required this.actualArrivalTime,
    required this.delayArrival,
    required this.departureTime,
    required this.actualDepartureTime,
    required this.delayDeparture,
    required this.arrivalStatus,
    required this.date,
    required this.reason,
  });

  @override
  String toString() {
    return 'StationData(stationId: $stationId, stationName: $stationName, '
        'arrivalTime: $arrivalTime, actualArrivalTime: $actualArrivalTime, '
        'delayArrival: $delayArrival, departureTime: $departureTime, '
        'actualDepartureTime: $actualDepartureTime, delayDeparture: $delayDeparture, '
        'arrivalStatus: $arrivalStatus, date: $date, reason: $reason)';
  }
}

class ScheduleSharePage extends StatefulWidget {
  final String trainName;
  final int scheduleId;

  const ScheduleSharePage({Key? key, required this.trainName, required this.scheduleId})
      : super(key: key);

  @override
  _ScheduleSharePageState createState() => _ScheduleSharePageState();
}

class _ScheduleSharePageState extends State<ScheduleSharePage> {
  bool isArrival = true;
  final StreamController<DateTime> _timeStream = StreamController<DateTime>();
  late Stream<DateTime> _time;

  List<StationData> stationDataList = [];

  _ScheduleSharePageState() {
    _time = _timeStream.stream;

    // Update the time every second
    Timer.periodic(const Duration(seconds: 1), (timer) {
      _timeStream.sink.add(DateTime.now());
    });
  }



  @override
  void initState(){
    super.initState();
    fetchScheduleStations(widget.scheduleId);
  }

  void fetchScheduleStations(int scheduleId) async {
    final baseUrl = dotenv.env['BASE_URL'];
    final Uri uri = Uri.parse('$baseUrl/trainguard/get-all-stations');
    final sharedPreferences = await SharedPreferences.getInstance();
    final accessToken = sharedPreferences.getString('accessToken') ?? '';

    if (kDebugMode) {
      print("here is the schedule id $scheduleId");
    }
    final response = await http.post(
      uri,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $accessToken',
      },
      body: json.encode({
        'scheduleId': scheduleId,
      }),
    );

    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData = json.decode(response.body);

      if (responseData.containsKey('stations')) {
        final List<dynamic> stations = responseData['stations'];

        // Transform and store the response data in the stationDataList
        stationDataList = stations.map((station) {
          return StationData(
            stationId: station['id'],
            stationName: station['stationName']['name'],
            arrivalTime: station['arrivalTime'],
            actualArrivalTime: '06:05 AM', // Default value
            delayArrival: 0, // Default value
            departureTime: station['departureTime'],
            actualDepartureTime: '06:05 AM', // Default value
            delayDeparture: 0, // Default value
            arrivalStatus: 0, // Default value
            date: DateTime.now().toLocal().toString(), // Current date
            reason: 'null', // Default value
          );
        }).toList();

        if (kDebugMode) {
          print(stationDataList);
        }
      } else {
        if (kDebugMode) {
          print('Response does not contain a "stations" key.');
        }
      }
    } else {
      if (kDebugMode) {
        print('Failed to fetch schedule stations. Status code: ${response.statusCode}');
      }
    }
  }

  @override
  void dispose() {
    _timeStream.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Schedule Share'),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Train Name: ${widget.trainName}',
                    style: const TextStyle(fontSize: 20),
                  ),
                  Text(
                    'Schedule ID: ${widget.scheduleId}',
                    style: const TextStyle(fontSize: 20),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            _buildInfoBox(),
            const SizedBox(height: 16),
            const ScheduleTable(),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoBox() {
    return Container(
      padding:  const EdgeInsets.all(16),
      margin:  const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: Colors.lightBlue,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Next Station: Colombo'),
                Text(isArrival ? 'Arrival Time: 3:45 a.m' : 'Departure Time: 3:54 a.m'),

              ],
          ),

              const SizedBox(height: 16),
           Row(
            children: [
              StreamBuilder<DateTime>(
                stream: _time,
                builder: (context, snapshot) {
                  final currentTime = snapshot.data;
                  final formattedTime = currentTime != null
                      ? '${currentTime.hour}:${currentTime.minute}:${currentTime.second}'
                      : '00:00:00';

                  return Text('Current Time: $formattedTime');
                },
              ),
            ],
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              // Toggle between Arrival and Departure
              setState(() {
                isArrival = !isArrival;
              });
            },
            child: Text(isArrival ? 'Arrive' : 'Departure'),
          ),
        ],
      ),
    );
  }
}

class ScheduleTable extends StatefulWidget {
  const ScheduleTable({Key? key}) : super(key: key);

  @override
  _ScheduleTableState createState() => _ScheduleTableState();
}

class _ScheduleTableState extends State<ScheduleTable> {
  bool showTable = true; // Automatically show the table when loaded

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: DataTable(
        columnSpacing: 20,
        columns: const [
          DataColumn(label: Text('Station')),
          DataColumn(label: Text('Arrival Time')),
          DataColumn(label: Text('Departure Time')),
          DataColumn(label: Text('Delay')),
          DataColumn(label: Text('Reason')),
        ],
        rows: const [
          DataRow(cells: [
            DataCell(Text('Station 1')),
            DataCell(Text('10:00 AM')),
            DataCell(Text('10:15 AM')),
            DataCell(Text('5 min')),
            DataCell(Text('Late arrival')),
          ]),
          DataRow(cells: [
            DataCell(Text('Station 2')),
            DataCell(Text('10:30 AM')),
            DataCell(Text('10:45 AM')),
            DataCell(Text('10 min')),
            DataCell(Text('Signal issue')),
          ]),
          // Add more rows with your schedule data here
        ],
      ),
    );
  }
}

void main() {
  runApp(
    const MaterialApp(
      home: ScheduleSharePage(
        trainName: 'Sample Train',
        scheduleId: 123,
      ),
    ),
  );
}
