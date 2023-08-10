import 'dart:convert';
import 'dart:ffi';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:gap/gap.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:intl/intl.dart';
import 'package:passenger_frontend/screens/login.dart';
import 'package:passenger_frontend/services/station_service.dart';
import 'package:http/http.dart' as http;

import '../modals/station.dart';
import '../utils/error_handler.dart';

class GuestHomeScreen extends StatefulWidget {
  const GuestHomeScreen({Key? key}) : super(key: key);

  @override
  _GuestHomeScreenState createState() => _GuestHomeScreenState();
}

class _GuestHomeScreenState extends State<GuestHomeScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _startStationController = TextEditingController();
  final TextEditingController _endStationController = TextEditingController();
  final TextEditingController _startDateController = TextEditingController();
  final TextEditingController _endDateController = TextEditingController();
  final TextEditingController _passengerController = TextEditingController();
  String _selectedClass = 'Third Class';

  final StationService stationService = StationService();
  Station? _selectedStartStation;
  Station? _selectedEndtStation;
  List<Station> _stations = [];

  @override
  void initState() {
    super.initState();
    _startDateController.text =
        DateFormat('dd MMM yyyy').format(DateTime.now());
    _endDateController.text = DateFormat('dd MMM yyyy').format(DateTime.now());
    _loadStations();
  }

  @override
  void dispose() {
    // Cancel any ongoing operations, such as network requests
    // or async computations.
    super.dispose();
  }

  Future<void> _loadStations() async {
    if (!mounted) return; // Check if the widget is still mounted

    try {
      final response = await stationService.getAllStations();
      final responseData = json.decode(response.body);
      // Print the response body (content)

      if (response.statusCode == 200) {
        final dynamic decodedResponse = json.decode(response.body);

        if (decodedResponse != null && decodedResponse['stations'] != null) {
          final List<dynamic> data = decodedResponse['stations'];
          setState(() {
            _stations = data
                .map((stationData) => Station(
                      stationId: stationData['stationId'] ?? 0,
                      // Use a default value if null
                      name: stationData['name'] ?? '',
                      latitude: stationData['latitude'] ?? 0.0,
                      longitude: stationData['longitude'] ?? 0.0,
                      contactNumber: stationData['contactNumber'] ?? '',
                    ))
                .toList();
          });
        } else {
          _stations = List.empty();
        }
      }
    } catch (e) {
      print('Error occurred: $e'); // Print the exception details
      ErrorHandler.showErrorSnackBar(
          context, 'Unknown error occurred. Please try again later.');
    }
  }

  Future<DateTime?> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );

    if (picked != null && picked != DateTime.now()) {
      return picked;
    }
    return null;
  }

  void _selectDepartureDate(BuildContext context) async {
    final selectedDate = await _selectDate(context);
    if (selectedDate != null) {
      setState(() {
        _startDateController.text =
            DateFormat('dd MMM yyyy').format(selectedDate);
        _endDateController.text = ''; // Clear return date if any
      });
    }
  }

  void _selectReturnDate(BuildContext context) async {
    if (_startDateController.text.isNotEmpty) {
      final selectedDate = await _selectDate(context);
      if (selectedDate != null) {
        setState(() {
          _endDateController.text =
              DateFormat('dd MMM yyyy').format(selectedDate);
        });
      }
    }
  }

  Form buildTripForm() {
    return Form(
      key: _formKey,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(40),
          border: Border.all(color: Colors.black26), // Border color
        ),
        padding: EdgeInsets.all(15),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ToggleButtonGroup(),
            Gap(10),
            TypeAheadFormField(
              textFieldConfiguration: TextFieldConfiguration(
                controller: _startStationController,
                decoration: InputDecoration(
                  labelText: 'From',
                  prefixIcon: Icon(Icons.directions_train_rounded,
                      color: Styles.primaryColor),
                  prefix: Container(
                    width: 1,
                    height: 16,
                    color: Colors.grey, // Dotted line color
                    margin: EdgeInsets.symmetric(horizontal: 8),
                  ),
                ),
              ),
              suggestionsCallback: (pattern) {
                return _stations.where(
                  (station) => station.name
                      .toLowerCase()
                      .contains(pattern.toLowerCase()),
                );
              },
              itemBuilder: (context, Station suggestion) {
                return ListTile(
                  title: Text(suggestion.name),
                );
              },
              onSuggestionSelected: (Station suggestion) {
                _startStationController.text = suggestion.name;
                setState(() {
                  _selectedStartStation = suggestion;
                });
              },
              validator: (value) {
                if (_selectedStartStation == null) {
                  return 'Please select a start station.';
                } else {
                  bool isStationNameInData = _stations.any((station) =>
                      station.name.toLowerCase() == value?.toLowerCase());

                  if (!isStationNameInData) {
                    return 'Invalid station';
                  }
                }
                return null; // No validation error
              },
            ),
            if (_selectedStartStation != null)
              Text('Selected Station ID: ${_selectedStartStation!.stationId}'),
            TypeAheadFormField(
              textFieldConfiguration: TextFieldConfiguration(
                controller: _endStationController,
                decoration: InputDecoration(
                  labelText: 'To',
                  prefixIcon:
                      Icon(Icons.location_on, color: Styles.primaryColor),
                  // Icon you want to use
                  prefix: Container(
                    width: 1,
                    height: 16,
                    color: Colors.grey, // Dotted line color
                    margin: EdgeInsets.symmetric(horizontal: 8),
                  ),
                ),
              ),
              suggestionsCallback: (pattern) {
                return _stations.where(
                  (station) => station.name
                      .toLowerCase()
                      .contains(pattern.toLowerCase()),
                );
              },
              itemBuilder: (context, Station suggestion) {
                return ListTile(
                  title: Text(suggestion.name),
                );
              },
              onSuggestionSelected: (Station suggestion) {
                _endStationController.text = suggestion.name;
                setState(() {
                  _selectedEndtStation = suggestion;
                });
              },
              validator: (value) {
                if (_selectedEndtStation == null) {
                  return 'Please select a end station.';
                } else {
                  bool isStationNameInData = _stations.any((station) =>
                      station.name.toLowerCase() == value?.toLowerCase());

                  if (!isStationNameInData) {
                    return 'Invalid station';
                  }
                }
                return null; // No validation error
              },
            ),
            if (_selectedEndtStation != null)
              Text('Selected Station ID: ${_selectedEndtStation!.stationId}'),
            Row(
              children: [
                Flexible(
                  child: TextFormField(
                    controller: _startDateController,
                    readOnly: true,
                    onTap: () => _selectDepartureDate(context),
                    decoration: InputDecoration(
                      labelText: 'Depature',
                      suffixIcon: Icon(Icons.calendar_today),
                    ),
                  ),
                ),
                SizedBox(width: 10),
                Flexible(
                  child: TextFormField(
                    controller: _endDateController,
                    readOnly: true,
                    onTap: () => _selectReturnDate(context),
                    decoration: InputDecoration(
                      labelText: 'Return',
                      suffixIcon: Icon(Icons.edit_calendar_rounded),
                    ),
                  ),
                ),
              ],
            ),
            Row(
              children: [
                Flexible(
                  child: TextFormField(
                    controller: _passengerController,
                    decoration: InputDecoration(
                      labelText: 'Passengers',
                      suffixIcon:
                          Icon(Icons.person), // Add your desired icon here
                    ),
                    keyboardType: TextInputType.number,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Passengers field cannot be empty.';
                      }

                      int? passengers = int.tryParse(value);
                      if (passengers == null || passengers <= 0) {
                        return 'Please enter a valid number of passengers.';
                      }

                      return null; // No validation error
                    },
                  ),
                ),
                SizedBox(width: 10),
                Flexible(
                  child: DropdownButtonFormField<String>(
                    decoration: InputDecoration(labelText: 'Class'),
                    value: _selectedClass,
                    onChanged: (value) {
                      setState(() {
                        _selectedClass = value!; // Update the selected class variable
                      });
                    },
                    items: ['First Class', 'Second Class', 'Third Class']
                        .map((String value) {
                      return DropdownMenuItem<String>(
                        value: value,

                        child: Text(value),
                      );
                    }).toList(),
                  ),
                ),
              ],
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        // Validation successful, handle form submission
                      }
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Styles.primaryColor, // Background color
                      onPrimary: Colors.white, // Text color
                      shape: RoundedRectangleBorder(
                        borderRadius:
                            BorderRadius.circular(30), // Button border radius
                      ),
                    ),
                    child: Text('Search Train',
                        style: TextStyle(fontFamily: "Poppins")),
                  ),
                ),
                SizedBox(width: 10), // Add spacing between buttons
                ElevatedButton(
                  onPressed: () {
                    if (_formKey.currentState!.validate()) {
                      // Validation successful, handle form submission
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white, // Background color
                    onPrimary: Colors.white, // Text color
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30),
                        side: BorderSide(color: Styles.secondaryColor)
                        // Button border radius
                        ),
                  ),
                  child: Text('Quick ticket',
                      style: TextStyle(
                          fontFamily: "Poppins", color: Styles.secondaryColor)),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          child: Column(
            // crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                decoration: const BoxDecoration(
                    color: Styles.primaryColor,
                    borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(20),
                        bottomRight: Radius.circular(180))),
                width: double.infinity,
                height: 200,
                child: Column(
                  children: [
                    const Gap(60),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Container(
                          width: 70,
                          height: 70,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(30),
                            image: const DecorationImage(
                              fit: BoxFit.cover,
                              image: AssetImage(
                                  "assets/images/profile_picture.jpg"),
                            ),
                          ),
                        ),
                        Gap(40),
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
                    const Gap(10),
                    Column(
                      // mainAxisAlignment: MainAxisAlignment.s,
                      children: [
                        Container(
                          width: 220, // Adjust the width as needed
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 16),
                            child: ElevatedButton(
                              onPressed: () {
                                // Add your onPressed function here
                                // Navigating to LoginPage when "Login" button is pressed
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => LoginPage(),
                                  ),
                                );
                              },
                              style: ButtonStyle(
                                backgroundColor:
                                    MaterialStateProperty.all<Color>(
                                        Colors.transparent),
                                // No color background
                                shape: MaterialStateProperty.all<
                                    RoundedRectangleBorder>(
                                  RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(20),
                                    // Rounded corner border
                                    side: const BorderSide(
                                        color:
                                            Colors.white), // White border color
                                  ),
                                ),
                              ),
                              child: const Text(
                                'Login',
                                style: TextStyle(
                                  color: Styles.textColor1,
                                  fontStyle: FontStyle.normal,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              // Gap(30),
              Padding(
                  padding: EdgeInsets.only(right: 18),
                  child: Container(
                    alignment: Alignment.topRight,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text("Let's book",
                            style: TextStyle(
                                fontSize: 18,
                                color: Styles.primaryColor,
                                fontFamily: "Poppins",
                                fontWeight: FontWeight.w500,
                                fontStyle: FontStyle.normal)),
                        Text("your next journey",
                            style: TextStyle(
                                fontSize: 28,
                                color: Styles.primaryColor,
                                fontFamily: "Poppins",
                                fontWeight: FontWeight.w500,
                                fontStyle: FontStyle.normal)),
                      ],
                    ),
                  )),
              Gap(20),
              Container(
                // color: Colors.blueGrey,
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  children: [
                    buildTripForm(),

                    ///add form here
                  ],
                ),
              ),

              //add form here
            ],
          ),
        ),
      ),
    );
  }
}

class ToggleButtonGroup extends StatefulWidget {
  @override
  _ToggleButtonGroupState createState() => _ToggleButtonGroupState();
}

class _ToggleButtonGroupState extends State<ToggleButtonGroup> {
  int _selectedIndex = 0;

  int getSelectedIndex() {
    return _selectedIndex;
  }

  @override
  Widget build(BuildContext context) {
    return ToggleButtons(
      isSelected: [_selectedIndex == 0, _selectedIndex == 1],
      onPressed: (index) {
        setState(() {
          _selectedIndex = index;
        });
      },
      children: [
        IconTextToggleButton(
          icon: Icons.arrow_circle_right_outlined,
          label: 'One-way',
          isSelected: _selectedIndex == 0,
        ),
        IconTextToggleButton(
          icon: Icons.compare_arrows_sharp,
          label: 'Round trip',
          isSelected: _selectedIndex == 1,
        ),
      ],
      borderRadius: BorderRadius.circular(30),
      // fillColor: Styles.primaryColor,
      // selectedColor: Colors.white,
      // color: Styles.primaryColor,
      // selectedBorderColor: Styles.primaryColor,
      // borderWidth: 2,
    );
  }
}

class IconTextToggleButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isSelected;

  const IconTextToggleButton({
    required this.icon,
    required this.label,
    required this.isSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      // color: Colors.blueGrey,
      padding: EdgeInsets.only(right: 8),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        // color: isSelected ? Styles.secondaryColor : Colors.transparent,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              // color: isSelected ? Colors.white : Styles.primaryColor,
            ),
            padding: EdgeInsets.all(8),
            child: Icon(
              icon,
              color: Styles.primaryColor,
            ),
          ),
          SizedBox(width: 5),
          Text(
            label,
            style: TextStyle(
              color: Styles.primaryColor,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
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
