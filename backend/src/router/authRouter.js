const express = require("express");
const {
  login,
  signup,
  getUser,
  refreshToken,
  logout,
  verifyToken
} = require("../controllers/auth-controller");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken);
router.post("/logout", verifyToken, logout);
module.exports = router;
