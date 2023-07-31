import 'package:flutter/material.dart';

class FinePage extends StatelessWidget {
  static const routeName = '/fine';

  const FinePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<User> users = [
      User(name: 'Kaveesha Gimhani', id: '997799550V', fineAmount: 950.00),
      User(name: 'John Doe', id: '123456789X', fineAmount: 750.50),
      User(name: 'Jane Smith', id: '987654321Y', fineAmount: 500.25),
      User(name: 'Alex Johnson', id: '456789123Z', fineAmount: 1200.75),
      User(name: 'Sarah Williams', id: '654321987W', fineAmount: 300.00),
    ];

    return Scaffold(
      body: Container(
        padding: const EdgeInsets.all(5),
        child: Column(
          children: [
            Container(
              margin: const EdgeInsets.all(8),
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: const Color(0xFFECEEF6),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(
                  color: const Color(0xFF3D51A9),
                ),
              ),
              child: SizedBox(
                height: 60,
                child: Row(
                  children: [
                    Expanded(
                      child: Image.asset(
                        'assets/icons/money.png', // Replace with the path to your image file
                        width: 100,
                        height: 100,
                      ),
                    ),
                    const SizedBox(width: 8),
                    const Expanded(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Today',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 4),
                          Text(
                            'Wednesday 24th',
                            style: TextStyle(
                              color: Color(0xFF3D51A9),
                              fontSize: 15,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 24),
                    const Expanded(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Rs: 5670.00',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.all(8),
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: const Color(0xFFECEEF6),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(
                  color: const Color(0xFF3D51A9),
                ),
              ),
              child: SizedBox(
                height: 60,
                child: Row(
                  children: [
                    Expanded(
                      child: Image.asset(
                        'assets/icons/send_money.png', // Replace with the path to your image file
                        width: 100,
                        height: 100,
                      ),
                    ),
                    const SizedBox(width: 8),
                    const Expanded(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'To be Paid',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 4),
                          Text(
                            'Some Text',
                            style: TextStyle(
                              color: Color(0xFF3D51A9),
                              fontSize: 15,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 24),
                    const Expanded(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Rs: 1234.00',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 10),
            Container(
              alignment: Alignment.centerLeft,
              margin: const EdgeInsets.symmetric(horizontal: 16),
              child: const Text(
                'Latest Fines',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),

            Expanded(
              child: ListView.builder(
                itemCount: users.length,
                itemBuilder: (context, index) {
                  User user = users[index];
                  return Card(
                    margin: const EdgeInsets.all(8),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                      side: const BorderSide(
                        color: Color(0xFF3D51A9),
                      ),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(15),
                      child: Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  user.name,
                                  style: const TextStyle(
                                    color: Colors.black,
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  user.id,
                                  style: const TextStyle(
                                    color: Colors.grey,
                                    fontSize: 14,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                'Rs. ${user.fineAmount.toStringAsFixed(2)}',
                                style: const TextStyle(
                                  color: Color(0xFFFA6F5D),
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class User {
  final String name;
  final String id;
  final double fineAmount;

  User({
    required this.name,
    required this.id,
    required this.fineAmount,
  });
}
