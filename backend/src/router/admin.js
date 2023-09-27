const express = require('express');
const reportsController = require('../controllers/admin/reportsController');
const router = express.Router();

router.get('/income', reportsController.generateIncomeReport);

module.exports = router;
