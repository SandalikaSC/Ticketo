class Schedule{
  final String? startStation;
  final String? endStation;
  final String? startTime;
  final String? endTime;
  final String? trainName;
  final String? date;

  Schedule({
    required this.startStation,
    required this.endStation,
    required this.startTime,
    required this.endTime,
    this.trainName,
    this.date
  });

  factory Schedule.fromJson(Map<String, dynamic> json) {
    return Schedule(
      startStation: json['startStation'],
      endStation: json['endStation'],
      startTime: json['startTime'],
      endTime: json['endTime'],
        trainName: json['trainName'],
        date: json['date']
    );
  }
}