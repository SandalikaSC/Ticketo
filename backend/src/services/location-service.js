const { updateLocation, insertLocation } = require('../reposiotries/location-repository');

const stationlocationUpdate = async (stationlocation) =>
{
    return await updateLocation(stationlocation);

}

const stationlocationInsert = async (stationlocation) =>
{
    return await insertLocation(stationlocation);
}

module.exports = { stationlocationUpdate, stationlocationInsert };