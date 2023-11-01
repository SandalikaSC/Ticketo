const { PrismaClient } = require("@prisma/client");
const { parse } = require("path");
const prisma = new PrismaClient();


const updateLocation = async (locationData) =>
{
    const id = parseInt(locationData.id);

    // Check if a record with the provided id exists
    const existingRecord = await prisma.locationShare.findUnique({
        where: { id },
    });

    if (!existingRecord)
    {
        throw new Error(`Record with id ${id} not found`);
    }

    const actualDepartureTime = new Date(locationData.actualDepartureTime);

    // Convert departureTime to a Date object
    const departureTime = new Date(locationData.departureTime);

    // Calculate the time difference in minutes
    const delayDeparture = (actualDepartureTime - departureTime) / (1000 * 60) - 28314000;

    const currentDate = new Date();

    const delayDepartureString = delayDeparture.toString();
    const dd = locationData.delayDeparture.toString();

    const arrivalStatus = parseInt(locationData.arrivalStatus);

    return await prisma.locationShare.update({
        where: { id },
        data: {
            actualDepartureTime: currentDate,
            delaydeparture: dd,
            reason: locationData.reason,
            arrived: arrivalStatus,
        },
    });
}



const insertLocation = async (locationData) =>
{
    const actualArrivalTime = new Date(locationData.actualArrivalTime);

    // Extract the time from actualArrivalTime
    const arrivalTimeParts = locationData.arrivalTime.split(' ')[1].split(':');
    const arrivalTimeHours = parseInt(arrivalTimeParts[0]);
    const arrivalTimeMinutes = parseInt(arrivalTimeParts[1]);
    actualArrivalTime.setHours(arrivalTimeHours, arrivalTimeMinutes, 0, 0);

    // Calculate the time difference in minutes
    const delayArrival = (actualArrivalTime - locationData.arrivalTime) / (1000 * 60) - 28314000;

    const currentDate = new Date();

    // Convert delayArrival to a string
    const delayArrivalString = delayArrival.toString();

    const delayDeparture = locationData.delayDeparture.toString();
    const date = locationData.date.toString();
    const arrivalStatus = parseInt(locationData.arrivalStatus);
    const da = locationData.delayArrival.toString();
    const result = await prisma.locationShare.create({
        data: {
            scheduleId: locationData.scheduleId,
            actualArrivalTime: currentDate,
            delayarrival: da, // Convert delayArrival to a string
            actualDepartureTime: currentDate,
            delaydeparture: delayDeparture, // Convert delayDeparture to a string
            reason: locationData.reason,
            stationId: locationData.stationId,
            date: date,
            arrived: arrivalStatus,
        },
    });
    console.log(result);
    return result;
}

const getAllLocation = async () =>
{
    return await prisma.locationShare.findMany();
}

const scheduleUpdates = async () =>
{
    const currentDate = new Date().toISOString().split('T')[0];

    // Query the LocationShare table
    const scheduleUpdates = await prisma.locationShare.findMany({
        where: {
            arrived: 2,
            date: {
                startsWith: currentDate,
            },
        },
        orderBy: {
            date: 'desc',
        },
        distinct: ['scheduleId'],
        select: {
            scheduleId: true,
            stationId: true,
        },
    });

    console.log(scheduleUpdates);
    return scheduleUpdates;
}

const getAllScheduleIds = async () =>
{
    return await prisma.schedule.findMany({
        select: {
            scheduleId: true,
        },
    });
}




module.exports = { updateLocation, insertLocation, getAllLocation, scheduleUpdates };