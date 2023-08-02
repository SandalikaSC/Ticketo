import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 50.0, left: 20.0, right: 20.0,bottom:10.0), // Set the desired margin values
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(width: 30.0),
                const Row(
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
                              'Motta Sandalika', // Replace this with the user's name
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
                          backgroundImage: AssetImage('assets/images/profile_picture.jpg'),
                          radius: 30,
                        ),
                        SizedBox(width: 10),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                SizedBox(
                  height: 150, // Set the desired height here
                  child: Card(
                    color: const Color(0xFFFA6F5D),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12.0),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Column(
                            mainAxisAlignment: MainAxisAlignment.center, // Center the children vertically
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Current Balance',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 22,
                                ),
                              ),
                              SizedBox(height: 10),
                              Text(
                                'Rs:2000.00',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 26,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(width: 10),
                          Column(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              ElevatedButton(
                                onPressed: () {
                                  // Add your topup wallet logic here
                                },
                                style: ElevatedButton.styleFrom(
                                  primary: const Color(0xFF3D50AC),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                ),
                                child: const Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Text(
                                      'Top Up Wallet ',
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 16,
                                      ),
                                    ),
                                    Icon(
                                      Icons.arrow_outward,
                                      color: Colors.white,
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                )

              ],
            ),
          ),

          Expanded(
            flex: 3,
            child: Container(
              color: Colors.white,
              // padding: const EdgeInsets.all(10),
              padding: const EdgeInsets.only(top:10.0,left: 20.0, right: 20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  SizedBox(
                    height: 80,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        Column(
                          children: [
                            Container(
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xFF3D50AC),
                              ),
                              child: IconButton(
                                onPressed: () {
                                  // Add your topup wallet logic here
                                },
                                icon: const Icon(
                                  Icons.account_balance_wallet,
                                  size: 30,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                            const Text('Topup Wallet'),
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
                        Column(
                          children: [
                            Container(
                              decoration: const BoxDecoration(
                                shape: BoxShape.circle,
                                color: Color(0xFF3D50AC),
                              ),
                              child: IconButton(
                                onPressed: () {
                                  // Add your settings logic here
                                },
                                icon: const Icon(
                                  Icons.settings,
                                  size: 30,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                            const Text('Settings'),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 10),
                  const Text(
                    'Transaction History',
                    style: TextStyle(
                      color: Color(0xFF3D50AC),
                      // color:Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                    ),
                  ),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only( ), // Add horizontal padding here
                      child: ListView.builder(
                        itemCount: 5, // Replace with the actual number of transactions
                        itemBuilder: (context, index) {
                          return ClipRRect( // Wrap Card with ClipRRect for border radius
                            borderRadius: BorderRadius.circular(32.0), // Set the desired border radius
                            child: Card(
                              elevation: 2,
                              color: Colors.white,
                              child: Padding(
                                padding: const EdgeInsets.all(20.0),
                                child: Row(
                                  children: [
                                    const Icon(
                                      Icons.account_balance_wallet,
                                      size: 30,
                                      // color: Color(0xFFFA6F5D),
                                      color:Colors.grey,
                                    ),
                                    const SizedBox(width: 20),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          const Text(
                                            'Normal Ticket',
                                            style: TextStyle(
                                              color: Colors.black, // Change the color as desired
                                              fontWeight: FontWeight.bold, // Bold the text
                                              fontSize: 18, // Increase the font size as desired
                                            ),
                                          ),
                                          Text(
                                            'Date: ${DateFormat('yyyy-MM-dd HH:mm').format(DateTime.now())}',
                                            style: const TextStyle(
                                              color: Colors.black38,
                                              fontWeight: FontWeight.w500,
                                              fontSize: 16,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    const Text(
                                      'Rs:500.00',
                                      style: TextStyle(
                                        color: Color(0xFF3D50AC),
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          );
                        },
                      ),
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

void main() {
  runApp(const MaterialApp(
    home: HomePage(),
  ));
}
