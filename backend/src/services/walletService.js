
const { getWalletInfoAndPayments } = require("../reposiotries/wallet-repository")
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

module.exports = {
    getWallet
};
