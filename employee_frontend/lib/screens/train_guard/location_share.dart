import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class LocationSharingPage extends StatelessWidget {
  final int? scheduleId;
  const LocationSharingPage({Key? key, required this.scheduleId}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Initialize a map of scheduleId to list of LatLng coordinates
    final Map<int, List<LatLng>> scheduleLocations = {
      1: [
        // Add 15 coordinates for scheduleId 1
        //const LatLng(6.90245046790525, 79.86115289533163),
        const LatLng(6.929461577220772, 79.86615771101067),
        const LatLng(6.93419099725622, 79.84998658362272),
        const LatLng(6.584354163583408, 79.95917982344864),
        const LatLng(6.432291099979242, 80.0004219986519),
        const LatLng(6.338759897452704, 80.02958722577166),
        const LatLng(6.23580093830414, 80.05591920074573),
        const LatLng(6.142738718680094, 80.10023747513785),
        const LatLng(6.0337553329714115, 80.21541127212308),
        const LatLng(5.973495895496252, 80.3650190406872),
        const LatLng(5.976109447256514, 80.43080211112057),
        const LatLng(5.952265024141477, 80.54428591791483),
        // Example coordinates for scheduleId 1
        // Add 14 more coordinates here for scheduleId 1
      ],
      2: [
        const LatLng(6.934008826311588, 79.85010443293852),
        const LatLng(7.029970946808895, 79.92216151482471),
        const LatLng(7.093668937215058, 79.99430895715238),
        const LatLng(7.153058490347305, 80.05863690174469),
        const LatLng(7.242605486327678, 80.12827326775103),
        const LatLng(7.331274525420663, 80.30184193202243),
        const LatLng(7.321531005531341, 80.39119266261473),
        const LatLng(7.2888063531815686, 80.47034340874553),
        const LatLng(7.257964707513342, 80.52119874922013),
        const LatLng(7.214275867642561, 80.59874120637105),
        const LatLng(7.162629023683594, 80.56687207542875),
        const LatLng(7.057143589578996, 80.53589484922013),
        const LatLng(6.89348419482339, 80.59909508176248),
        const LatLng(6.92849838161186, 80.60950609340091),
        const LatLng(6.940224378486181, 80.66179808969473),
        const LatLng(6.945286947075433, 80.71747797178062),
        const LatLng(6.942564223546825, 80.74594145291816),
        // Add 15 coordinates for scheduleId 2
      ],
      3: [

        const LatLng(6.93419099725622, 79.84998658362272),
        const LatLng(6.584354163583408, 79.95917982344864),
        const LatLng(6.432291099979242, 80.0004219986519),
        const LatLng(6.338759897452704, 80.02958722577166),
        const LatLng(6.23580093830414, 80.05591920074573),
        const LatLng(6.142738718680094, 80.10023747513785),
        const LatLng(6.0337553329714115, 80.21541127212308),
        const LatLng(5.973495895496252, 80.3650190406872),
        const LatLng(5.976109447256514, 80.43080211112057),
        const LatLng(5.952265024141477, 80.54428591791483),
        const LatLng(5.961043526770362, 80.59965277730196),
        const LatLng(5.970753412706153, 80.66140148473185),
        const LatLng(5.979560320670927, 80.69821186939089),
        const LatLng(6.0423060384914695, 80.73787717919161),
        // Add 15 coordinates for scheduleId 2
      ],
      // Add locations for other scheduleIds as needed
    };

    final List<LatLng> locations = scheduleLocations[scheduleId] ?? [];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Location Sharing'),
      ),
      body: LocationSharingContent(locations: locations),
    );
  }
}

class LocationSharingContent extends StatefulWidget {
  final List<LatLng> locations;
  const LocationSharingContent({Key? key, required this.locations}) : super(key: key);

  @override
  _LocationSharingContentState createState() => _LocationSharingContentState();
}

class _LocationSharingContentState extends State<LocationSharingContent> {
  late GoogleMapController _controller;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Create a Polyline from the locations
    final Polyline polyline = Polyline(
      polylineId: const PolylineId('polyline_id'),
      color: Colors.brown,
      points: widget.locations,
    );

    // Show a dialog when the page is loaded
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _showSuccessDialog(context);
    });

    return Column(
      children: [
        Expanded(
          child: GoogleMap(
            initialCameraPosition: CameraPosition(
              target: widget.locations.isNotEmpty ? widget.locations[0] : const LatLng(0, 0),
              zoom: 15,
            ),
            markers: Set<Marker>.from(
              widget.locations.map((location) {
                return Marker(
                  markerId: MarkerId(location.toString()),
                  position: location,
                );
              }),
            ),
            polylines: {polyline},
            onMapCreated: (controller) {
              _controller = controller;
            },
          ),
        ),
      ],
    );
  }

  void _showSuccessDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Colors.white, // Set the dialog's background color to red
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0), // Set the dialog's border radius
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(
                Icons.warning,
                color: Colors.red, // Set the warning icon's color to yellow
                size: 48.0,
              ),
              const SizedBox(height: 8.0),
              const Text(
                'Warning!',
                style: TextStyle(
                  color: Colors.red, // Set the text color to yellow
                  fontSize: 30.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 15.0),
              const Text(
                'Location Mismatch!',
                style: TextStyle(
                  color: Colors.black, // Set the text color to white
                  fontSize: 22.0,
                ),
              ),
              const SizedBox(height: 15.0),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Colors.red, // Set the button's background color to white
                ),
                child: const Text('OK'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          ),
        );
      },
    );
  }
}


void main() {
  runApp(const MaterialApp(
    home: LocationSharingPage(scheduleId: 1),
  ));
}
