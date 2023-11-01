const express = require('express');
const scheduleRouter = express.Router();
const {
    getGuardSchedules,
    getAllScheduleStations
} = require("../controllers/trainGuard/guard-schedule-controller");

const {
    getLocations, getNotification
} = require("../controllers/location-controller");
const {
    getReservationSchedule
} = require("../controllers/schedule-controller");
const { verifyToken } = require("../middleware/authenticate");

scheduleRouter.use(verifyToken);




scheduleRouter.get('/get-schedule', getGuardSchedules);
scheduleRouter.post('/get-all-stations', getAllScheduleStations);
scheduleRouter.post('/get-locations', getLocations); 
scheduleRouter.post('/getReservationSchedule', getReservationSchedule); 
scheduleRouter.get('/get-notification', getNotification); 
module.exports = scheduleRouter;
