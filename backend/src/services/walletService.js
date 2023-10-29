
const { getWalletInfoAndPayments, topupWallet } = require("../reposiotries/wallet-repository")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getWallet = async (userid) => {
    try {
        console.log("service");
        const walletInfo = await getWalletInfoAndPayments(userid);

        return walletInfo;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
}
const addWalletAmount = async (userid, amount) => {
    try {
        console.log("service");
        const status = await topupWallet(userid, amount);

        return status;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
}

module.exports = {
    getWallet,
    addWalletAmount
};
