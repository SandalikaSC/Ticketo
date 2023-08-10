import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:intl/intl.dart';
import '../services/scan_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ScanPage extends StatefulWidget {
  static const routeName = '/scan';

  const ScanPage({Key? key}) : super(key: key);

  @override
  ScanPageState createState() => ScanPageState();
}

class ScanPageState extends State<ScanPage> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  QRViewController? controller;
  String? resultData;
  String? dateTimeInfo;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Expanded(
            flex: 5,
            child: _buildQrView(context),
          ),
          Expanded(
            flex: 1,
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Your Result Here:',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  Text(resultData ?? ''),
                  const SizedBox(height: 8),
                  Text(dateTimeInfo ?? ''),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQrView(BuildContext context) {
    return QRView(
      key: qrKey,
      onQRViewCreated: _onQRViewCreated,
      overlay: QrScannerOverlayShape(
        borderRadius: 10,
        borderColor: Theme.of(context).primaryColor,
        borderLength: 30,
        borderWidth: 10,
        cutOutSize: 300,
      ),
    );
  }

  // void _onQRViewCreated(QRViewController controller) {
  //   setState(() {
  //     this.controller = controller;
  //   });
  //
  //   controller.scannedDataStream.listen((scanData) async {
  //     if (kDebugMode) {
  //       if (kDebugMode) {
  //         print('Scanned Data: ${scanData.code}');
  //       }
  //     }
  //     setState(() {
  //       resultData = scanData.code;
  //       dateTimeInfo =
  //       'Scanned at: ${DateFormat.yMMMMEEEEd().add_Hms().format(DateTime.now())}';
  //     });
  //
  //     if (kDebugMode) {
  //       print("hi");
  //     }
  //     // Send resultData to the backend
  //     ApiService.sendScannedData(resultData!); // Send the data to the backend
  //   });
  // }
  void _onQRViewCreated(QRViewController controller) {
    setState(() {
      this.controller = controller;
    });

    controller.scannedDataStream.listen((scanData) async {
      if (kDebugMode) {
        if (kDebugMode) {
          print('Scanned Data: ${scanData.code}');
        }
      }

      final scannedCode = scanData.code;
      if (scannedCode != null) {
        try {
          final parsedData = json.decode(scannedCode);
          if (parsedData is Map<String, dynamic> &&
              parsedData.containsKey('uuid') &&
              parsedData.containsKey('ticketType')) {
            setState(() {
              resultData = scannedCode;
              dateTimeInfo =
              'Scanned at: ${DateFormat.yMMMMEEEEd().add_Hms().format(DateTime.now())}';
            });

            final prefs = await SharedPreferences.getInstance();
            final id = prefs.getString('id') ?? '';
            // Send resultData to the backend
            ApiService.sendScannedData(id,resultData!); // Send the data to the backend
          } else {
            // Show popup saying this is not a ticket
            showDialog(
              context: context,
              builder: (context) => AlertDialog(
                title: const Text('Invalid Scanned Data'),
                content: const Text('This is not a valid ticket.'),
                actions: [
                  TextButton(
                    onPressed: () {
                      Navigator.of(context).pop();
                    },
                    child: const Text('OK'),
                  ),
                ],
              ),
            );
          }
        } catch (e) {
          // Show popup saying this is not a ticket
          showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: const Text('Invalid Scanned Data'),
              content: const Text('This is not a valid ticket.'),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: const Text('OK'),
                ),
              ],
            ),
          );
        }
      }
    });
  }

  @override
  void dispose() {
    controller?.dispose();
    super.dispose();
  }
}

void main() {
  runApp(const MaterialApp(
    home: ScanPage(),
  ));
}
