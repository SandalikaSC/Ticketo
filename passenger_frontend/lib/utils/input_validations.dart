class InputValidations {
  static bool isValidEmail(String email) {
    // Simple email validation using a regular expression
    return RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(email);
  }

  static bool isValidPassword(String password) {
    // Password validation: password should be at least 6 characters long
    return password.length >= 6;
  }
}
