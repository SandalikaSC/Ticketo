const walletService = require("../services/walletService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getWalletInfo = async (req, res) => {


    const user = req.user;
    try {
        console.log("controller");
        const walletInfo = await walletService.getWallet(user.id);

        if (walletInfo) {
            return res.status(200).json(walletInfo);
        } else {
            return res.status(400).json({ message: "Empty" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
const topUpWallet = async (req, res) => {


    const user = req.user;
    const { amount } = req.body;
    if (!amount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (amount <= 0) {
        return res.status(400).json({ error: 'Invalid Amount' });
    }
    try {
        console.log("controller");
        const requestStatus = await walletService.addWalletAmount(user.id, amount);

        if (requestStatus) {
            return res.status(200).json(requestStatus);
        } else {
            return res.status(400).json({ message: "Something went wrong" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
module.exports = {
    getWalletInfo,
    topUpWallet
};
