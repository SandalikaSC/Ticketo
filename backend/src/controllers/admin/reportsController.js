// backend/src/controllers/admin/reportsController.js
const { Pool } = require('pg');
const pool = new Pool({
  // Database connection configuration
});

const generateIncomeReport = async (req, res) => {
  try {
    const { selectedOption, startDate, endDate, selectedMonth, selectedYear } = req.query;
    let query = '';
    let queryParams = [];

    if (selectedOption === 'dateRange') {
      // Generate SQL query based on date range filter
      query = `
        SELECT date, SUM(amount) as total_amount
        FROM Payment
        WHERE date >= $1 AND date <= $2
        GROUP BY date
        ORDER BY date;
      `;
      queryParams = [startDate, endDate];
    } else if (selectedOption === 'month') {
      // Generate SQL query based on month filter
      query = `
        SELECT DATE_TRUNC('month', date) as month, SUM(amount) as total_amount
        FROM Payment
        WHERE DATE_TRUNC('month', date) = DATE_TRUNC('month', $1::date)
        GROUP BY month
        ORDER BY month;
      `;
      queryParams = [selectedMonth];
    } else if (selectedOption === 'year') {
      // Generate SQL query based on year filter
      query = `
        SELECT DATE_TRUNC('year', date) as year, SUM(amount) as total_amount
        FROM Payment
        WHERE DATE_TRUNC('year', date) = DATE_TRUNC('year', $1::date)
        GROUP BY year
        ORDER BY year;
      `;
      queryParams = [selectedYear];
    }

    const { rows } = await pool.query(query, queryParams);
    res.json(rows);
  } catch (error) {
    console.error('Error generating income report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  generateIncomeReport,
};
