const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getReservationCoaches = async (trainId, coaches) => {
    return await prisma.coachArrangement.findMany({
        where: {
            trainId: trainId,
            coachId: {
                in: coaches,
            },
        },

    });
};


module.exports = {
    getReservationCoaches
};


