

import 'package:flutter_dotenv/flutter_dotenv.dart';

class PayHereAccountCredentials {
  final String? merchantId =  dotenv.env['MERCHANT_ID'];
  final String? merchantSecret = dotenv.env['MERCHANT_SECRET'];
}