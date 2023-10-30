const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  verifyAccount,
  getUser,
  refreshToken,
  logout,
  generateOtp
} = require("../controllers/auth-controller");
const {
  getAllStations,
  getStationMaster
} = require("../controllers/station-controller");
const {
  getResevationSchedules,
  addTrainSchedule
} = require("../controllers/schedule-controller");

const { addUser } = require("../controllers/user-controller");
const { scanData } = require("../controllers/ticketChecker/scanData-controller");
const {
  addTrain, getAllTrains
} = require("../controllers/train-controller");

const{
  getTrainSchedules
} = require("../controllers/trainGuard/guard-schedule-controller");

const { verifyToken } = require("../middleware/authenticate");
const { verifyOtp } = require("../util/otp");
const { resetPassword } = require("../services/auth-service");
const ticketRouter = require('./ticketRouter');
const scheduleRouter = require('./scheduleRouter');

router.use('/ticket', ticketRouter);
router.use('/trainguard', scheduleRouter);

router.post("/login", login);
router.post("/signup", signup);
router.post("/verifyAccount", verifyAccount);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken);
router.post("/logout", verifyToken, logout);
router.post("/generate-otp", generateOtp);
router.post("/verify-otp", verifyOtp);
router.get("/getresevationschedules", getResevationSchedules);
router.get("/allstations", getAllStations);
router.get("/alltrains", getAllTrains);
router.post("/add-train", addTrain);
router.post("/scan-data", scanData);
router.post("/add-user", addUser);
router.post("/add-schedule", addTrainSchedule);
router.post("/get-schedule-for-train", getTrainSchedules);

router.post("/reset-password", resetPassword);
module.exports = router;
