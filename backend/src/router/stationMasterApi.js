const express = require('express');
const router = express.Router();
const stationMController = require('../controllers/admin/stationMController');

// Get all station masters
router.get('/', stationMController.getStationMasters);

// Add a new station master
r//outer.post('/', stationMasterController.addStationMaster);

module.exports = router;
