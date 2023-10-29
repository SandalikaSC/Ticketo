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
  getAllStations
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

const { verifyToken } = require("../middleware/authenticate");
const { verifyOtp } = require("../util/otp");
const { resetPassword } = require("../services/auth-service");
const { getStationMasters } = require("../controllers/stationMasterController");
const ticketRouter = require('./ticketRouter');
const scheduleRouter = require('./scheduleRouter');
const walletRouter = require('./walletRouter');
const locationRouter = require('./locationRouter');

router.use('/location-update', locationRouter);
router.use('/ticket', ticketRouter);
router.use('/trainguard', scheduleRouter);
router.use('/wallet', walletRouter);


router.post("/login", login);
router.post("/signup", signup);
router.post("/verifyAccount", verifyAccount);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken);
router.post("/logout", verifyToken, logout);
router.post("/generate-otp", generateOtp);
router.post("/verify-otp", verifyOtp);
router.post("/getresevationschedules", getResevationSchedules);
router.get("/allstations", getAllStations);
router.get("/alltrains", getAllTrains);
router.post("/add-train", addTrain);
router.post("/scan-data", scanData);
router.post("/add-user", addUser);
router.post("/add-schedule", addTrainSchedule);
router.post("/")
router.get("/get-station-masters", getStationMasters);
module.exports = router;
