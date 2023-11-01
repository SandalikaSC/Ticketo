const express = require('express');
const scheduleRouter = express.Router();
const {
    getGuardSchedules,
    getAllScheduleStations
} = require("../controllers/trainGuard/guard-schedule-controller");

const {
    getLocations
} = require("../controllers/location-controller");
const { verifyToken } = require("../middleware/authenticate");

scheduleRouter.use(verifyToken);




scheduleRouter.get('/get-schedule', getGuardSchedules);
scheduleRouter.post('/get-all-stations', getAllScheduleStations);
scheduleRouter.post('/get-locations', getLocations);
scheduleRouter.get('/get-notification',);
module.exports = scheduleRouter;
