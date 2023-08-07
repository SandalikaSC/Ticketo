import 'package:flutter/material.dart';
import 'package:passenger_frontend/constants/app_styles.dart';

class CustomTextField extends StatefulWidget {
  final String labelText;
  final void Function(String)? onChanged;
  final String? Function(String?)? validator;
  final Key? key; // Adding a named 'key' parameter

  const CustomTextField({
    required this.labelText,
    this.onChanged,
    this.validator,
    this.key, // Adding a named 'key' parameter
  }) : super(key: key); // Call the super constructor with the key parameter

  @override
  _CustomTextFieldState createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  String _text = '';
  bool _isObscure = true;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      onChanged: (val) {
        setState(() {
          _text = val;
        });
        if (widget.onChanged != null) {
          widget.onChanged!(val);
        }
      },
      style: const TextStyle(
        fontFamily: 'Poppins',
        color: Styles.textColor3,
      ),
      obscureText:
          widget.labelText.toLowerCase() == 'password' ? _isObscure : false,
      validator: widget.validator,
      decoration: InputDecoration(
        labelText: widget.labelText,
        labelStyle: const TextStyle(
          color: Colors.black,
          fontFamily: 'Poppins',
        ),
        focusedBorder: const UnderlineInputBorder(
          borderSide: BorderSide(
            color: Styles.primaryColor,
          ),
        ),
        enabledBorder: const UnderlineInputBorder(
          borderSide: BorderSide(
            color: Styles.textColor3,
          ),
        ),
        suffixIcon: widget.labelText.toLowerCase() == 'password'
            ? IconButton(
                icon: Icon(
                  _isObscure ? Icons.visibility : Icons.visibility_off,
                  color: Styles.textColor3,
                ),
                onPressed: () {
                  setState(() {
                    _isObscure = !_isObscure;
                  });
                },
              )
            : null,
      ),
    );
  }
}
