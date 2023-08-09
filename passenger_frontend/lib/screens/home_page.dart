import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:intl/intl.dart';

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
            Container(
              width: 350,
              height: 400,
              decoration: BoxDecoration(
                color: Styles.backgroundColor,
                borderRadius: BorderRadius.circular(30),
              ),
              child: const TrainScheduleForm(),
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
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                style: TextStyle(
                  fontFamily: "poppins",
                ),
                decoration: InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius:
                          BorderRadius.circular(30.0), // Set border radius
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(30.0),
                      // Set focused border radius
                      borderSide: BorderSide(
                          color:
                              Styles.primaryColor), // Set focused border color
                    ),
                    prefixIcon: const Icon(Icons.start_sharp),
                    labelText: 'Start Station'),
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
              Gap(10),
              TextFormField(
                style: TextStyle(
                  fontFamily: "poppins",
                ),
                decoration: InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius:
                          BorderRadius.circular(30.0), // Set border radius
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(30.0),
                      // Set focused border radius
                      borderSide: BorderSide(
                          color:
                              Styles.primaryColor), // Set focused border color
                    ),
                    prefixIcon: const Icon(Icons.location_on_outlined),
                    labelText: 'End Station'),
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
              Gap(8),
              Row(
                children: [
                  Expanded(
                      child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      padding:
                          EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30),
                        // side: BorderSide(
                        //     // color: Styles.primaryColor
                        //     ), // Add a border color
                      ),
                    ),
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
                    child: Text(
                      _startTime == null
                          ? 'Start time'
                          : '${_formatTimeWithAMPM(_startTime!)}', // Format time with AM/PM
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.white,
                        fontFamily: "poppins",
                      ),
                    ),
                  )),
                  const SizedBox(width: 10),
                  Expanded(
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue,
                        padding:
                            EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(30),
                          // side: BorderSide(
                          //     // color: Styles.primaryColor
                          //     ), // Add a border color
                        ),
                      ),
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
                      child: Text(
                        _endTime == null
                            ? 'End time'
                            : '${_formatTimeWithAMPM(_endTime!)}', // Format time with AM/PM
                        style: TextStyle(
                          fontSize: 18,
                          color: Colors.white,
                          fontFamily: "poppins",
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              Gap(10),
              DropdownButtonFormField<String>(
                value: _selectedTicketClass,
                decoration: InputDecoration(
                  labelText: 'Ticket Class',
                  // border: OutlineInputBorder(
                  //   borderRadius:
                  //       BorderRadius.circular(30.0), // Set border radius
                  // ),
                  // focusedBorder: OutlineInputBorder(
                  //   borderRadius: BorderRadius.circular(30.0),
                  //   // Set focused border radius
                  //   borderSide: BorderSide(
                  //       color: Styles.primaryColor), // Set focused border color
                  // ),
                ),
                items: [
                  DropdownMenuItem(
                      value: 'First Class', child: Text('First Class')),
                  DropdownMenuItem(
                      value: 'Second Class', child: Text('Second Class')),
                  DropdownMenuItem(
                      value: 'Third Class', child: Text('Third Class')),
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
        ),
      ),
    );
  }
}

String _formatTimeWithAMPM(TimeOfDay time) {
  final now = DateTime.now();
  final selectedDateTime =
      DateTime(now.year, now.month, now.day, time.hour, time.minute);
  final format = DateFormat('hh:mm a'); // Use a custom format
  return format.format(selectedDateTime);
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
