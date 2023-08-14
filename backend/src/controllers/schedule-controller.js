const { PrismaClient } = require("@prisma/client");
// const ticketService = require("../services/schedule-service");
const prisma = new PrismaClient();

//POST Request - Add user to a database
const getSchedules = async (req, res) => {


    const { startStation, endStation, tripType, startDate, returnDate, passengers, classname } = req.body;
    // // Validate startStation, endStation, tripType, startDate, returnDate, passengers, and classname
    if (!startStation || !endStation || tripType == null || !startDate) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (tripType == 1) {
        if (!returnDate) {
            return res.status(400).json({ error: 'Return Date Missing' });
        }
    }
    return res.status(200).json({ messege: 'get schedules' });

    // if (parseInt(passengers) < 1) {
    //     return res.status(400).json({ error: 'Invalid number of passengers' });
    // }
    // if (classname.toLowerCase() == 'first class') {
    //     return res.status(400).json({ error: 'First class only has reservations' });
    // }

    // const departureDay = new Date(startDate).toISOString();
    // const returnDay = tripType === 1 ? new Date(returnDate).toISOString() : null;


    // if (returnDay && (returnDay < departureDay)) {
    //     return res.status(400).json({ message: "Invalid date selection" });
    // }
    // if (!user.accountStatus) {
    //     return res.status(400).json({ message: "Oops! It looks like there are some pending payments" });
    // }
    // try {
    //     const { qrCode, ticket } = await ticketService.addTicket(startStation, endStation, tripType, departureDay, returnDay, passengers, classname.toLowerCase(), user);

    //     if (qrCode && ticket) {
    //         return res.status(200).json({ ticket, qrCode });
    //     } else {
    //         return res.status(400).json({ message: "Ticket and/or QR code not available." });
    //     }
    // } catch (err) {
    //     return res.status(500).json({ message: "Internal Server Error" });
    // }

}
module.exports = {
    getSchedules
};
