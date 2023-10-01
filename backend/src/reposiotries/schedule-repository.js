const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addTrainSchedule = async (startStationId,endStationId,startingTime,
    finishingTime,workingDays) => {
    return await prisma.user.create({
        data:{
            startTime: startingTime,
            endTime: finishingTime,
            start: startStationId,
            end: endStationId,
            trainId: '4',
            WorkingDays: workingDays,
        }
    })
}

const getScheduleID = async (startStationId,endStationId,startingTime) => {
    return await prisma.station.findUnique({
        where: {
            start:startStationId,
            end: endStationId,
            startTime:startingTime,
            trainId: '4'
        },
        select: {
            scheduleId: true
        }
    });
}
 
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
    getAllSchedulesByWorkingday,
    addTrainSchedule,
    getScheduleID
};