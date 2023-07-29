// router/authRouter.ts
// import express from 'express';
// import { login } from '../controllers/user-controller';
const express = require('express');
const { login, signup, verifyToken, getUser, refreshToken, logout } = require('../controllers/user-controller');


const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);
module.exports = router;
