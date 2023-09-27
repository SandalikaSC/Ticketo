const express = require('express');
const scheduleRouter = express.Router();
const {
    getGuardSchedules
} = require("../controllers/trainGuard/guard-schedule-controller");

const { verifyToken } = require("../middleware/authenticate");

scheduleRouter.use(verifyToken);


scheduleRouter.get('/get-schedule', getGuardSchedules);

module.exports = scheduleRouter;
