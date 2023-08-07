import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:passenger_frontend/constants/app_styles.dart';
import 'package:passenger_frontend/screens/login.dart';
import 'package:passenger_frontend/services/user_service.dart';
import 'package:passenger_frontend/utils/error_handler.dart';
import 'package:passenger_frontend/widgets/CustomTextField.dart';

class SignupPage extends StatefulWidget {
  const SignupPage({Key? key}) : super(key: key);

  @override
  _SignupPageState createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  int _currentStep = 0;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final GlobalKey<FormState> _formKey2 = GlobalKey<FormState>();

  final UserService userService = UserService();
  String firstName = '';
  String lastName = '';
  String phoneNumber = '';
  String nic = '';

  String email = '';
  String password = '';

  String? isStrongPassword(String password) {
    if (password.isEmpty) {
      return 'Please enter password.';
    }
    if (password.length < 8) {
      return 'Password must contain at least 8 characters'; // Password should have a minimum length of 8 characters.
    }

    if (!password.contains(RegExp(r'[A-Z]'))) {
      return "Password should contain at least one uppercase letter"; // Password should contain at least one uppercase letter.
    }

    if (!password.contains(RegExp(r'[a-z]'))) {
      return "Password should contain at least one lowercase letter"; // Password should contain at least one lowercase letter.
    }

    if (!password.contains(RegExp(r'[0-9]'))) {
      return "Password should contain at least one digit"; // Password should contain at least one digit.
    }

    return null; // Password meets all criteria and is considered strong.
  }

  String? validateNIC(String? value) {
    if (value == null || value.isEmpty) {
      return 'Please enter your NIC number.';
    }

    // Validate the format for both new 12-digit and old 9-digit formats
    final validNICFormat = RegExp(r'^\d{9}([Vv]|(?:\d{3}))$');
    if (!validNICFormat.hasMatch(value)) {
      return 'Invalid NIC format. Must be in the format: xxxxxxxxxV or xxxxxxxxxxxx';
    }

    // Validate the checksum for 9-digit NIC
    if (value.length == 9) {
      final intNIC = int.tryParse(value.substring(0, 9));
      final intCheckDigit = _getCheckDigit(value);
      if (intNIC == null ||
          intCheckDigit == null ||
          intNIC % 11 != intCheckDigit) {
        return 'Invalid NIC number.';
      }
    }

    return null;
  }

// Function to calculate the check digit from the NIC number
  int? _getCheckDigit(String nic) {
    final checkDigitChar = nic.substring(9).toUpperCase();
    if (checkDigitChar == 'V') {
      return 10;
    } else {
      return int.tryParse(checkDigitChar);
    }
  }

  String? isValidPhoneNumber(String phoneNumber) {
    if (phoneNumber.isEmpty) {
      return "Please enter your phone number"; // Phone number is empty.
    }

    // Check if the phone number contains only digits.
    final numericRegExp = RegExp(r'^\d+$');
    if (!numericRegExp.hasMatch(phoneNumber)) {
      return "Phone number should contain only digits"; // Phone number should contain only digits.
    }

    // Check if the phone number has a minimum and maximum length.
    if (phoneNumber.length != 10) {
      return "Plese enter valid phone number"; // Phone number length should be between 8 and 15 digits.
    }

    return null; // Phone number is valid.
  }

  Future<void> _signUser() async {
    try {
      final response = await userService.signUp(
          firstName, lastName, phoneNumber, nic, email, password);

      if (response.statusCode == 200) {
        //i want here poppup container to otp verification
        ErrorHandler.showErrorSnackBar(context, 'Sign up completed.');

        // const snackBar = SnackBar(
        //   content: Text('Successfully signed up!'),
        // );
        // ScaffoldMessenger.of(context).showSnackBar(snackBar);
        //
        //
        // await Future.delayed(const Duration(seconds: 2));
        // Navigator.pushReplacement(context,
        //     MaterialPageRoute(builder: (context) => const LoginPage()));
      } else {
        ErrorHandler.showErrorSnackBar(
            context, 'Sign up failed. Please check provided infomation again.');
      }
    } catch (e) {
      // Close the loading popup in case of an error.
      Navigator.pop(context);
      ErrorHandler.showErrorSnackBar(
          context, 'Unknown error occurred. Please try again later.');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Gap(50),
            const Text(
              "SignUp",
              style: TextStyle(
                color: Styles.primaryColor,
                // Text color
                fontSize: 30.0,
                // Font size
                fontWeight: FontWeight.bold,
                // Font weight
                decorationThickness: 2.0,
                fontFamily: 'poppins',
                // Text decoration thickness
                decorationStyle:
                    TextDecorationStyle.dashed, // Text decoration style
              ),
            ),
            const Text(
              "Join with the community",
              style: TextStyle(
                color: Color.fromARGB(255, 67, 66, 66),
                // Text color
                fontSize: 17.0,
                // Font size
                fontStyle: FontStyle.italic,
                fontFamily: 'poppins',
                // Text decoration thickness
                decorationStyle:
                    TextDecorationStyle.dashed, // Text decoration style
              ),
            ),
            const Gap(10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              verticalDirection: VerticalDirection.down,
              children: [
                Container(
                  width: 70,
                  height: 70,
                  decoration: BoxDecoration(
                    border: Border.all(color: Styles.secondaryColor),
                    borderRadius: BorderRadius.circular(30),
                    // image: const DecorationImage(
                    //   fit: BoxFit.cover,
                    //   image: AssetImage("assets/images/profile_picture.jpg"),
                    // ),
                  ),
                  child: const Icon(
                    Icons.person_2_outlined,
                    size: 30.0,
                    color: Styles.primaryColor,
                  ),
                ),
              ],
            ),
            // const Gap(50),
            Flexible(
              child: Stepper(
                type: StepperType.vertical,
                currentStep: _currentStep,
                elevation: 0,
                controlsBuilder:
                    (BuildContext context, ControlsDetails controlsDetails) {
                  return Row(
                    children: <Widget>[
                      if (_currentStep != 0)
                        ElevatedButton(
                          onPressed: controlsDetails.onStepCancel,
                          style: ElevatedButton.styleFrom(
                            shape: const RoundedRectangleBorder(
                                borderRadius:
                                    BorderRadius.all(Radius.circular(25))),
                            backgroundColor: Colors.white,
                            padding: const EdgeInsets.only(
                                bottom: 7, top: 7, left: 20, right: 20),
                            elevation: 8,
                          ),
                          child: const Text(
                            'Back',
                            style: TextStyle(
                              fontFamily: "Poppins",
                              color: Styles.textColor3,
                            ),
                          ),
                        ),
                      const Gap(8),
                      const Spacer(),
                      if (_currentStep == 0)
                        ElevatedButton(
                          onPressed: controlsDetails.onStepContinue,
                          style: ElevatedButton.styleFrom(
                            shape: const CircleBorder(),
                            backgroundColor: Styles.secondaryColor,
                            padding: const EdgeInsets.all(16),
                            elevation: 8,
                          ),
                          child: const Icon(
                            Icons.keyboard_arrow_down,
                            color: Colors.white,
                            size: 30,
                          ),
                        ),
                      if (_currentStep != 0)
                        ElevatedButton(
                          onPressed: controlsDetails.onStepContinue,
                          style: ElevatedButton.styleFrom(
                            shape: const RoundedRectangleBorder(
                                borderRadius:
                                    BorderRadius.all(Radius.circular(25))),
                            backgroundColor: Styles.secondaryColor,
                            padding: const EdgeInsets.only(
                                bottom: 7, top: 7, left: 20, right: 20),
                            elevation: 8,
                          ),
                          child: const Text(
                            'Sign Up',
                            style: TextStyle(
                              fontSize: 20,
                              fontFamily: "Poppins",
                              color: Styles.textColor1,
                            ),
                          ),
                        ),
                    ],
                  );
                },

                // controlsBuilder:,
                onStepCancel: () {
                  if (_currentStep == 0) {
                  } else if (_currentStep == 1) {
                    setState(() {
                      _currentStep--;
                    });
                  }
                },
                onStepTapped: (step) => (value) {
                  setState(() => _currentStep = step);
                },
                onStepContinue: () {
                  if (_currentStep == 0) {
                    if (_formKey.currentState!.validate()) {
                      setState(() {
                        _currentStep++;
                      });
                    }
                    // _handleFormSubmission();
                  } else if (_currentStep == 1) {
                    if (_formKey2.currentState!.validate()) {
                      _signUser();
                    }

                    // Implement validation and backend call for step 2 here
                  }
                },
                steps: [
                  Step(
                    state: _currentStep != 0
                        ? StepState.complete
                        : StepState.indexed,
                    isActive: _currentStep == 1,
                    title: const Text(
                      'Step 1',
                      style: TextStyle(
                          fontFamily: 'Poppins', color: Styles.primaryColor),
                    ),
                    content: Form(
                      key: _formKey,
                      child: Column(
                        children: [
                          CustomTextField(
                            labelText: 'First name',
                            onChanged: (val) => firstName = val,
                            validator: (value) {
                              if (value!.isEmpty) {
                                return 'Please enter your first name';
                              }
                              if (RegExp(r'\d').hasMatch(value)) {
                                return 'First name cannot contain numbers';
                              }
                              if (RegExp(r'[!@#$%^&*(),.?":{}|<>]')
                                  .hasMatch(value)) {
                                return 'First name cannot contain numbers';
                              }
                              return null;
                            },
                          ),
                          const Gap(10),
                          CustomTextField(
                            labelText: 'Last name',
                            onChanged: (val) => lastName = val,
                            validator: (value) {
                              if (value!.isEmpty) {
                                return 'Please enter your last name';
                              }
                              if (RegExp(r'\d').hasMatch(value)) {
                                return 'Last name cannot contain numbers';
                              }
                              if (RegExp(r'[!@#$%^&*(),.?":{}|<>]')
                                  .hasMatch(value)) {
                                return 'Last name cannot contain numbers';
                              }
                              return null;
                            },
                          ),
                          const Gap(10),
                          CustomTextField(
                            labelText: 'Phone number',
                            onChanged: (val) => phoneNumber = val,
                            validator: (value) {
                              return isValidPhoneNumber(value.toString());
                            },
                          ),
                          CustomTextField(
                            labelText: 'NIC',
                            onChanged: (val) => nic = val,
                            validator: (value) {
                              return validateNIC(value);
                            },
                          ),
                          const Gap(10),
                        ],
                      ),
                    ),
                  ),
                  Step(
                    title: const Text(
                      'Step 2',
                      style: TextStyle(
                          fontFamily: 'Poppins', color: Styles.primaryColor),
                    ),
                    content: Form(
                      key: _formKey2,
                      child: Column(
                        children: [
                          CustomTextField(
                            labelText: 'Email',
                            onChanged: (val) => email = val,
                            validator: (value) {
                              if (value!.isEmpty) {
                                return 'Please enter your email';
                              }

                              if (!RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
                                  .hasMatch(value)) {
                                return 'Please enter valid email';
                              }
                              // Implement email validation here
                              return null;
                            },
                          ),
                          const Gap(10),
                          CustomTextField(
                            labelText: 'Password',
                            onChanged: (val) => password = val,
                            validator: (value) {
                              return isStrongPassword(value.toString());
                            },
                          ),
                          const Gap(20),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const Gap(10), //Add multi step form here
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text(
                  "Already have an account?",
                  style: TextStyle(
                    color: Color.fromARGB(255, 67, 66, 66), // Text color
                    fontSize: 18.0, // Font size
                    fontStyle: FontStyle.normal,
                    fontFamily: 'poppins', // Text decoration thickness
                    // decorationStyle:
                    //     TextDecorationStyle.dashed, // Text decoration style
                  ),
                ),
                // const Gap(10),
                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const LoginPage()),
                    );
                  },
                  child: const Text(
                    "Login",
                    style: TextStyle(
                      color: Styles.primaryColor,
                      // Text color
                      fontSize: 18.0,
                      // Font size
                      fontStyle: FontStyle.italic,
                      decoration: TextDecoration.underline,
                      fontFamily: 'poppins', // Text decoration thickness
                      // decorationStyle:
                      //     TextDecorationStyle.dashed, // Text decoration style
                    ),
                  ),
                )
              ],
            ),
            const Gap(10),
          ],
        ),
      ),
    );
  }
}
