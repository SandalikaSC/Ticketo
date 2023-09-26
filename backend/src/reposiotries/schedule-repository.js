const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSchedule = async (userId) => {
    return await prisma.schedule.findMany({
        where: {
            driverId: userId,
        },
    });
};
const getTripSchedules = async (startStation, endStation, workingDays) => {
    console.log("repo");
    return await prisma.schedule.findMany({
        where: {
            startStation: {
                name: startStation,
            },
            endStation: {
                name: endStation,
            },
        },

    });

};

module.exports = {
    getSchedule,
    getTripSchedules
};