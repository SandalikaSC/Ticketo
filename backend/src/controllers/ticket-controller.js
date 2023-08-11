const { PrismaClient } = require("@prisma/client");
// const ticketService = require("../services/station-service");
const prisma = new PrismaClient();

//POST Request - Add user to a database
const addTicket = async (req, res) => {


    const { startStation, endStation, tripType, startDate, returnDate, passengers, classname } = req.body;

    // Validate startStation, endStation, tripType, startDate, returnDate, passengers, and classname
    if (!startStation || !endStation || tripType == null || !startDate || !returnDate || !passengers || !classname) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (parseInt(passengers) < 1) {
        return res.status(400).json({ error: 'Invalid number of passengers' });
    }
    const departureDay = new Date(Date.parse(startDate));
    const returnDay = tripType === 1 ? new Date(Date.parse(returnDate)) : null;

    const currentDate = new Date(); // Get the current date

    if (returnDay && (returnDay < departureDay)) {
        return res.status(400).json({ message: "Invalid date selection" });
    }


    // try {
    //     const stations = await stationService.getStations();

    //     if (stations) {
    //         return res.status(200).json({ stations: stations });
    //     } else {
    //         return res.status(400).json({ message: "Not found" });
    //     }
    // } catch (err) {
    //     return res.status(500).json({ message: "Internal Server Error" });
    // }
    return res.status(200).json({ message: "generated" });
}
module.exports = {
    addTicket
};
