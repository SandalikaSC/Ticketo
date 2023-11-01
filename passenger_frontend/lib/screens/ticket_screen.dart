import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/screens/seasonPage.dart';
import 'package:passenger_frontend/services/ticket_service.dart';
import 'package:passenger_frontend/widgets/Normalticket.dart';
import 'package:passenger_frontend/widgets/shortdetail.dart';
import 'package:ticket_widget/ticket_widget.dart';

class TicketScreen extends StatefulWidget {
  const TicketScreen({Key? key}) : super(key: key);

  @override
  State<TicketScreen> createState() => TicketScreenState();
}

class TicketScreenState extends State<TicketScreen> {
  List<dynamic> tickets = [];
  bool isLoading = false;
  final TicketService ticketService = TicketService();

  @override
  void initState() {
    super.initState();
    fetchTickets();
  }

  Future<void> fetchTickets() async {
    setState(() {
      isLoading = true;
    });
    try {
      final response = await ticketService.getAllTickets();
      final responseData = json.decode(response.body);

      if (response.statusCode == 200) {
        final List<dynamic> responseData = json.decode(response.body);

        setState(() {
          tickets = responseData;
        });
      } else {
        // Handle error
        print('Failed to fetch tickets');
      }
    } catch (e) {
      print(e);
    } finally {
      // Hide loading indicator here
      setState(() {
        isLoading = false;
      });
    }
  }

  void _showTicketDetails(BuildContext context, Map<String, dynamic> ticket) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        var qrCode = List<int>.from(ticket['qrcode']['data']);
        return AlertDialog(
          backgroundColor: Colors.transparent,
          content: Center(
            child: TicketWidget(
              width: 550,
              height: 600,
              isCornerRounded: true,
              padding: EdgeInsets.only(top: 0, left: 20, right: 20),
              child: TicketData(
                  ticketNo: ticket['ticketNumber'],
                  classname: ticket['className'],
                  date: ticket['journeybeginDate'],
                  end: ticket['end'],
                  start: ticket['start'],
                  passengers: ticket['noOfPassengers'],
                  ticketType: ticket['ticketType'],
                  status: ticket['journeyStatus'],
                  tripType: ticket['tripType'],
                  qrCodeData: qrCode),
            ),
          ),
          actions: [
            Container(
              alignment: Alignment.center,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pop(); // Close the popup
                },
                style: ElevatedButton.styleFrom(
                  primary: Colors.red, // Set button color to red
                  shape: RoundedRectangleBorder(
                    borderRadius:
                        BorderRadius.circular(20), // Change border radius
                  ),
                ),
                child: Text(
                  'Close',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
          ],
        );

        // return AlertDialog(
        //   title: Text('Ticket Details'),
        //   content: Column(
        //     mainAxisSize: MainAxisSize.min,
        //     crossAxisAlignment: CrossAxisAlignment.start,
        //     children: [
        //       Text('Start: ${ticket['start']}'),
        //       Text('End: ${ticket['end']}'),
        //       // ... add more details as needed
        //     ],
        //   ),
        //   actions: [
        //     TextButton(
        //       onPressed: () {
        //         Navigator.of(context).pop();
        //       },
        //       child: Text('Close'),
        //     ),
        //   ],
        // );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          automaticallyImplyLeading: false,
          elevation: 0, // Removes the back button
          title: Padding(
            padding: const EdgeInsets.only(top: 20.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  CupertinoIcons.tickets, // Replace with your desired icon
                  color: Styles.primaryColor, // Blue icon color
                ),
                const SizedBox(
                    width: 8), // Add some spacing between icon and text
                Text(
                  "My Tickets",
                  style:
                      TextStyle(color: Styles.primaryColor), // Blue title color
                ),
              ],
            ),
          ),
          centerTitle: true, // Center aligns the title
          backgroundColor: Colors.white, // White background
          bottom: TabBar(
            indicatorWeight: 2,
            labelPadding: EdgeInsets.symmetric(vertical: 0),
            indicatorColor: Styles.secondaryColor, // Red underline color
            labelColor: Styles
                .secondaryColor, // Change the selected tab's text and icon color to secondaryColor
            unselectedLabelColor:
                Styles.primaryColor, // Color for unselected tab text
            tabs: [
              Tab(
                // icon: Icon(
                //   Icons.chat_bubble,
                // ),
                child: Text(
                  "Normal",
                  style:
                      TextStyle(color: Styles.primaryColor), // Blue text color
                ),
              ),
              Tab(
                // icon: Icon(
                //   Icons.video_call,
                // ),
                child: Text(
                  "Reservations",
                  style:
                      TextStyle(color: Styles.primaryColor), // Blue text color
                ),
              ),
              Tab(
                // icon: Icon(
                //   Icons.settings,
                // ),
                child: Text(
                  "Seasons",
                  style:
                      TextStyle(color: Styles.primaryColor), // Blue text color
                ),
              )
            ],
          ),
        ),
        body: TabBarView(
          children: [
            Center(
              child: isLoading
                  ? CircularProgressIndicator() // Show loading indicator
                  : SingleChildScrollView(
                      child: Column(
                        children: tickets.map((ticket) {
                          return GestureDetector(
                            onTap: () {
                              _showTicketDetails(context, ticket);
                            },
                            child: shortdetailTicket(
                                start: ticket['start'],
                                end: ticket['end'],
                                classname: ticket['className'],
                                passengers: ticket['noOfPassengers'],
                                price: ticket['price'].toDouble(),
                                status: ticket['journeyStatus'],
                                ticketNo: ticket['ticketNumber'],
                                tripType: ticket['tripType']),
                          );
                        }).toList(),
                      ),
                    ),
            ),
            Center(
              child: Column(
                children: tickets.map((ticket) {
                  return GestureDetector(
                    onTap: () {
                      _showTicketDetails(context, ticket);
                    },
                    child: shortdetailTicket(
                        start: ticket['start'],
                        end: ticket['end'],
                        classname: ticket['className'],
                        passengers: ticket['noOfPassengers'],
                        price: ticket['price'].toDouble(),
                        status: ticket['journeyStatus'],
                        ticketNo: ticket['ticketNumber'],
                        tripType: ticket['tripType']),
                  );
                }).toList(),
              ),

            ),
            Center(
              child: SeasonPage(),
            ),
          ],
        ),
      ),
    );
  }
}
