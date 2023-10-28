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
module.exports = {
    getWalletInfo
};
