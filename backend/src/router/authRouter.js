const express = require("express");
const {
  login,
  signup,
  getUser,
  refreshToken,
  logout,
  generateOtp
} = require("../controllers/auth-controller");

const { verifyToken } = require("../middleware/authenticate");

const { verifyOtp } = require("../util/otp");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken);
router.post("/logout", verifyToken, logout);
router.post("/generate-otp", generateOtp);
router.post("/verify-otp", verifyOtp);
module.exports = router;
