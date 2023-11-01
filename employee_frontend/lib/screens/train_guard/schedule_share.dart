import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:async';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:intl/intl.dart';

class StationData {
  final int stationId;
  final String stationName;
  final String arrivalTime;
  String actualArrivalTime;
  int delayArrival;
  final String departureTime;
  String actualDepartureTime;
  int delayDeparture;
  int arrivalStatus;
  String date;
  String reason;

  StationData({
    required this.stationId,
    this.stationName="Maradana",
    this.arrivalTime ="06.05 a.m",
    required this.actualArrivalTime,
    required this.delayArrival,
    required this.departureTime,
    required this.actualDepartureTime,
    required this.delayDeparture,
    required this.arrivalStatus,
    required this.date,
    this.reason ='No reason',
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
  bool showReasonTextField = false;
  TextEditingController reasonController = TextEditingController();

  List<StationData> stationDataList = [];
  int nextStationIndex = 0;
  int id=0;
  _ScheduleSharePageState() {
    _time = _timeStream.stream;

    // Update the time every second
    Timer.periodic(const Duration(seconds: 1), (timer) {
      _timeStream.sink.add(DateTime.now());
    });
  }



  @override
  void initState() {
    super.initState();
    fetchScheduleStations(widget.scheduleId);
    findInitialNextStationIndex(); // Find the initial next station index
  }

  void findInitialNextStationIndex() {
    for (int i = 0; i < stationDataList.length; i++) {
      if (stationDataList[i].arrivalStatus == 0) {
        nextStationIndex = i;
        break;
      }
    }
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

    final Uri uri2 = Uri.parse('$baseUrl/trainguard/get-locations');
    final response2 = await http.post(
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

  void calculateDelayAndUpdateTime(StationData station) {
    final DateTime currentTime = DateTime.now();
    final DateFormat format = DateFormat('hh:mm a');
    final String formattedCurrentTime = format.format(currentTime);

    if (isArrival) {
      final DateTime arrivalTime = format.parse(station.arrivalTime);
      final String formattedArrivalTime = format.format(arrivalTime);
      final Duration delay = currentTime.isAfter(arrivalTime) ? currentTime.difference(arrivalTime) : const Duration();

      station.actualArrivalTime = formattedCurrentTime;
      station.delayArrival = delay.inMinutes;
    } else {
      final DateTime departureTime = format.parse(station.departureTime);
      final String formattedDepartureTime = format.format(departureTime);
      final Duration delay = currentTime.isAfter(departureTime) ? currentTime.difference(departureTime) : const Duration();

      station.actualDepartureTime = formattedCurrentTime;
      station.delayDeparture = delay.inMinutes;
    }
  }


  Future<void> handleArriveButtonClick() async {
    //int id = 0;
    if (nextStationIndex < stationDataList.length) {
      StationData currentStation = stationDataList[nextStationIndex];
      if (currentStation.arrivalStatus == 0) {
        currentStation.arrivalStatus = 1;
        calculateDelayAndUpdateTime(currentStation);

        final baseUrl = dotenv.env['BASE_URL'];
        final Uri uri = Uri.parse('$baseUrl/location-update/l-insert');
        final sharedPreferences = await SharedPreferences.getInstance();
        final accessToken = sharedPreferences.getString('accessToken') ?? '';

        final response = await http.post(
          uri,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer $accessToken',
          },
          body: json.encode({
            'arrivalTime':currentStation.arrivalTime,
            'departureTime':currentStation.departureTime,
            'scheduleId':widget.scheduleId,
            'stationId': currentStation.stationId,
            'arrivalStatus': currentStation.arrivalStatus,
            'actualArrivalTime': currentStation.actualArrivalTime,
            'delayArrival': currentStation.delayArrival,
            'actualDepartureTime': currentStation.actualDepartureTime,
            'delayDeparture': currentStation.delayDeparture,
            'date': currentStation.date,
            'reason': currentStation.reason,
          }),
        );


        if (kDebugMode) {
          print(response.body);
        }
          final Map<String, dynamic> responseBody = json.decode(response.body);

          id = responseBody['result']['id'];
          if (kDebugMode) {
            print("\n\nid in response $id\n\n\n");
          }


      } else if (currentStation.arrivalStatus == 1) {
        if (kDebugMode) {
          print("\n\n\nin after$id");
        }
        currentStation.arrivalStatus = 2;
        calculateDelayAndUpdateTime(currentStation);

        final baseUrl = dotenv.env['BASE_URL'];
        final Uri uri = Uri.parse('$baseUrl/location-update');
        final sharedPreferences = await SharedPreferences.getInstance();
        final accessToken = sharedPreferences.getString('accessToken') ?? '';

        final response = await http.post(
          uri,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer $accessToken',
          },
          body: json.encode({
            'id': id,
            'arrivalTime':currentStation.arrivalTime,
            'departureTime':currentStation.departureTime,
            'scheduleId':widget.scheduleId,
            'stationId': currentStation.stationId,
            'arrivalStatus': currentStation.arrivalStatus,
            'actualArrivalTime': currentStation.actualArrivalTime,
            'delayArrival': currentStation.delayArrival,
            'actualDepartureTime': currentStation.actualDepartureTime,
            'delayDeparture': currentStation.delayDeparture,
            'date': currentStation.date,
            'reason': currentStation.reason,
          }),
        );

        if (response.statusCode == 200) {
          // Successfully updated the database
          updateNextStation();
          if (kDebugMode) {
            print("\n\n\nafter updating next index $nextStationIndex\n\n\n");
          }// Move to the next station
        }
      }
      // if (nextStationIndex >= stationDataList.length) {
      //   await generateAndSavePDF(stationDataList);
      //   // Add code here to automatically trigger a download or open the PDF.
      // }

      setState(() {});
    }
  }


  void updateNextStation() {
    // Move to the next station index
    if (kDebugMode) {
      print("\n\nbefore incrementing $nextStationIndex\n\n");
    }
    nextStationIndex++;

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
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    'Train Name: ${widget.trainName}',
                    // style: const TextStyle(fontSize: 20),
                    style: const TextStyle(
                      color: Color(0xFF3D51A9), // Text color
                      fontSize: 20,
                      fontWeight: FontWeight.bold,// Font size
                    ),
                  ),
                  Text(
                    DateFormat('yyyy-MM-dd').format(DateTime.now()),
                    style: const TextStyle(color: Color(0xFF3D51A9),fontSize: 20),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            _buildInfoBox(),
            const SizedBox(height: 16),
            ScheduleTable(stationDataList: stationDataList, isArrival: isArrival),

          ],
        ),
      ),
    );
  }

  Widget _buildInfoBox() {
    return Container(
      padding: const EdgeInsets.all(16),
      margin: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: const Color(0xFF3D51A9),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Next Station: ${nextStationIndex < stationDataList.length ? stationDataList[nextStationIndex].stationName : ""}',
                style: const TextStyle(
                  color: Colors.white, // Text color
                  fontSize: 16, // Font size
                ),
              ),
              Text(
                isArrival
                    ? 'Arrival Time: ${nextStationIndex < stationDataList.length ? stationDataList[nextStationIndex].arrivalTime : ""}'
                    : 'Departure Time: ${nextStationIndex < stationDataList.length ? stationDataList[nextStationIndex].departureTime : ""}',
                style: const TextStyle(
                  color: Colors.white, // Text color
                  fontSize: 16, // Font size
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),

          Row(
            children: [
              StreamBuilder<DateTime>(
                stream: _time,
                builder: (context, snapshot) {
                  final currentTime = snapshot.data;
                  final formattedTime = currentTime != null ? '${currentTime.hour}:${currentTime.minute}:${currentTime.second}' : '00:00:00';

                  return Text(
                    'Current Time: $formattedTime',
                    style: const TextStyle(
                      color: Colors.white, // Text color
                      fontSize: 16, // Font size
                    ),
                  );
                },
              ),
            ],
          ),
          const SizedBox(height: 16),

          ElevatedButton(
            onPressed: () {
              setState(() {
                handleArriveButtonClick();
                isArrival = !isArrival;
                showReasonTextField = true;
              });
            },
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all(const Color(0xFFFA6F5D)), // Button color
            ),
            child: Text(
              isArrival ? 'Arrive' : 'Departure',
              style: const TextStyle(
                color: Colors.white, // Button text color
                fontSize: 20, // Button text font size
              ),
            ),
          ),
          // if (showReasonTextField)
          //   TextField(
          //     controller: reasonController,
          //     decoration: const InputDecoration(
          //       labelText: 'Enter Reason',
          //     ),
          //   ),
        ],
      ),
    );
  }

}

class ScheduleTable extends StatefulWidget {
  final List<StationData> stationDataList;
  final bool isArrival;

  const ScheduleTable({Key? key, required this.stationDataList, required this.isArrival}) : super(key: key);

  @override
  _ScheduleTableState createState() => _ScheduleTableState();
}

class _ScheduleTableState extends State<ScheduleTable> {
  bool showTable = true;

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
        rows: widget.stationDataList.map((station) {
          return DataRow(cells: [
            DataCell(Text(station.stationName)),
            DataCell(Text(station.arrivalTime)),
            DataCell(Text(station.departureTime)),
            DataCell(Text(widget.isArrival ? (station.delayArrival > 0 ? '${station.delayArrival} min' : '-') : (station.delayDeparture > 0 ? '${station.delayDeparture} min' : '-'))),
            DataCell(Text(station.reason)),
          ]);
        }).toList(),
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
