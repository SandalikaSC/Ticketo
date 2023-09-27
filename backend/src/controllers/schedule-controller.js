const { PrismaClient } = require("@prisma/client");
const scheduleService = require("../services/schedule-service");
const prisma = new PrismaClient();

const getResevationSchedules = async (req, res) => {


    const { startStation, endStation, departureDate, returnDate } = req.body;
    // // Validate startStation, endStation, tripType, startDate, returnDate, passengers, and classname
    if (!startStation || !endStation || !departureDate) {
        console.log(startStation, endStation, departureDate);
        return res.status(400).json({ error: 'Missing required fields' });
    }


    try {

        const schedules = await scheduleService.getScheduleByTrip(startStation, endStation, departureDate, returnDate);

        if (schedules) {
            return res.status(200).json({ schedules: schedules });
        } else {
            return res.status(400).json({ message: "Not schedules" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }



}
module.exports = {
    getResevationSchedules
};
