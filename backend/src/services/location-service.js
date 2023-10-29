const { updateLocation, insertLocation } = require('../reposiotries/location-repository');

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

module.exports = { stationlocationUpdate, stationlocationInsert, getAllLocations };