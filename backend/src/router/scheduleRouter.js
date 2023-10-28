const express = require('express');
const scheduleRouter = express.Router();
const {
    getGuardSchedules,
    getAllScheduleStations
} = require("../controllers/trainGuard/guard-schedule-controller");


const { verifyToken } = require("../middleware/authenticate");

scheduleRouter.use(verifyToken);




scheduleRouter.get('/get-schedule', getGuardSchedules);
scheduleRouter.post('/get-all-stations', getAllScheduleStations)
module.exports = scheduleRouter;
