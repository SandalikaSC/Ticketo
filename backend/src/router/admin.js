// admin.js
const express = require('express');
const reportsController = require('../../controllers/admin/reportsController');
const router = express.Router();

// Define the '/income' route in the admin router
router.get('/income', reportsController.generateIncomeReport);

module.exports = router;
