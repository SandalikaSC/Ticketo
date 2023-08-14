import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:intl/intl.dart';
import 'package:passenger_frontend/constants/app_styles.dart';

class WalletPage extends StatelessWidget {
  const WalletPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.only(
              top: 90.0,
              left: 20.0,
              right: 20.0,
              // bottom: 10.0
            ), // Set the desired margin values
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // const SizedBox(width: 30.0),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Hello,', // Replace this with your desired text
                                style: TextStyle(
                                  color: Colors.black45,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 24,
                                ),
                              ),
                              SizedBox(height: 8.0),
                              Text(
                                'Sandalika Chamari', // Replace this with the user's name
                                style: TextStyle(
                                  color: Color(0xFF3D50AC),
                                  fontWeight: FontWeight.bold,
                                  fontSize: 20,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          CircleAvatar(
                            // Replace this with the user's profile picture
                            backgroundImage:
                                AssetImage('assets/images/profile_picture.jpg'),
                            radius: 30,
                          ),
                          SizedBox(width: 10),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
                // SizedBox(
                //   height: 150, // Set the desired height here
                //   child: Card(
                //     color: const Color(0xFFFA6F5D),
                //     shape: RoundedRectangleBorder(
                //       borderRadius: BorderRadius.circular(12.0),
                //     ),
                //     // child: Padding(
                //     //   padding: const EdgeInsets.all(20.0),
                //     child: Row(
                //       mainAxisAlignment: MainAxisAlignment.spaceBetween,
                //       children: [
                //         const Column(
                //           mainAxisAlignment: MainAxisAlignment
                //               .center, // Center the children vertically
                //           crossAxisAlignment: CrossAxisAlignment.start,
                //           children: [
                //             Text(
                //               'Current Balance',
                //               style: TextStyle(
                //                 color: Colors.white,
                //                 fontWeight: FontWeight.bold,
                //                 fontSize: 22,
                //               ),
                //             ),
                //             SizedBox(height: 10),
                //             Text(
                //               'Rs:2000.00',
                //               style: TextStyle(
                //                 color: Colors.white,
                //                 fontWeight: FontWeight.bold,
                //                 fontSize: 26,
                //               ),
                //             ),
                //           ],
                //         ),
                //         const SizedBox(width: 10),
                //         Column(
                //           mainAxisAlignment: MainAxisAlignment.end,
                //           children: [
                //             ElevatedButton(
                //               onPressed: () {
                //                 // Add your topup wallet logic here
                //               },
                //               style: ElevatedButton.styleFrom(
                //                 primary: const Color(0xFF3D50AC),
                //                 shape: RoundedRectangleBorder(
                //                   borderRadius: BorderRadius.circular(20),
                //                 ),
                //               ),
                //               child: const Row(
                //                 mainAxisSize: MainAxisSize.min,
                //                 children: [
                //                   Text(
                //                     'Top Up Wallet ',
                //                     style: TextStyle(
                //                       color: Colors.white,
                //                       fontWeight: FontWeight.bold,
                //                       fontSize: 16,
                //                     ),
                //                   ),
                //                   Icon(
                //                     Icons.arrow_outward,
                //                     color: Colors.white,
                //                   ),
                //                 ],
                //               ),
                //             ),
                //           ],
                //         ),
                //       ],
                //     ),
                //   ),
                // ),
                Center(
                  child: Container(
                    width: 300,
                    decoration: BoxDecoration(
                      border: Border.all(color: Styles.secondaryColor),
                      borderRadius: BorderRadius.circular(40),
                      // color: Styles.secondaryColor
                    ),
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(12.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.monetization_on,
                                size: 64,
                                color: Styles.secondaryColor,
                              ),
                              SizedBox(height: 8),
                              Text(
                                ' \Rs.100',
                                style: TextStyle(
                                    fontSize: 30,
                                    fontWeight: FontWeight.bold,
                                    color: Styles.secondaryColor,
                                    fontFamily: "Poppins"),
                              ),
                            ],
                          ),
                        ),
                        Divider(
                          color: Styles.secondaryColor,
                          thickness: 1,
                        ),
                        Padding(
                          padding: const EdgeInsets.all(12.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Text(
                                    'Hold Value',
                                    style: TextStyle(
                                        fontSize: 16,
                                        color: Styles.primaryColor),
                                  ),
                                  SizedBox(height: 8),
                                  Text('Rs.75',
                                      style: TextStyle(
                                          fontSize: 20,
                                          fontWeight: FontWeight.bold,
                                          color: Styles.primaryColor)),
                                ],
                              ),
                              Divider(),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Text(
                                    'Balance',
                                    style: TextStyle(
                                        fontSize: 16,
                                        color: Styles.primaryColor),
                                  ),
                                  SizedBox(height: 8),
                                  Text('Rs.25',
                                      style: TextStyle(
                                          fontSize: 20,
                                          fontWeight: FontWeight.bold,
                                          color: Styles.primaryColor)),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          Gap(15),
          Expanded(
            flex: 3,
            child: Container(
              // color: Colors.white,
              // padding: const EdgeInsets.all(10),
              padding:
                  const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  SizedBox(
                    height: 100,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Center(
                          child: Column(
                            children: [
                              Container(
                                width: 60,
                                height: 60,
                                decoration: const BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: Styles.secondaryColor,
                                ),
                                child: IconButton(
                                  onPressed: () {
                                    // Add your topup wallet logic here
                                  },
                                  icon: const Icon(
                                    Icons.arrow_outward,
                                    size: 40,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                              const Text('Topup Wallet'),
                            ],
                          ),
                        ),
                        Column(
                          children: [
                            Container(
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xFF3D50AC),
                              ),
                              child: IconButton(
                                onPressed: () {
                                  // Add your statistics logic here
                                },
                                icon: const Icon(
                                  Icons.show_chart,
                                  size: 30,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                            const Text('Statistics'),
                          ],
                        ),
                        Column(
                          children: [
                            Container(
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xFF3D50AC),
                              ),
                              child: IconButton(
                                onPressed: () {
                                  // Add your history logic here
                                },
                                icon: const Icon(
                                  Icons.history,
                                  size: 30,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                            const Text('History'),
                          ],
                        ),
                        // Column(
                        //   children: [
                        //     Container(
                        //       decoration: const BoxDecoration(
                        //         shape: BoxShape.circle,
                        //         color: Color(0xFF3D50AC),
                        //       ),
                        //       child: IconButton(
                        //         onPressed: () {
                        //           // Add your settings logic here
                        //         },
                        //         icon: const Icon(
                        //           Icons.settings,
                        //           size: 30,
                        //           color: Colors.white,
                        //         ),
                        //       ),
                        //     ),
                        //     const Text('Settings'),
                        //   ],
                        // ),
                      ],
                    ),
                  ),
                  Gap(10),
                  // const SizedBox(height: 10),
                  const Text(
                    'Recent activity',
                    style: TextStyle(
                      color: Color(0xFF3D50AC),
                      // color:Colors.black,
                      fontWeight: FontWeight.bold,
                      fontFamily: "Poppins",
                      fontSize: 20,
                    ),
                  ),
                  Expanded(
                    // Add horizontal padding here
                    child: ListView.builder(
                      itemCount:
                          3, // Replace with the actual number of transactions
                      itemBuilder: (context, index) {
                        return ClipRRect(
                          // Wrap Card with ClipRRect for border radius

                          borderRadius: BorderRadius.circular(
                              50.0), // Set the desired border radius
                          child: Card(
                            // elevation: 2,
                            color: Colors.white,
                            child: Padding(
                              padding: const EdgeInsets.all(20.0),
                              child: Row(
                                children: [
                                  const Icon(
                                    CupertinoIcons.ticket,
                                    size: 30,
                                    // color: Color(0xFFFA6F5D),
                                    color: Colors.grey,
                                  ),
                                  const SizedBox(width: 20),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        const Text(
                                          'Normal Ticket',
                                          style: TextStyle(
                                            fontFamily: "poppins",
                                            color: Color.fromARGB(255, 91, 88,
                                                88), // Change the color as desired
                                            fontWeight: FontWeight
                                                .bold, // Bold the text
                                            fontSize:
                                                16, // Increase the font size as desired
                                          ),
                                        ),
                                        Text(
                                          '${DateFormat('yyyy-MM-dd HH:mm').format(DateTime.now())}',
                                          style: const TextStyle(
                                            fontFamily: "poppins",
                                            color: Colors.black38,
                                            fontWeight: FontWeight.w500,
                                            fontSize: 13,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  const Text(
                                    'Rs 500.00',
                                    style: TextStyle(
                                      fontFamily: "poppins",
                                      color: Color(0xFF3D50AC),
                                      fontWeight: FontWeight.bold,
                                      fontSize: 18,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
