const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSchedule = async (userId) => {
    return await prisma.schedule.findMany({
        where: {
            driverId: userId,
        },
    });
};
const getTripSchedules = async (startStation, endStation, working) => {
    return await prisma.schedule.findMany({
        where: {
            startStation: {
                name: startStation,
            },
            endStation: {
                name: endStation,
            },
            WorkingDays: {
                has: working, // Filter by the specified working days
            },
        },
    });

};
const getAllSchedulesByWorkingday = async (workingday) => {

    return await prisma.schedule.findMany({
        // where: {
        //     WorkingDays: {
        //         has: workingday, // You can use 'equals' or 'contains' based on your data structure
        //     },
        // },
        include: {
            Train: true,
            StationSchedule: true,
        },
    });
};


module.exports = {
    getSchedule,
    getTripSchedules,
    getAllSchedulesByWorkingday
};