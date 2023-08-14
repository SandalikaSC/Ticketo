import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:gap/gap.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:intl/intl.dart';
import 'package:passenger_frontend/services/station_service.dart';
import 'package:passenger_frontend/widgets/Normalticket.dart';
import 'package:ticket_widget/ticket_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../modals/station.dart';
import '../utils/error_handler.dart';
import '../widgets/customSnackBar.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _formKey = GlobalKey<FormState>();
  int selectedIndex = 0;
  final TextEditingController _startStationController = TextEditingController();
  final TextEditingController _endStationController = TextEditingController();
  final TextEditingController _startDateController = TextEditingController();
  final TextEditingController _endDateController = TextEditingController();
  final TextEditingController _passengerController =
      TextEditingController(text: '1');
  String _selectedClass = 'Third Class';
  var fname;
  var lname;

  late _ToggleButtonGroupState _toggleButtonGroupState;

  final StationService stationService = StationService();
  Station? _selectedStartStation;
  Station? _selectedEndtStation;
  List<Station> _stations = [];

  void Loadnames() async {
    final sharedPreferences = await SharedPreferences.getInstance();
    fname = sharedPreferences.getString('firstName') ?? '';
    lname = sharedPreferences.getString('lastName') ?? '';
  }

  @override
  void initState() {
    super.initState();
    Loadnames();
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
    final DateTime now = DateTime.now();
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: now,
      firstDate: now, // Allow selection from today onwards
      lastDate: DateTime(2101),
    );

    if (picked != null && picked != DateTime.now()) {
      setState(() {
        _startDateController.text = DateFormat('dd MMM yyyy').format(picked);
        _endDateController.text = ''; // Clear return date if any
      });
    }
  }

  Future<void> _addTicket() async {
    //
    // print(_startDateController.text.runtimeType);
    try {
      // print('${_startStationController.text} ${_endStationController.text} ${selectedIndex} '
      //     '${_startDateController.text } ${ _passengerController.text} ${_selectedClass}');
      // print('${_startStationController.text.runtimeType} ${_endStationController.text.runtimeType} ${selectedIndex.runtimeType} '
      //     '${_startDateController.text.runtimeType } ${ _passengerController.text.runtimeType} ${_selectedClass.runtimeType}');
      final response = await stationService.addTicket(
          _selectedStartStation!.stationId.toString(),
          _selectedEndtStation!.stationId.toString(),
          selectedIndex,
          _startDateController.text,
          _endDateController.text,
          _passengerController.text,
          _selectedClass); // Perform search action here

      final responseData = json.decode(response.body);
      if (response.statusCode == 200) {
        var qrCode = List<int>.from(responseData['qrCode']['data']);
        var ticket = responseData['ticket'];
        await showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              backgroundColor: Colors.transparent,
              content: Center(
                child: TicketWidget(
                  width: 550,
                  height: 600,
                  isCornerRounded: true,
                  padding: EdgeInsets.only(top: 0, left: 20, right: 20),
                  child: TicketData(
                    ticketNo: ticket['ticketNumber'],
                    classname: ticket['classId'],
                    date: ticket['journeyDate'],
                    end: ticket['endStation'],
                    start: ticket['startStation'],
                    passengers: ticket['noOfPassengers'],
                    ticketType: ticket['ticketType'],
                    status: ticket['journeyState'],
                    tripType: ticket['tripType'],
                    qrCodeData: qrCode,
                  ),
                ),
              ),
              actions: [
                Container(
                  alignment: Alignment.center,
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.of(context).pop(); // Close the popup
                    },
                    style: ElevatedButton.styleFrom(
                      primary: Colors.red, // Set button color to red
                      shape: RoundedRectangleBorder(
                        borderRadius:
                            BorderRadius.circular(20), // Change border radius
                      ),
                    ),
                    child: Text(
                      'Close',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ),
              ],
            );
          },
        );
      } else if (response.statusCode == 400) {
        final message = responseData['message'];
        showCustomToast(context, "error", message);
      } else {
        final message = responseData['message'];
        showCustomToast(context, "error", message);
      }
    } catch (e) {
      // print('Error occurred: $e');
      ErrorHandler.showErrorSnackBar(
          context, 'Unknown error occurred. Please try again later.');
    }
  }

  void _selectReturnDate(BuildContext context) async {
    if (_toggleButtonGroupState._selectedIndex == 0) {
      // If selected index is 0 (one-way), set return date to null
      setState(() {
        _endDateController.text = '';
      });
    } else {
      // If selected index is 1 (round trip), set return date to today's date
      // final DateTime now = DateTime.now();
      // setState(() {
      //   _endDateController.text = DateFormat('dd MMM yyyy').format(now);
      // });
      if (_toggleButtonGroupState._selectedIndex != 0 &&
          _startDateController.text.isNotEmpty) {
        final DateTime departureDate =
            DateFormat('dd MMM yyyy').parse(_startDateController.text);
        final DateTime? picked = await showDatePicker(
          context: context,
          initialDate: departureDate,
          firstDate:
              departureDate, // Allow selection from the departure date onwards
          lastDate: DateTime(2101),
        );

        if (picked != null) {
          setState(() {
            _endDateController.text = DateFormat('dd MMM yyyy').format(picked);
          });
        }
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
            ToggleButtonGroup(
              onStateCreated: (state) {
                _toggleButtonGroupState = state;
              },
            ),
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
                        return 'Enter passengers.';
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
                        _selectedClass =
                            value!; // Update the selected class variable
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
                      selectedIndex = _toggleButtonGroupState._selectedIndex;
                      _showConfirmationDialog(context);
                    }
                    print(
                        '${_toggleButtonGroupState._selectedIndex} this is toggle');
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

  Future<void> _showConfirmationDialog(BuildContext context) async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // User must tap buttons to close
      builder: (BuildContext dialogContext) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius:
                BorderRadius.circular(20.0), // Adjust the radius as needed
          ),
          title: Center(
              child: Text('Confirm ticket',
                  style: TextStyle(
                      color: Styles.primaryColor,
                      fontWeight: FontWeight.bold,
                      fontSize: 22))),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                ListTile(
                  leading: Icon(Icons.train),
                  title: Text('From ${_startStationController.text}'),
                ),
                ListTile(
                  leading: Icon(Icons.location_on),
                  title: Text('To ${_endStationController.text}'),
                ),
                ListTile(
                  leading: Icon(Icons.date_range),
                  title: Text('Departure: ${_startDateController.text}'),
                ),
                if (selectedIndex == 1)
                  ListTile(
                    leading: Icon(Icons.date_range),
                    title: Text('Return: ${_endDateController.text}'),
                  ),
                ListTile(
                  leading: Icon(Icons.person),
                  title: Text('Passengers  ${_passengerController.text}'),
                ),
                ListTile(
                  leading: Icon(Icons.class_),
                  title: Text('${_selectedClass}'),
                ),
              ],
            ),
          ),
          actions: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: () {
                    Navigator.of(dialogContext).pop(); // Close the dialog
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    onPrimary: Styles.secondaryColor,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20.0),
                      side: BorderSide(
                          color: Styles.secondaryColor), // Red border
                    ),
                  ),
                  child: Text('Cancel',
                      style: TextStyle(color: Styles.secondaryColor)),
                ),
                ElevatedButton(
                  onPressed: () {
                    Navigator.of(dialogContext).pop(); // Close the dialog
                    _addTicket();
                  },
                  style: ElevatedButton.styleFrom(
                    primary: Styles.primaryColor,
                    onPrimary: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20.0),
                    ),
                  ),
                  child: Text('Confirm'),
                ),
              ],
            ),
          ],
        );
      },
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
                              "$fname $lname",
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
                          // child: Padding(
                          //   padding: const EdgeInsets.symmetric(horizontal: 16),
                          //   child: ElevatedButton(
                          //     onPressed: () {
                          //       // Add your onPressed function here
                          //       // Navigating to LoginPage when "Login" button is pressed
                          //       Navigator.push(
                          //         context,
                          //         MaterialPageRoute(
                          //           builder: (context) => LoginPage(),
                          //         ),
                          //       );
                          //     },
                          //     style: ButtonStyle(
                          //       backgroundColor:
                          //       MaterialStateProperty.all<Color>(
                          //           Colors.transparent),
                          //       // No color background
                          //       shape: MaterialStateProperty.all<
                          //           RoundedRectangleBorder>(
                          //         RoundedRectangleBorder(
                          //           borderRadius: BorderRadius.circular(20),
                          //           // Rounded corner border
                          //           side: const BorderSide(
                          //               color:
                          //               Colors.white), // White border color
                          //         ),
                          //       ),
                          //     ),
                          //     child: const Text(
                          //       'Login',
                          //       style: TextStyle(
                          //         color: Styles.textColor1,
                          //         fontStyle: FontStyle.normal,
                          //       ),
                          //     ),
                          //   ),
                          // ),
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
  final void Function(_ToggleButtonGroupState state) onStateCreated;

  ToggleButtonGroup({required this.onStateCreated});
  @override
  _ToggleButtonGroupState createState() => _ToggleButtonGroupState();
}

class _ToggleButtonGroupState extends State<ToggleButtonGroup> {
  int _selectedIndex = 0;
  @override
  void initState() {
    super.initState();
    widget.onStateCreated(this); // Pass the state instance back to the parent
  }

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
