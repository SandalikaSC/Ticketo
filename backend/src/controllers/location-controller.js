const { stationlocationUpdate, stationlocationInsert, getAllLocations } = require("../services/location-service");

const locationUpdate = async (req, res) =>
{
    const stationlocation = req.body;

    console.log(stationlocation);
    const result = await stationlocationUpdate(stationlocation);
    return res.status(200).json({ result: result });
}

const locationInsert = async (req, res) =>
{
    const stationlocation = req.body;

    const result = await stationlocationInsert(stationlocation);
    console.log("result here");
    console.log(result);
    return res.status(200).json({ result: result });
}

const getLocations = async (req, res) =>
{
    const scheduleId = req.body.scheduleId;
    console.log(scheduleId);
    const stations = await getAllLocations(scheduleId);
    return res.status(200).json({ stations });
}
module.exports = { locationInsert, locationUpdate, getLocations };