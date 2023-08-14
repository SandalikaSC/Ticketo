import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class LocationSharingPage extends StatelessWidget {
  const LocationSharingPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Location Sharing'),
      ),
      body: const LocationSharingContent(),
    );
  }
}

class LocationSharingContent extends StatefulWidget {
  const LocationSharingContent({Key? key}) : super(key: key);

  @override
  _LocationSharingContentState createState() => _LocationSharingContentState();
}

class _LocationSharingContentState extends State<LocationSharingContent> {

  late GoogleMapController _controller; // Declare the GoogleMapController

  @override
  void dispose() {
    _controller.dispose(); // Dispose of the GoogleMapController
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: GoogleMap(
            initialCameraPosition: const CameraPosition(
              target: LatLng(6.90245046790525, 79.86115289533163), // Updated location
              zoom: 15,
            ),
            markers: {
              const Marker(
                markerId: MarkerId('marker_id'),
                position: LatLng(6.90245046790525, 79.86115289533163), // Updated location
              ),
            },
            onMapCreated: (controller) {
              _controller = controller; // Assign the controller
            },
          ),
        ),
      ],
    );
  }
}

void main() {
  runApp(const MaterialApp(
    home: LocationSharingPage(),
  ));
}
