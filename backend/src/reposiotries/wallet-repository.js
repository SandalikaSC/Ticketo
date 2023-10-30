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
async function topupWallet(userId, amount) {
    const result = await prisma.$transaction(async (prisma) => {

        const updatedWallet = await prisma.wallet.update({
            where: { userId: userId },
            data: {
                walletBalance: {
                    increment: amount,
                },
            },
        });
        const newPayment = await prisma.payment.create({
            data: {
                amount: amount,
                date: new Date(),
                payment_method: 'Online',
                RelatedName: 'TopUpWallet',
                walletId: updatedWallet.walletId,
            },
        });


        return { updatedWallet, newPayment };
    });
    return result;

}

module.exports = {
    getwallet,
    getavailableBalance,
    getWalletInfoAndPayments,
    topupWallet
};


