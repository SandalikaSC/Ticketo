const express = require("express");
const router = express.Router();
const stationMasterController = require("../controllers/stationMasterController");

// Route to handle adding a station master
router.post("/add-station-master", stationMasterController.addStationMaster);

module.exports = router;
