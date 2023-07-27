import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:passenger_frontend/constants/app_styles.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start, // Add this line
            children: [
              Expanded(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  color: Styles.primaryColor,
                  child: Column(
                    children: [
                      const Gap(85),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(30),
                              image: const DecorationImage(
                                fit: BoxFit.cover,
                                image: AssetImage(
                                    "assets/images/profile_picture.jpg"),
                              ),
                            ),
                          ),
                          const Gap(20),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Good Morning! 👋",
                                style: Styles.headWhite,
                              ),
                              const Gap(5),
                              Text(
                                "John Doe",
                                style: Styles.headWhite,
                              )
                            ],
                          ),
                          Container(
                            width: 150, // Adjust the width as needed
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Padding(
                              padding:const EdgeInsets.symmetric(horizontal: 16),
                              child: ElevatedButton(
                                onPressed: () {
                                  // Add your onPressed function here
                                },
                                style: ButtonStyle(
                                  backgroundColor:
                                      MaterialStateProperty.all<Color>(
                                          Colors.transparent),
                                  // No color background
                                  shape: MaterialStateProperty.all<
                                      RoundedRectangleBorder>(
                                    RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(20),
                                      // Rounded corner border
                                      side: const BorderSide(
                                          color: Colors
                                              .white), // White border color
                                    ),
                                  ),
                                ),
                                child: const Text(
                                  'Login',
                                  style: TextStyle(
                                    color: Styles.textColor1,
                                    fontStyle: FontStyle.normal,
                                  ),
                                ),
                              ),
                            ),
                          )
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              Expanded(
                child: Container(
                  color: Styles.backgroundColor2,
                ),
              ),
            ],
          ),
          SizedBox(
            height: 400, // Set the height as needed
            child: Align(
              alignment: Alignment.topCenter,
              child: FractionalTranslation(
                translation: const Offset(0, 0.45),
              child: Container(
                width: 350, // Set the width of the child container
                height: 400, // Set the height of the child container
                decoration: BoxDecoration(
                  color: Styles.backgroundColor, // Customize the color and opacity of the layer
                  borderRadius: BorderRadius.circular(20), // Add rounded corner border if needed
                ),
                child: const Center(
                  child: Text(
                    'Aligned Container',
                    style: TextStyle(color: Colors.black),
                  ),
                ),
              ),),
            ),
          ),
        ],
      ),
    );
  }
}
