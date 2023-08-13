import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class LocationSharingPage extends StatelessWidget {
  const LocationSharingPage({super.key});

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
  const LocationSharingContent({super.key});

  @override
  _LocationSharingContentState createState() => _LocationSharingContentState();
}

class _LocationSharingContentState extends State<LocationSharingContent> {
  double _sliderValue = 0.0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Slider(
          value: _sliderValue,
          onChanged: (newValue) {
            setState(() {
              _sliderValue = newValue;
            });
          },
        ),
        Expanded(
          child: GoogleMap(
            initialCameraPosition: const CameraPosition(
              target: LatLng(37.7749, -122.4194), // Initial map position
              zoom: 15,
            ),
            markers: {
              const Marker(
                markerId: MarkerId('marker_id'),
                position: LatLng(37.7749, -122.4194), // Marker position
              ),
            },
          ),
        ),
      ],
    );
  }
}
