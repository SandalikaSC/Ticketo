import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:ticket_widget/ticket_widget.dart';
import 'dart:typed_data';

// class normalTicket extends StatelessWidget {
//   const normalTicket({Key? key}) : super(key: key);

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: Colors.blueGrey,
//       body: Center(
//         child: TicketWidget(
//             width: 350,
//             height: 600,
//             isCornerRounded: true,
//             padding: EdgeInsets.only(top: 0, left: 20, right: 20),
//             child: TicketData(
//                 qrCodeData: [69, 78, 68, 174, 130],
//                 ticketNo: "1",
//                 start: "1",
//                 end: "1",
//                 classname: "1",
//                 date: "dfefewfewfe",
//                 status: 1,
//                 ticketType: "efewfewfew",
//                 passengers: 5,
//                 tripType: "fewfewfewfewf")),
//       ),
//     );
//   }
// }

class SeasonTicket extends StatelessWidget {
  final List<int> qrCodeData;
  // final int ticketNo;
  final String? month;
  // final int passengers;
  final String type;
  // final String? tripType;
  // final String? ticketType;
  final String? start;
  final String? end;
  final String? classname;

  const SeasonTicket(
      {Key? key,
      // required this.ticketNo,
      required this.month,
      // required this.passengers,
      required this.type,
      // required this.tripType,
      // required this.ticketType,
      required this.qrCodeData,
      required this.start,
      required this.end,
      required this.classname})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Gap(20),
        Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // Container(
              //   width: 10.0,
              //   height: 10.0,
              //   decoration: BoxDecoration(
              //     image: DecorationImage(
              //       image: AssetImage(
              //           'assets/images/logopic.png'), // Replace with your image asset path
              //       fit: BoxFit.cover, // Adjust the fit as needed
              //     ),
              //   ),
              // ),
              Text(
                'My Season',
                style: TextStyle(
                    color: Styles.primaryColor,
                    fontSize: 25.0,
                    fontWeight: FontWeight.bold),
              ),
              Gap(10),
              Container(
                width: 150.0,
                height: 25.0,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(30.0),
                  border: Border.all(width: 1.0, color: Styles.secondaryColor),
                ),
                child: Center(
                  child: Text(
                    '$classname', //class name
                    style: TextStyle(color: Styles.secondaryColor),
                  ),
                ),
              ),
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(top: 0.0, left: 20, right: 20),
          child: Center(
            child: Container(
              width: 250.0,
              height: 250.0,
              child: Image.memory(Uint8List.fromList(qrCodeData)),
            ),
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Spacer(flex: 1),
            Text(
              '$start', //start station
              style: TextStyle(
                  color: Styles.primaryColor, fontWeight: FontWeight.bold),
            ),
            Spacer(flex: 1),
            Padding(
              padding: EdgeInsets.only(left: 5.0),
              child: Icon(
                CupertinoIcons.tram_fill,
                color: Styles.secondaryColor,
              ),
            ),
            Spacer(flex: 1),
            Padding(
              padding: EdgeInsets.only(left: 5.0),
              child: Text(
                '$end', //end station
                style: TextStyle(
                    color: Styles.primaryColor, fontWeight: FontWeight.bold),
              ),
            ),
            Spacer(flex: 1),
          ],
        ),
        Padding(
          padding: const EdgeInsets.only(top: 25.0),
          child: Column(
            // crossAxisAlignment: CrossAxisAlignment.center,
            // mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              ticketDetailsWidget('Type', "$type", 'Month',
                  '$month'), //ticket niumber,journey date
            ],
          ),
        ),

        // const Padding(
        //   padding: EdgeInsets.only(top: 10.0, left: 75.0, right: 75.0),
        //   child: Text(
        //     '0000 +9230 2884 5163',
        //     style: TextStyle(
        //       color: Colors.black,
        //     ),
        //   ),
        // ),
        // const SizedBox(height: 30),
        // const Text('         Developer: instagram.com/DholaSain')
      ],
    );
  }
}

Widget ticketDetailsWidget(String firstTitle, String firstDesc,
    String secondTitle, String secondDesc) {
  return Row(
    mainAxisAlignment: MainAxisAlignment.spaceBetween,
    children: [
      Padding(
        padding: const EdgeInsets.only(left: 12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              firstTitle,
              style: const TextStyle(color: Colors.grey),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 4.0),
              child: Text(
                firstDesc,
                style: const TextStyle(color: Colors.black),
              ),
            )
          ],
        ),
      ),
      // Spacer(),
      Padding(
        padding: const EdgeInsets.only(right: 12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              secondTitle,
              style: const TextStyle(color: Colors.grey),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 4.0),
              child: Text(
                secondDesc,
                style: const TextStyle(color: Colors.black),
              ),
            )
          ],
        ),
      )
    ],
  );
}
