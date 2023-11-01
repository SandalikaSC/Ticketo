class Traveler {
  String? name;
  String? nic;

  Traveler({this.name, this.nic});

  factory Traveler.fromJson(Map<String, dynamic> json) {
    return Traveler(name: json['name'], nic: json['nic']);
  }
}
