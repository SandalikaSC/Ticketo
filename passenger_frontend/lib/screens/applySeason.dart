import 'dart:convert';

import 'package:file_picker/file_picker.dart';
import 'dart:io';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/modals/station.dart';
import 'package:passenger_frontend/services/season_service.dart';
import 'package:passenger_frontend/services/station_service.dart';
import 'package:passenger_frontend/utils/error_handler.dart';
import 'package:passenger_frontend/widgets/customSnackBar.dart';

class SeasonApplication extends StatefulWidget {
  const SeasonApplication({Key? key}) : super(key: key);

  @override
  _SeasonApplicationState createState() => _SeasonApplicationState();
}

class _SeasonApplicationState extends State<SeasonApplication> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  String? _startStation;
  String? _endStation;
  String? _month;
  String _duration = '1 Month';
  int newduration = 1;
  String _travelClass = '2nd Class';
  int classTravel = 2;
  String? _designation;
  String? _workPlace;
  String? _workplaceAddress;
  String? _workingSector = 'Government';
  File? _selectedImage;
  // You can store the photo attachment here.
  final SeasonService seasonService = SeasonService();
  final StationService stationService = StationService();
  Station? _selectedStartStation;
  Station? _selectedEndtStation;
  List<Station> _stations = [];
  final TextEditingController _startStationController = TextEditingController();
  final TextEditingController _endStationController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadStations();
  }

  @override
  void dispose() {
    // Cancel any ongoing operations, such as network requests
    // or async computations.
    super.dispose();
  }

  Future<void> sendSeasonRequest() async {
    try {
      final response = await seasonService.sendSeasonRequest(
          newduration,
          _selectedStartStation!.name,
          _selectedEndtStation!.name,
          _designation,
          _workPlace,
          _workplaceAddress,
          _workingSector,
          classTravel,
          _selectedImage); // Perform search action here

      final responseData = json.decode(response.body);
      if (response.statusCode == 200) {
        Navigator.of(context).pop();
        showCustomToast(
            context, "success", "Successfully set the Season Request");
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: Center(
          child: Padding(
            padding: const EdgeInsets.only(top: 30),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  CupertinoIcons
                      .folder_fill_badge_plus, // Replace with your desired icon
                  color: Styles.secondaryColor, // Blue icon color
                ),
                const SizedBox(
                    width: 8), // Add some spacing between icon and text
                Text(
                  "Season Application",
                  style:
                      TextStyle(color: Styles.primaryColor), // Blue title color
                ),
              ],
            ),
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Form(
          key: _formKey,
          child: ListView(
            padding: EdgeInsets.all(16.0),
            children: [
              // Section: Season Information
              SizedBox(height: 16),
              Text(
                'Season Information',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),

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
                Text(
                    'Selected Station ID: ${_selectedStartStation!.stationId}'),
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

              DropdownButtonFormField(
                items: ['1 Month', '3 Months'].map((duration) {
                  return DropdownMenuItem(
                    value: duration,
                    child: Text(duration),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() {
                    _duration = value.toString();
                    if (value == "1 Month") {
                      newduration = 1;
                    } else {
                      newduration = 3;
                    }
                  });
                },
                value: _duration,
                decoration: InputDecoration(labelText: 'Duration'),
              ),
              DropdownButtonFormField(
                items: ['2nd Class', '3rd Class'].map((_travelClass) {
                  return DropdownMenuItem(
                    value: _travelClass,
                    child: Text(_travelClass),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() {
                    _travelClass = value.toString();
                    if (value == "2nd Class") {
                      classTravel = 2;
                    } else {
                      classTravel = 3;
                    }
                  });
                },
                value: _travelClass,
                decoration: InputDecoration(labelText: 'Class'),
              ),

              // Section: Employment Information
              SizedBox(height: 20.0),
              Text(
                'Employment Information',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Designation'),
                onSaved: (value) => _designation = value,
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Workplace'),
                onSaved: (value) => _workPlace = value,
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Workplace Address'),
                onSaved: (value) => _workplaceAddress = value,
              ),
              DropdownButtonFormField<String>(
                items: ['Government', 'Private'].map((sector) {
                  return DropdownMenuItem(
                    value: sector,
                    child: Text(sector),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() {
                    _workingSector = value;
                  });
                },
                value: _workingSector,
                decoration: InputDecoration(labelText: 'Working Sector'),
              ),
              // You can add a photo attachment field here
              // Submit Button
              ElevatedButton(
                onPressed: () async {
                  FilePickerResult? result =
                      await FilePicker.platform.pickFiles();

                  if (result != null) {
                    final file = File(result.files.single.path!);
                    _selectedImage = file;
                    setState(() {
                      _selectedImage = file;
                    });
                  } else {
                    // User canceled the picker
                    // You can show snackbar or fluttertoast
                    // here like this to show warning to user
                    // ignore: use_build_context_synchronously
                    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                      content: Text('Please select file'),
                    ));
                  }
                },
                child: Text(_selectedImage != null
                    ? _selectedImage!.path.split("/").last
                    : "Upload Form"),
              ),

              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    _formKey.currentState!.save();
                    sendSeasonRequest();
                    // Process and submit the form data here
                    // You can access the input values using the _startStation, _endStation, etc. variables
                  }
                },
                child: Text('Submit'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// void main() {
//   runApp(MaterialApp(
//     home: SeasonApplication(),
//   ));
// }
