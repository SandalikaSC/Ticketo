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
    console.log("repo");
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
        // include: {
        //     Train: {
        //         select: {
        //             trainName: true,
        //         },
        //     },
        // },
    });

};
const getAllSchedulesByWorkingday = async (workingday) => {

    return await prisma.schedule.findMany({
        // where: {
        //     WorkingDays: { has: workingday },
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