const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSchedule = async (userId) =>
{
    return await prisma.schedule.findMany({
        where: {
            driverId: userId,
        },
    });
};

module.exports = {
    getSchedule
};