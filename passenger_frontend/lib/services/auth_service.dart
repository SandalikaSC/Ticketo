// import 'package:jwt_decoder/jwt_decoder.dart'; // Import the jwt_decoder package
//
// class AuthService {
//   // Other authentication methods...
//
//   static Map<String, dynamic>? decodeJwtToken(String token) {
//     try {
//       Map<String, dynamic> decodedToken = JwtDecoder.decode(token);
//       if (decodedToken.containsKey('user') && decodedToken['user'] is Map<String, dynamic>) {
//         return decodedToken['user'] as Map<String, dynamic>;
//       } else {
//         return null; // User object not found in the token
//       }
//     } catch (error) {
//       print('Error decoding JWT token: $error');
//       return null;
//     }
//   }
// }
