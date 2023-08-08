import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

void showCustomToast(context, String msgType, String message) {
  Color backgroundColor;
  Color iconColor;
  Color borderColor;
  Color textColor;

  // Set the colors based on the msgType
  if (msgType == "success") {
    iconColor = const Color.fromARGB(255, 122, 215, 125);
    backgroundColor = Colors.white;
    borderColor = Colors.green;
    textColor = Colors.green; // Set text color to green for success message
  } else if (msgType == "error") {
    iconColor = Colors.redAccent;
    backgroundColor = Colors.white;
    borderColor = Colors.redAccent;
    textColor = Colors.redAccent; // Set text color to red for error message
  } else {
    iconColor = Colors.blueGrey;
    backgroundColor = Colors.white;
    borderColor = Colors.blueGrey;
    textColor =
        Colors.blueGrey; // Set text color to blueGrey for other message types
  }

  final toast = FToast();
  toast.init(context);

  final toastWidget = Card(
    color: backgroundColor,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(16),
      side: BorderSide(
        color: borderColor,
        width: 2,
      ), // Add border color and width
    ),
    elevation: 8,
    child: Padding(
      padding: const EdgeInsets.symmetric(
        vertical: 12,
        horizontal: 24,
      ), // Adjust padding here
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(FontAwesomeIcons.exclamationCircle, color: iconColor),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              message,
              style: TextStyle(
                color: textColor, // Set text color here based on msgType
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    ),
  );

  toast.showToast(
    child: toastWidget,
    toastDuration: const Duration(seconds: 5), // Adjust the duration here
    positionedToastBuilder: (context, child) {
      return Positioned(
        top: MediaQuery.of(context).size.height * 0.09,
        left: MediaQuery.of(context).size.width * 0.1,
        right: MediaQuery.of(context).size.width * 0.1,
        child: child,
      );
    },
  );
}
