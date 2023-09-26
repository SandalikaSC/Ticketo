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
  getSchedules
} = require("../controllers/schedule-controller");

const { addUser } = require("../controllers/user-controller");
const { scanData } = require("../controllers/ticketChecker/scanData-controller");
const {
  addTrain
} = require("../controllers/train-controller");

const { verifyToken } = require("../middleware/authenticate");
const { verifyOtp } = require("../util/otp");
const { resetPassword } = require("../services/auth-service");
const ticketRouter = require('./ticketRouter');

router.use('/ticket', ticketRouter);

router.post("/login", login);
router.post("/signup", signup);
router.post("/verifyAccount", verifyAccount);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken);
router.post("/logout", verifyToken, logout);
router.post("/generate-otp", generateOtp);
router.post("/verify-otp", verifyOtp);
router.get("/getschedules", getSchedules);
router.get("/allstations", getAllStations);
router.post("/add-train", addTrain);
router.post("/scan-data", scanData);
router.post("/add-user", addUser);

router.post("/reset-password", resetPassword);
module.exports = router;
