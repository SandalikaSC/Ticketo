const express = require("express");
const {
  login,
  signup,
  verifyAccount,
  getUser,
  refreshToken,
  logout,
  generateOtp
} = require("../controllers/auth-controller");

const { verifyToken } = require("../middleware/authenticate");

const { verifyOtp } = require("../util/otp");
const { resetPassword } = require("../services/auth-service");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/verifyAccount", verifyAccount);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken);
router.post("/logout", verifyToken, logout);
router.post("/generate-otp", generateOtp);
router.post("/verify-otp", verifyOtp);

router.post("/reset-password", resetPassword);
module.exports = router;
