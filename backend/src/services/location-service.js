const { updateLocation, insertLocation, getAllLocation } = require('../reposiotries/location-repository');
const { getScheduleDetails } = require('../reposiotries/schedule-repository');
const { getTrain } = require('../reposiotries/trainRepository');
const { getStationName } = require("../reposiotries/station-repository");


const stationlocationUpdate = async (stationlocation) =>
{
    return await updateLocation(stationlocation);

}

const stationlocationInsert = async (stationlocation) =>
{
    return await insertLocation(stationlocation);
}

const getAllLocations = async (scheduleId) =>
{
    try
    {
        const stations = await getLocation(scheduleId);
        // const formattedStations = await Promise.all(
        //     stations.map(async (station) =>
        //     {
        //         const arrivalTime = formatTime(station.arrivalTime);
        //         const departureTime = formatTime(station.departureTime);
        //         const stationName = await getStationName(station.stationId);

        //         return {
        //             id: station.id,
        //             arrivalTime,
        //             departureTime,
        //             delayTime: station.delayTime,
        //             stationName,
        //         };
        //     })
        // );

        //console.log(formattedStations);
        return formattedStations;
    } catch (err)
    {
        console.log(err);
        throw new Error(err.message);
    }
}

const getLocationDelays = async () =>
{
    const delays = await getAllLocation();
    // console.log("inside getlocation service");
    // console.log(delays);
    const delaysWithSchedules = [];

    // for (const delay of delays)
    // {
    //     const { scheduleId, stationId } = delay;
    //     console.log("Schedule id is here", scheduleId);
    //     const scheduleDetails = await getScheduleDetails(scheduleId);
    //     console.log("schedule details", scheduleDetails);

    //     //const { trainId, start, end } = scheduleDetails;

    //     const trainId = scheduleDetails[0].trainId;
    //     const start = scheduleDetails[0].start;
    //     const end = scheduleDetails[0].end;
    //     console.log("train id", trainId);
    //     const train = trainId ? await getTrain(trainId) : null;
    //     const startStation = start ? await getStationName(start) : null;
    //     const endStation = end ? await getStationName(end) : null;
    //     const stationName = stationId ? await getStationName(stationId) : null;
    //     // if (scheduleDetails)
    //     // {
    //     //     // Combine schedule details with the delay item
    //     //     const combinedItem = { ...delay, schedule: scheduleDetails, startStation, endStation, train: train };
    //     //     delaysWithSchedules.push(combinedItem);
    //     // }
    //     const newDelay = {
    //         id: delay.id,
    //         arrival: delay.actualArrivalTime,
    //         delayarrival: delay.delayarrival,
    //         actualDepartureTime: delay.actualDepartureTime,
    //         delay: delay.delaydeparture,
    //         reason: delay.reason,
    //         scheduleId: delay.scheduleId,
    //         stationId: delay.stationId,
    //         date: delay.date,
    //         arrived: delay.arrived,
    //         currentLocation: startStation ? startStation.name : null,
    //         destinantion: endStation ? endStation.name : null,
    //         stationName: stationName ? stationName.name : null,
    //         trainId: train ? train.trainId : null,
    //         trainName: train ? train.trainName : null,
    //         number: train ? train.trainNumber : null,
    //     };

    //     delaysWithSchedules.push(newDelay);


    // }

    console.log("delays with schedules", delaysWithSchedules);
    return delaysWithSchedules;
}
module.exports = { stationlocationUpdate, stationlocationInsert, getAllLocations, getLocationDelays };