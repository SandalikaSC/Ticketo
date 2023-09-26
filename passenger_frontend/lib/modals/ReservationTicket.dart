import 'dart:ffi';

import 'package:passenger_frontend/modals/station.dart';

class ReservationTicket {


   final Station? startStation;
   final Station? endStation;
   final String depatureDate;
   final String returnDate;
   final String passengers;
   final String classname;


   ReservationTicket({
   required this.startStation,
   required this.endStation,
   required this.depatureDate,
   required this.returnDate,
   required this.passengers,
   required this.classname
   });


}
