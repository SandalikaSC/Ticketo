import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'login.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Stack(
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  decoration: const BoxDecoration(
                      color: Styles.primaryColor,
                      borderRadius: BorderRadius.only(
                          bottomLeft: Radius.circular(30),
                          bottomRight: Radius.circular(30))),
                  width: double.infinity,
                  height: 400,
                  child: Column(
                    children: [
                      const Gap(85),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(30),
                              image: const DecorationImage(
                                fit: BoxFit.cover,
                                image: AssetImage(
                                    "assets/images/profile_picture.jpg"),
                              ),
                            ),
                          ),
                          const Gap(10),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "${getGreeting()}!👋",
                                style: Styles.headWhite,
                              ),
                              const Gap(5),
                              Text(
                                "Sandalika Chamari",
                                style: Styles.headWhite,
                              )
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
            Center(
              child: FractionalTranslation(
                translation: const Offset(0, 0.45),
                child: Container(
                  width: 350,
                  height: 400,
                  decoration: BoxDecoration(
                    color: Styles.backgroundColor,
                    borderRadius: BorderRadius.circular(30),
                  ),
                  child: const TrainScheduleForm(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class TrainScheduleForm extends StatefulWidget {
  const TrainScheduleForm({super.key});

  @override
  _TrainScheduleFormState createState() => _TrainScheduleFormState();
}

class _TrainScheduleFormState extends State<TrainScheduleForm> {
  final _formKey = GlobalKey<FormState>();
  String? _startStation;
  String? _endStation;
  TimeOfDay? _startTime;
  TimeOfDay? _endTime;
  DateTime? _selectedDate;
  String? _selectedTicketClass;

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            decoration: InputDecoration(labelText: 'Start Station'),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter a start station';
              }
              return null;
            },
            onChanged: (value) {
              // Handle station filtering based on user input
            },
          ),
          TextFormField(
            decoration: InputDecoration(labelText: 'End Station'),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter an end station';
              }
              return null;
            },
            onChanged: (value) {
              // Handle station filtering based on user input
            },
          ),
          Row(
            children: [
              Expanded(
                child: ElevatedButton(
                  onPressed: () async {
                    final time = await showTimePicker(
                      context: context,
                      initialTime: TimeOfDay.now(),
                    );
                    if (time != null) {
                      setState(() {
                        _startTime = time;
                      });
                    }
                  },
                  child: Text(_startTime == null
                      ? 'Select Start Time'
                      : 'Start Time: ${_startTime!.format(context)}'),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: ElevatedButton(
                  onPressed: () async {
                    final time = await showTimePicker(
                      context: context,
                      initialTime: TimeOfDay.now(),
                    );
                    if (time != null) {
                      setState(() {
                        _endTime = time;
                      });
                    }
                  },
                  child: Text(_endTime == null
                      ? 'Select End Time'
                      : 'End Time: ${_endTime!.format(context)}'),
                ),
              ),
            ],
          ),
          DropdownButtonFormField<String>(
            value: _selectedTicketClass,
            decoration: InputDecoration(labelText: 'Select Ticket Class'),
            items: [
              DropdownMenuItem(
                  value: 'First Class', child: Text('First Class')),
              DropdownMenuItem(
                  value: 'Second Class', child: Text('Second Class')),
              // Add more ticket classes as needed
            ],
            onChanged: (value) {
              setState(() {
                _selectedTicketClass = value;
              });
            },
          ),
          ElevatedButton(
            onPressed: () async {
              final selectedDate = await showDatePicker(
                context: context,
                initialDate: DateTime.now(),
                firstDate: DateTime.now(),
                lastDate: DateTime.now().add(Duration(days: 365)),
              );
              if (selectedDate != null) {
                setState(() {
                  _selectedDate = selectedDate;
                });
              }
            },
            child: Text(_selectedDate == null
                ? 'Select Date'
                : 'Selected Date: ${_selectedDate!.toString().split(' ')[0]}'),
          ),
          ElevatedButton(
            onPressed: () {
              if (_formKey.currentState!.validate()) {
                // Perform the search action using the form fields
                // _startStation, _endStation, _startTime, _endTime,
                // _selectedTicketClass, _selectedDate
              }
            },
            child: Text('Search Train'),
          ),
        ],
      ),
    );
  }
}

String getGreeting() {
  var hour = DateTime.now().hour;

  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 17) {
    return "Good Afternoon";
  } else {
    return "Good Night";
  }
}
