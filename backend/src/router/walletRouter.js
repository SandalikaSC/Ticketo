const express = require('express');
const walletRouter = express.Router();
const {
    getWalletInfo
} = require("../controllers/walletController");

const { verifyToken } = require("../middleware/authenticate");

walletRouter.use(verifyToken);

walletRouter.get('/getwalletinfo', getWalletInfo);

module.exports = walletRouter;
