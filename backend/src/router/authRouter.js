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

const { addUser, addDriver,addGuard } = require("../controllers/user-controller");
const { scanData } = require("../controllers/ticketChecker/scanData-controller");
const {
  addTrain, getAllTrains, getalldrivers
} = require("../controllers/train-controller");


const{
  getTrainSchedules,
  deleteTrainSchedule

} = require("../controllers/trainGuard/guard-schedule-controller");

const { verifyToken } = require("../middleware/authenticate");
const { verifyOtp } = require("../util/otp");
const { resetPassword } = require("../services/auth-service");
const { getStationMasters } = require("../controllers/stationMasterController");
const { getDelays, getAllUpdates } = require("../controllers/location-controller");

const ticketRouter = require('./ticketRouter');
const scheduleRouter = require('./scheduleRouter');
const walletRouter = require('./walletRouter');
const seasonRouter = require('./seasonRouter');
const locationRouter = require('./locationRouter');

router.use('/location-update', locationRouter);
router.use('/ticket', ticketRouter);
router.use('/trainguard', scheduleRouter);
router.use('/wallet', walletRouter);
router.use('/season', seasonRouter);
router.use('/schedule', scheduleRouter);

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
router.get("/alldrivers", getalldrivers);
router.post("/add-train", addTrain);
router.post("/scan-data", scanData);
router.post("/add-user", addUser);
router.post("/add-schedule", addTrainSchedule);
router.post("/get-schedule-for-train", getTrainSchedules);
router.post("/delete-train-Schedule", deleteTrainSchedule);
router.post("/add-driver", addDriver);
router.post("/add-guard", addGuard);

router.get("/get-delays", getDelays);
router.get("/get-all-updates", getAllUpdates);

module.exports = router;
