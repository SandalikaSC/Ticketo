const { PrismaClient } = require('@prisma/client');
const { parse } = require('path');
const prisma = new PrismaClient();
const { getStationId, getStationName } = require("../reposiotries/station-repository");
 
const addTrainSchedule = async (startStationId,endStationId,startingTime,
    finishingTime,workingDays,trainID,notWorkingDays, stations) => 
    {  

        console.log(stations);

        //Convert trainID to int
        trainIdInteger = parseInt(trainID);

    const added = await prisma.schedule.create({
        data:{ 
            startTime: startingTime,
            endTime: finishingTime,
            start: startStationId,
            end: endStationId,
            driverId: " ",
            trainId: trainIdInteger,
            WorkingDays: workingDays,
            notWorking: notWorkingDays
        }
    });

    console.log(added);

    if(added){
        for (let station of stations) {
            console.log("got into stations");
            const stationid = await getStationId(station.stationName);
            console.log(typeof(stationid));
            console.log(stationid);
            //
            let timeParts = station.arrivalTime.split(":");
            let arrival = new Date(2023, 11, 1, timeParts[0], timeParts[1]).toISOString();

            let timeParts3= station.departureTime.split(":");
            let departure = new Date(2023, 11, 1, timeParts3[0], timeParts3[1]).toISOString();

            await prisma.stationSchedule.create({
              data: {
                arrivalTime: arrival,
                waitingTime: station.waitingTime,
                departureTime: departure,
                delayTime: 0,
                scheduleId: added.scheduleId,
                stationId: stationid
              },
            });
          }

        return true;
    }

    
};

const deleteSchedule = async(scheduleID) => {
    const scheduleid = parseInt(scheduleID);

    return await prisma.schedule.delete({
        where: {
            scheduleId: scheduleid
        }
    });
}

//Gets all schedules by trainID
const getSchedulebytrainID = async(trainID) => {
    const train = parseInt(trainID);

    let temp = await prisma.schedule.findMany({
        where: {
            trainId: train,
        },
    });

    // for(let t of temp){
    //     const startS = await getStationName(t.start);
    //     t.start = startS;
    //     const endS = await getStationName(t.end);
    //     t.end = endS;
    // }

    return temp;
    
}

const getScheduleID = async (startStationId,endStationId,startingTime) => {
    return await prisma.station.findUnique({
        where: {
            start: startStationId,
            end: endStationId,
            startTime: startingTime,
            trainId: '4'
        },
        select: {
            scheduleId: true
        }
    });
}

const getSchedule = async (userId) =>
{
    return await prisma.schedule.findMany({
        where: {
            driverId: userId,
        },
    });
};

const getTripSchedules = async (startStation, endStation, working) =>
{
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
const getAllSchedulesByWorkingday = async (workingday) =>
{

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

const scheduleStations = async (trainID) =>
{

    //Have to get the individual stations
    return await prisma.schedule.findMany({
        where: {
            trainId: trainID,
        },
    });
};

const getScheduleDetails = async (scheduleId) =>
{
    const sId = parseInt(scheduleId);
    return await prisma.schedule.findMany({
        where: {
            scheduleId: sId,
        },
    });
};

module.exports = {
    getSchedule,
    getTripSchedules,
    getAllSchedulesByWorkingday,
    addTrainSchedule,
    getScheduleID,
    getSchedulebytrainID,
    scheduleStations,
    deleteSchedule
};