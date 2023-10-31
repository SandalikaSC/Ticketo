const { stationlocationUpdate, stationlocationInsert, getAllLocations, getLocationDelays, scheduleUpdatesLatest } = require("../services/location-service");
const { scheduleUpdates } = require("../reposiotries/location-repository");

const locationUpdate = async (req, res) =>
{
    const stationlocation = req.body;

    // console.log(stationlocation);
    const result = await stationlocationUpdate(stationlocation);
    return res.status(200).json({ result: result });
}

const locationInsert = async (req, res) =>
{
    const stationlocation = req.body;

    const result = await stationlocationInsert(stationlocation);
    // console.log("result here");
    console.log(result);
    return res.status(200).json({ result: result });
}

const getLocations = async (req, res) =>
{
    const scheduleId = req.body.scheduleId;
    // console.log(scheduleId);
    const stations = await getAllLocations(scheduleId);
    return res.status(200).json({ stations });
}

const getDelays = async (req, res) =>
{
    // const notifications = [
    //     {
    //         trainName: "Samdra Devi",
    //         number: "T1234",
    //         destination: "Katugoda",
    //         currentLocation: "Colombo",
    //         arrival: "7.00AM",
    //         delay: "2",
    //     },
    //     {
    //         trainName: "Galu Kumari",
    //         number: "T4532",
    //         destination: "Colombo",
    //         currentLocation: "Galle",
    //         arrival: "8.30AM",
    //         delay: "1",
    //     },
    //     {
    //         trainName: "Ruhunu Kumari",
    //         number: "T1242",
    //         destination: "Hambantota",
    //         currentLocation: "Matara",
    //         arrival: "8.40AM",
    //         delay: "4",
    //     },
    //     {
    //         trainName: "Rajarata Rajini",
    //         number: "T7892",
    //         destination: "Kandy",
    //         currentLocation: "Rambukkana",
    //         arrival: "8.50AM",
    //         delay: "12",
    //     },
    //     {
    //         trainName: "Ella Express",
    //         number: "T3574",
    //         destination: "Ella",
    //         currentLocation: "Kandy",
    //         arrival: "9.02AM",
    //         delay: "18",
    //     },
    //     {
    //         trainName: "Galu Kumari",
    //         number: "T3574",
    //         destination: "Ella",
    //         currentLocation: "Kandy",
    //         arrival: "9.02AM",
    //         delay: "18",
    //     },
    //     {
    //         trainName: "Galu Kumari",
    //         number: "T3574",
    //         destination: "Ella",
    //         currentLocation: "Kandy",
    //         arrival: "9.02AM",
    //         delay: "18",
    //     },
    //     {
    //         trainName: "Sagarika",
    //         number: "T9512",
    //         destination: "Maradana",
    //         currentLocation: "Kaluthara",
    //         arrival: "9.03AM",
    //         delay: "25",
    //     },
    // ];
    //console.log(notifications);

    const notifications = await getLocationDelays();
    return res.status(200).json({ notifications });
}

const getAllUpdates = async (req, res) =>
{
    const scheduleupdates = await scheduleUpdatesLatest();
    //console.log("schedule updates", scheduleupdates);
    // return scheduleupdates;
    return res.status(200).json({ scheduleupdates });
}
module.exports = { locationInsert, locationUpdate, getLocations, getDelays, getAllUpdates };