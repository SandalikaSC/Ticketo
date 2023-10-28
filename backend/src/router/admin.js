// adminRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');


// Route for Income Report
router.get('/income-report', reportController.getIncomeReport);

module.exports = router;
