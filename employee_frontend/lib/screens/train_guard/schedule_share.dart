import 'package:flutter/material.dart';
import 'dart:async';

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

  _ScheduleSharePageState() {
    _time = _timeStream.stream;

    // Update the time every second
    Timer.periodic(const Duration(seconds: 1), (timer) {
      _timeStream.sink.add(DateTime.now());
    });
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
