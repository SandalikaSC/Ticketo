class Traveler{
  late final String? name;
  late final String? nic;

  Traveler({
    required this.name,
    required this.nic
  });

  factory Traveler.fromJson(Map<String, dynamic> json) {
    return Traveler(
        name: json['name'],
        nic: json['nic']
    );
  }
}