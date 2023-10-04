import React, { useRef, useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import axios from 'axios'; // Import Axios for making API requests

const styles = StyleSheet.create({
  // Define your styles here
});

const IncomeReportView = ({ reportData }) => {
  const pdfRef = useRef();
  const [reportTableData, setReportTableData] = useState([]); // State to store report data

  useEffect(() => {
    // Function to fetch report data from the backend
    const fetchReportData = async () => {
      try {
        // Make an API request to your backend here, sending the reportData as query parameters
        const response = await axios.get('/api/reports/income', {
          params: reportData,
        });

        // Update the reportTableData state with the data received from the backend
        setReportTableData(response.data);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    // Call the fetchReportData function when the component mounts
    fetchReportData();
  }, [reportData]);

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
          {reportTableData.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{row.date}</Text>
              <Text style={styles.tableCell}>{row.total_amount}</Text>
              {/* Add more fields here */}
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
