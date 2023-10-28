class Payment {
  final String paymentId;
  final double amount;
  final DateTime date;
  final String paymentMethod;
  final String? walletId;
  final String? relatedId;
  final String? relatedName;

  Payment({
    required this.paymentId,
    required this.amount,
    required this.date,
    required this.paymentMethod,
     this.walletId,
    this.relatedId,
    this.relatedName,
  });

  factory Payment.fromJson(Map<String, dynamic> json) {
    return Payment(
      paymentId: json['paymentId'],
      amount: json['amount'].toDouble(),
      date: DateTime.parse(json['date']),
      paymentMethod: json['payment_method'],
      walletId: json['walletId'],
      relatedId: json['relatedId'],
      relatedName: json['RelatedName'],
    );
  }
}
