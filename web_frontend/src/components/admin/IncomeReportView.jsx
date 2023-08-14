import React, { useRef } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const dummyTableData = [
  { date: '2023.07.01', amount: '1,000,000', station: 'Colombo Fort' },
  { date: '2023.07.01', amount: '2,000,000', station: 'Maradana' },
  { date: '2023.07.01', amount: '1,050,000', station: 'Kandy' },
  { date: '2023.07.02', amount: '200,000', station: 'Hikkaduwa' },
  { date: '2023.07.02', amount: '600,000', station: 'Galle' },
  { date: '2023.07.02', amount: '400,000', station: 'Boossa' },
  { date: '2023.07.03', amount: '100,000', station: 'Nanu Oya' },
  { date: '2023.07.03', amount: '200,000', station: 'Peradeniya' },
  { date: '2023.07.03', amount: '700,000', station: 'Bentota' },
  { date: '2023.07.04', amount: '500,000', station: 'Kaluthara ' },
  { date: '2023.07.04', amount: '100,000', station: 'Dehiwala' },
  { date: '2023.07.04', amount: '300,000', station: 'Moratuwa' },
  { date: '2023.07.04', amount: '700,000', station: 'Thalpe' },
  { date: '2023.07.04', amount: '500,000', station: 'Unawatuna ' },
  { date: '2023.07.04', amount: '100,000', station: 'Midigama' },
  { date: '2023.07.04', amount: '300,000', station: 'Habaraduwa' },
  { date: '2023.07.04', amount: '1,000,000', station: 'Unawatuna' },
  // Add more data here...
];

const styles = StyleSheet.create({
  reportContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  table: {
    border: '1pt solid black', // Adding border to the entire table
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: 1,
    alignItems: 'center',
    paddingBottom: 5,
    border: '1pt solid black', // Adding border to the table header cells
  },
  tableHeaderCell: {
    width: '25%',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    border: '1pt solid black', // Adding border to the table row cells
  },
  tableCell: {
    width: '25%',
  },
});

const IncomeReportView = ({ reportData }) => {
  const pdfRef = useRef();

  // Extract data from reportData
  const { selectedOption, startDate, endDate, selectedMonth, selectedYear } = reportData;

  // Create PDF report content using react-pdf
  const pdfReport = (
    <Document>
      <Page style={styles.reportContainer}>
        <Text style={styles.title}>Income Report</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Date</Text>
            <Text style={styles.tableHeaderCell}>Amount(LKR)</Text>
            <Text style={styles.tableHeaderCell}>Station</Text>
          </View>
          {dummyTableData.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{row.date}</Text>
              <Text style={styles.tableCell}>{row.amount}</Text>
              <Text style={styles.tableCell}>{row.station}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="income-report-view">
      <h2>Income Report</h2>
      <div style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
        <PDFViewer ref={pdfRef} width="100%" height="100%">
          {pdfReport}
        </PDFViewer>
      </div>
      <button
        className="download-button"
        onClick={() => {
          const blob = new Blob([pdfReport], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'income-report.pdf';
          link.click();
        }}
      >
        Download Report
      </button>
    </div>
  );
};

export default IncomeReportView;
