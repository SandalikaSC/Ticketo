import 'package:flutter/material.dart';

const Color primary = Color(0xFF3D50ac);

class Styles {
  static const Color primaryColor = primary;
  static const Color primaryColor2 = Color(0xFF262c68);
  static const Color secondaryColor = Color(0xFFF86f5d);
  static const Color backgroundColor = Color(0xFFFFFFFF);
  static const Color backgroundColor2 = Color(0xfff1eeee);

  static const Color textColor1 = Color(0xffffffff);
  static const Color textColor2 = Color(0xff0e0707);

  static TextStyle textStyle = const TextStyle(
      fontSize: 16, color: textColor2, fontWeight: FontWeight.w500);
  static TextStyle headlineStyle1 = const TextStyle(
      fontSize: 26, color: textColor2, fontWeight: FontWeight.bold);
  static TextStyle headlineStyle2 = const TextStyle(
      fontSize: 21, color: textColor2, fontWeight: FontWeight.bold);
  static TextStyle headlineStyle3 = const TextStyle(
      fontSize: 17, color: textColor2, fontWeight: FontWeight.w500);
  static TextStyle headlineStyle4 = TextStyle(
      fontSize: 14, color: Colors.grey.shade500, fontWeight: FontWeight.w500);

  static TextStyle headWhite = const TextStyle(
    fontSize: 17,
    color: textColor1,
    fontWeight: FontWeight.w500,
    fontFamily: 'Poppins',
  );
  static TextStyle headWhite2 = const TextStyle(
    fontSize: 17,
    color: textColor1,
    fontWeight: FontWeight.w300,
    fontFamily: 'Poppins',
  );
// Add more color constants as needed
}
