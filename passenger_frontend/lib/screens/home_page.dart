import 'package:flutter/material.dart';

import 'login.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Digital Wallet'),
        backgroundColor: const Color(0xFF3D50AC), // Use the primary color here
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Expanded(
          //   flex: 2,
          //   child: Container(
          //     color: Colors.white,
          //     child: Column(
          //       crossAxisAlignment: CrossAxisAlignment.start,
          //       children: [
          //         Expanded(
          //           child: Container(
          //             color: const Color(0xFF3D50AC),
          //           ),
          //         ),
          //       ],
          //     ),
          //   ),
          // ),
          Expanded(
            flex: 3,
            child: Container(
              color: Colors.white,
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Card(
                    color: Color(0xFFFA6F5D),
                    child: Padding(
                      padding: EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Current Balance',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 18,
                            ),
                          ),
                          SizedBox(height: 10),
                          Text(
                            '\$500.00',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 30,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 80,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        Column(
                          children: [
                            Icon(
                              Icons.account_balance_wallet,
                              size: 30,
                              color: Color(0xFF3D50AC),
                            ),
                            Text('Topup Wallet'),
                          ],
                        ),
                        Column(
                          children: [
                            Icon(
                              Icons.show_chart,
                              size: 30,
                              color: Color(0xFF3D50AC),
                            ),
                            Text('Statistics'),
                          ],
                        ),
                        Column(
                          children: [
                            Icon(
                              Icons.history,
                              size: 30,
                              color: Color(0xFF3D50AC),
                            ),
                            Text('History'),
                          ],
                        ),
                        Column(
                          children: [
                            Icon(
                              Icons.settings,
                              size: 30,
                              color: Color(0xFF3D50AC),
                            ),
                            Text('Settings'),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Transaction History',
                    style: TextStyle(
                      color: Color(0xFF3D50AC),
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                    ),
                  ),
                  Expanded(
                    child: ListView.builder(
                      itemCount: 5, // Replace with the actual number of transactions
                      itemBuilder: (context, index) {
                        return Card(
                          elevation: 2,
                          child: ListTile(
                            title: Text('Transaction Name $index'),
                            subtitle: Text('Date: ${DateTime.now().toString()}'),
                            trailing: const Text('\$50.00'),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
