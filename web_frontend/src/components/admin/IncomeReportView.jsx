import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Dummy table data for the report
const dummyTableData = [
  { date: '2023.07.01', amount: '1,000,000' },
  { date: '2023.07.02', amount: '2,000,000' },
  { date: '2023.07.03', amount: '1,000,000' },
  { date: '2023.07.04', amount: '3,000,000' },
  { date: '2023.07.05', amount: '1,500,000' },




];

const styles = StyleSheet.create({
  reportContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: 1,
    alignItems: 'center',
    paddingBottom: 5,
  },
  tableHeaderCell: {
    width: '50%',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  tableCell: {
    width: '50%',
  },
});

const IncomeReportView = ({ reportData }) => {
  // Extract data from reportData
  const { selectedOption, startDate, endDate, selectedMonth, selectedYear } = reportData;

  // Create PDF report content using react-pdf
  const pdfReport = (
    <Document>
      <Page style={styles.reportContainer}>
        <Text style={styles.title}>Income Report</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Date</Text>
          <Text style={styles.tableHeaderCell}>Amount</Text>
        </View>
        {dummyTableData.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{row.date}</Text>
            <Text style={styles.tableCell}>{row.amount}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );

  return (
    <div className="income-report-view">
      <h2>Income Report</h2>
      <PDFViewer width="100%" height="500px">
        {pdfReport}
      </PDFViewer>
      <button className="download-button">Download Report</button>
    </div>
  );
};

export default IncomeReportView;
