class Station {
  final int? stationId;
  final String name;
  final double? latitude;
  final double? longitude;
  final String contactNumber;

  Station({
    required this.stationId,
    required this.name,
    this.latitude,
    this.longitude,
    this.contactNumber = "",
  });

  factory Station.fromJson(Map<String, dynamic> json) {
    return Station(
      stationId: json['stationId'],
      name: json['name'],
      latitude: json['latitude'],
      longitude: json['longitude'],
      contactNumber: json['contactNumber'],
    );
  }
}
