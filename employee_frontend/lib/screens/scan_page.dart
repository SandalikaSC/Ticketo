import 'dart:async';
import 'dart:convert';

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
  bool canScan = true; // Add a flag to control scanning frequency
  bool isDialogVisible = false; // Flag to control dialog visibility

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
                  Text( resultData != null && resultData!.isNotEmpty
                      ? 'Scanned successfully'
                      : 'Error scanning QR code',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: resultData != null && resultData!.isNotEmpty
                          ? Colors.green
                          : Colors.red),),
                  const SizedBox(height: 8),

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

  void _onQRViewCreated(QRViewController controller) {
    setState(() {
      this.controller = controller;
    });

    controller.scannedDataStream.listen((scanData) async {
      if (!canScan) return; // Don't scan again if canScan is false

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
            final response = await ApiService.sendScannedData(id, resultData!);

            if (response.containsKey('message')) {
              _showAlertDialog(context, 'Response', response['message']);
            } else {
              _showAlertDialog(context, 'Invalid Response', 'Received an unexpected response.');
            }
          } else {
            _showAlertDialog(context, 'Invalid Scanned Data', 'This is not a valid ticket.');
          }
        } catch (e) {
          _showAlertDialog(context, 'Invalid Scanned Data', 'This is not a valid ticket.');
        }

        setState(() {
          canScan = false; // Prevent scanning for 5 seconds
        });

        Timer(const Duration(seconds: 5), () {
          setState(() {
            canScan = true; // Allow scanning after 5 seconds
          });
        });
      }
    });
  }

  // void _showAlertDialog(BuildContext context, String title, String content) {
  //   if (isDialogVisible) return; // Prevent multiple dialogs
  //
  //   setState(() {
  //     isDialogVisible = true; // Show dialog
  //   });
  //
  //   showDialog(
  //     context: context,
  //     builder: (context) {
  //       // Dismiss dialog after 3 seconds
  //       Timer(const Duration(seconds: 3), () {
  //         Navigator.of(context).pop();
  //         setState(() {
  //           isDialogVisible = false;
  //         });
  //       });
  //
  //       return AlertDialog(
  //         title: Text(title),
  //         content: Text(content),
  //       );
  //     },
  //   );
  // }
  void _showAlertDialog(BuildContext context, String title, String content) {
    if (isDialogVisible) return; // Prevent multiple dialogs

    setState(() {
      isDialogVisible = true; // Show dialog
    });

    showDialog(
      context: context,
      builder: (context) {
        // Dismiss dialog after 3 seconds
        Timer(const Duration(seconds: 3), () {
          Navigator.of(context).pop();
          setState(() {
            isDialogVisible = false;
          });
        });

        return AlertDialog(
          backgroundColor: Colors.blueGrey, // Set background color
          title: Row(
            children: [
              Image.asset(
                'assets/icons/scan.png', // Replace with your image asset path
                width: 24,
                height: 24,
                color: Colors.yellow, // Set image color
              ),
              const SizedBox(width: 8),
              Text(
                title,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 20, // Set title font size
                  color: Colors.white, // Set title font color
                ),
              ),
            ],
          ),
          content: Text(
            content,
            style: const TextStyle(
              fontSize: 18, // Set content font size
              color: Colors.white, // Set content font color
            ),
            textAlign: TextAlign.center, // Center-align the content
          ),
        );
      },
    );
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
