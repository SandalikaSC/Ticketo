const { PrismaClient } = require("@prisma/client");
const scheduleService = require("../services/schedule-service");
const authService = require('../services/auth-service');
const prisma = new PrismaClient();

const getResevationSchedules = async (req, res) => {


    const { startStation, endStation, departureDate, returnDate } = req.body;
    // // Validate startStation, endStation, tripType, startDate, returnDate, passengers, and classname


    if (!startStation || !endStation || !departureDate) {
        console.log(startStation, endStation, departureDate);
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        console.log("err");
        const schedules = await scheduleService.getScheduleByTrip(startStation, endStation, departureDate, returnDate);

        if (schedules) {
            return res.status(200).json({ schedules: schedules });
        } else {
            return res.status(400).json({ message: "Not schedules" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }



}


//Adding schedules to trains
const addTrainSchedule = async (req, res) => {
    console.log("reached controller");
    const { startingStation, startingTime, destination, finishingTime, workingDays, stations, trainID } = req.body;
    if (!startingStation || !destination || !startingTime || !finishingTime) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        console.log("test1");
        const authHeader = req.headers.authorization;
        const submittedUser = await authService.verifyToken(authHeader);
        const id = submittedUser.id;
        if (submittedUser.userType.includes("CONTROL_CENTRE")) {
            console.log("test2");
            const addTrainSchedules = await scheduleService.addSchedule(startingStation, startingTime, destination, finishingTime, workingDays, stations, trainID);
            if (addTrainSchedules) {
                console.log("Ok!!");
                res.status(201).json({ message: "Schedule added successfully", addTrainSchedules });
            }
        }
    } catch (error) {
        console.error("Error fetching schedules:", error);
    }
}
const getReservationSchedule = async (req, res) => {


    const { scheduleId, classname, depatureDate } = req.body;
    // // Validate startStation, endStation, tripType, startDate, returnDate, passengers, and classname

    if (!scheduleId || !depatureDate || !classname) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        console.log("err");
        const coachArrangements = await scheduleService.getReservationSchedule(scheduleId, classname, depatureDate);

        if (coachArrangements) {
            return res.status(200).json({ coachArrangements });
        } else {
            return res.status(400).json({ message: "Not coachArrangements" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }



}
module.exports = {
    getResevationSchedules,
    addTrainSchedule,
    getReservationSchedule
};
