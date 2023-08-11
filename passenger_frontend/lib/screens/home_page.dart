
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:intl/intl.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final TextEditingController _startStationController = TextEditingController();
  final TextEditingController _endStationController = TextEditingController();
  final TextEditingController _startDateController = TextEditingController();
  final TextEditingController _endDateController = TextEditingController();

  Future<DateTime?> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );

    if (picked != null && picked != DateTime.now()) {
      return picked;;

    }
    return null;
  }

  Form buildTripForm() {
    return  Form(
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(30),
          border: Border.all(color: Styles.primaryColor), // Border color
        ),
        padding: EdgeInsets.all(15),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,

          children: [
            ToggleButtonGroup(),
            Gap(10),
            TextFormField(
              controller: _startStationController,
              style: TextStyle(fontFamily: 'Poppins'),

              decoration: InputDecoration(
                labelText: 'From',
              ),
            ),
            TextFormField(
              controller: _endStationController,
              style: TextStyle(fontFamily: 'Poppins'),

              decoration: InputDecoration(
                labelText: 'To'  ),


            ),
            Row(
              children: [
                Flexible(
                  child:  TextFormField(
                    controller: _startDateController,
                    readOnly: true,
                    onTap: () async {
                      final selectedDate = await _selectDate(context);
                      if (selectedDate != null) {
                        setState(() {
                          _startDateController.text =
                              DateFormat('dd MMM yyyy').format(selectedDate);
                        });
                      }
                    },
                    decoration: InputDecoration(
                      labelText: 'Depature',
                      suffixIcon: Icon(Icons.calendar_today),
                    ),
                  ),
                ),
                SizedBox(width: 10),
                Flexible(
                  child:  TextFormField(
                    controller: _endDateController,
                    readOnly: true,
                    onTap: () async {
                      final selectedDate = await _selectDate(context);
                      if (selectedDate != null) {
                        setState(() {
                          _endDateController.text =
                              DateFormat('dd MMM yyyy').format(selectedDate);
                        });
                      }
                    },
                    decoration: InputDecoration(
                      labelText: 'Return',
                      suffixIcon: Icon(Icons.edit_calendar_rounded),
                    ),
                  ),
                  ),
              ],
            ),
            Row(
              children: [
                Flexible(
                  child: TextFormField(
                    decoration: InputDecoration(labelText: 'Number of Passengers'),
                    keyboardType: TextInputType.number,
                  ),
                ),
                SizedBox(width: 10),
                Flexible(
                  child: DropdownButtonFormField<String>(
                    decoration: InputDecoration(labelText: 'Class'),
                    items: ['First Class', 'Second Class', 'Third Class'].map((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(value),
                      );
                    }).toList(),
                    onChanged: (value) {
                      // Handle selected class
                    },
                  ),
                ),
              ],
            ),
            SizedBox(height: 20),
           Row(
             mainAxisAlignment: MainAxisAlignment.spaceEvenly,
             children: [

               Expanded(
                 child: ElevatedButton(
                   onPressed: () {
                     // Handle search train button click
                   },
                   style: ElevatedButton.styleFrom(
                     backgroundColor: Styles.primaryColor, // Background color
                     onPrimary: Colors.white, // Text color
                     shape: RoundedRectangleBorder(
                       borderRadius: BorderRadius.circular(30), // Button border radius
                     ),
                   ),
                   child: Text('Search Train',style: TextStyle(fontFamily: "Poppins")),
                 ),
               ),
               SizedBox(width: 10), // Add spacing between buttons
               ElevatedButton(
                 onPressed: () {
                   // Handle quick ticket button click
                 },
                 style: ElevatedButton.styleFrom(
                   backgroundColor: Colors.white, // Background color
                   onPrimary: Colors.white, // Text color
                   shape: RoundedRectangleBorder(
                     borderRadius: BorderRadius.circular(30),
                       side: BorderSide(color:Styles.secondaryColor)
                     // Button border radius
                   ),
                 ),
                 child: Text('Quick ticket',style: TextStyle(fontFamily: "Poppins",color: Styles.secondaryColor)),
               ),
             ],
           )
          ],
        ),
      ),
    );
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          child: Column(
            // crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                decoration: const BoxDecoration(
                    color: Styles.primaryColor,
                    borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(20),
                        bottomRight: Radius.circular(820))),
                width: double.infinity,
                height: 200,
                child: Column(
                  children: [
                    const Gap(85),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Container(
                          width: 70,
                          height: 70,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(30),
                            image: const DecorationImage(
                              fit: BoxFit.cover,
                              image: AssetImage(
                                  "assets/images/profile_picture.jpg"),
                            ),
                          ),
                        ),
                        Gap(40),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "${getGreeting()}!👋",
                              style: Styles.headWhite,
                            ),
                            const Gap(5),
                            Text(
                              "Sandalika Chamari",
                              style: Styles.headWhite,
                            )
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              // Gap(30),
              Padding(
                  padding: EdgeInsets.only(right: 18),
                  child: Container(
                    alignment: Alignment.topRight,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text("Let's book",
                            style: TextStyle(
                                fontSize: 18,
                                color: Styles.primaryColor,
                                fontFamily: "Poppins",
                                fontWeight: FontWeight.w500,
                                fontStyle: FontStyle.normal)),
                        Text("your next journey",
                            style: TextStyle(
                                fontSize: 28,
                                color: Styles.primaryColor,
                                fontFamily: "Poppins",
                                fontWeight: FontWeight.w500,
                                fontStyle: FontStyle.normal)),
                      ],
                    ),
                  )),
              Gap(20),
               Container(
                // color: Colors.blueGrey,
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  children: [
                    buildTripForm(),
                    ///add form here
                  ],
                ),
              ),



              //add form here
            ],
          ),
        ),
      ),
    );
  }
}

class ToggleButtonGroup extends StatefulWidget {
  @override
  _ToggleButtonGroupState createState() => _ToggleButtonGroupState();
}

class _ToggleButtonGroupState extends State<ToggleButtonGroup> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return ToggleButtons(
      isSelected: [_selectedIndex == 0, _selectedIndex == 1],
      onPressed: (index) {
        setState(() {
          _selectedIndex = index;
        });
      },
      children: [
        IconTextToggleButton(
          icon: Icons.arrow_circle_right_outlined,
          label: 'One-way',
          isSelected: _selectedIndex == 0,
        ),
        IconTextToggleButton(
          icon: Icons.compare_arrows_sharp,
          label: 'Round trip',
          isSelected: _selectedIndex == 1,
        ),
      ],
      borderRadius: BorderRadius.circular(30),
      // fillColor: Styles.primaryColor,
      // selectedColor: Colors.white,
      // color: Styles.primaryColor,
      // selectedBorderColor: Styles.primaryColor,
      // borderWidth: 2,
    );
  }
}

class IconTextToggleButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isSelected;

  const IconTextToggleButton({
    required this.icon,
    required this.label,
    required this.isSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      // color: Colors.blueGrey,
      padding: EdgeInsets.only(right: 8),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        // color: isSelected ? Styles.secondaryColor : Colors.transparent,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              // color: isSelected ? Colors.white : Styles.primaryColor,
            ),
            padding: EdgeInsets.all(8),
            child: Icon(
              icon,
              color: Styles.primaryColor,
            ),
          ),
          SizedBox(width: 5),
          Text(
            label,
            style: TextStyle(
              color: Styles.primaryColor,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}

String _formatTimeWithAMPM(TimeOfDay time) {
  final now = DateTime.now();
  final selectedDateTime =
      DateTime(now.year, now.month, now.day, time.hour, time.minute);
  final format = DateFormat('hh:mm a'); // Use a custom format
  return format.format(selectedDateTime);
}

String getGreeting() {
  var hour = DateTime.now().hour;

  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 17) {
    return "Good Afternoon";
  } else {
    return "Good Night";
  }
}
