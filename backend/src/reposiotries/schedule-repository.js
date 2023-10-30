const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addTrainSchedule = async (startStationId,endStationId,startingTime,
    finishingTime,workingDays,trainID) => 
    {

    console.log("reached repo");    
    // console.log(startStationId);    
    // console.log(endStationId);    
    // console.log(startingTime);    
    // console.log(finishingTime);    
    // console.log(workingDays);    
    // console.log(trainID);    
    return await prisma.schedule.create({
        data:{
            startTime: startingTime,
            endTime: finishingTime,
            start: startStationId,
            end: endStationId,
            driverId: " ",
            trainId: trainID,
            WorkingDays: workingDays
        }
    })
};

//Gets all schedules by trainID
const getSchedulebytrainID = async(trainID) => {
    try {
        const schedules = await prisma.stationSchedule.findMany({
          where: {
            schedule: {
              train: {
                id: trainID,
              },
            },
          },
        });
    
        return schedules;
      } catch (error) {
        throw new Error(`Error retrieving schedules for train ID ${trainID}: ${error.message}`);
      }
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
    getScheduleID,
    getSchedulebytrainID
};