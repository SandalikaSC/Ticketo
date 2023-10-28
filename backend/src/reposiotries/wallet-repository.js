const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getwallet = async (userid) => {
    return await prisma.wallet.findUnique({
        where: { userId: userid },
    });
};
const getavailableBalance = async (userid) => {
    const wallet = await prisma.wallet.findUnique({
        where: { userId: userid },
        select: {
            walletBalance: true,
            holdValue: true,
        },
    });

    return wallet.walletBalance - wallet.holdValue;
};
async function getWalletInfoAndPayments(userId) {
    console.log("repo");
    const walletInfo = await prisma.wallet.findUnique({
        where: {
            userId: userId,
        },
        include: {
            payment: {
                orderBy: {
                    date: 'desc', // Sort payments by date in descending order (most recent first)
                },
            },
        },
    });

    return walletInfo;
}

module.exports = {
    getwallet,
    getavailableBalance,
    getWalletInfoAndPayments
};


