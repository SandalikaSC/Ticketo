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
module.exports = {
    getwallet,
    getavailableBalance
};

