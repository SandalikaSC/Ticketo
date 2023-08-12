const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getJourneyPrice = async (start, end) => {
    return await prisma.journey.findFirst({
        where: {
            OR: [
                { start: start, end: end },
                { start: end, end: start },
            ],
        },
    });
};
module.exports = {
    getJourneyPrice
};


