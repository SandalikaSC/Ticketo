import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/widgets/shortdetail.dart';

class TicketScreen extends StatefulWidget {
  const TicketScreen({Key? key}) : super(key: key);

  @override
  State<TicketScreen> createState() => TicketScreenState();
}

class TicketScreenState extends State<TicketScreen> {
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
        body: const TabBarView(
          children: [
            Center(
                child: Column(
              children: [
                // shortdetailTicket(),
              ],
            )),
            Center(
              child: Text("Reservations"),
            ),
            Center(
              child: Text("Seasons"),
            ),
          ],
        ),
      ),
    );
  }
}
