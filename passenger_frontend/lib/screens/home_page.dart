import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/screens/bottom_bar.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: HomeContent(),
      bottomNavigationBar: BottomBar(),
    );
  }
}

class HomeContent extends StatelessWidget {
  const HomeContent({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
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
                width: 350,
                height: 400,
                decoration: BoxDecoration(
                  color: Styles.backgroundColor,
                  borderRadius: BorderRadius.circular(20),
                ),
                padding: const EdgeInsets.all(16.0),
                child: const Column(
                  children: [
                    Row(
                      children: [
                        Icon(Icons.location_on_outlined),
                        Gap(10),
                        Expanded(
                          child: TextField(
                            decoration:
                            InputDecoration(labelText: 'Start Station'),
                          ),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        Icon(Icons.location_on),
                        Gap(10),
                        Expanded(
                          child: TextField(
                            decoration:
                            InputDecoration(labelText: 'End Station'),
                          ),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        Icon(Icons.edit_calendar_outlined),
                        Gap(10),
                        Expanded(
                          child: TextField(
                            decoration:
                            InputDecoration(labelText: 'Journey Date'),
                          ),
                        ),
                      ],
                    ),
                    Column(
                      children: [
                        TextField(
                          decoration:
                          InputDecoration(labelText: 'Field 1'),
                        ),
                        TextField(
                          decoration:
                          InputDecoration(labelText: 'Field 2'),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}