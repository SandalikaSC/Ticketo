const express = require('express');
const walletRouter = express.Router();
const {
    getWalletInfo, topUpWallet
} = require("../controllers/walletController");

const { verifyToken } = require("../middleware/authenticate");

walletRouter.use(verifyToken);

walletRouter.get('/getwalletinfo', getWalletInfo);
walletRouter.post('/topupwallet', topUpWallet);

module.exports = walletRouter;
