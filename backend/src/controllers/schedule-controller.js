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


//Adding schedules to trains
const addTrainSchedule = async (req, res) => {
    console.log("reached controller");
    let { startingStation, startingTime, destination, finishingTime, workingDays, stations, trainID } = req.body;
    if (!startingStation || !destination || !startingTime || !finishingTime) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try{
        console.log("test1");
        const authHeader = req.headers.authorization;
        const submittedUser = await authService.verifyToken(authHeader);
        const id = submittedUser.id;
        
        //converting the times into the ISO format
        let timeParts = startingTime.split(":");
        let isoFormattedTime = new Date(2023, 11, 1, timeParts[0], timeParts[1]).toISOString();

        console.log(isoFormattedTime);

        let timeParts1 = finishingTime.split(":");
        let isoFormattedTime1 = new Date(2023, 11, 1, timeParts1[0], timeParts1[1]).toISOString();
        
        //Assigning new values
        startingTime = isoFormattedTime;
        finishingTime = isoFormattedTime1;
        console.log(startingTime);
        console.log(finishingTime);

        const days = new Array("WEEKDAYS",
            "WEEKENDS",
            "SUNDAY",
            "HOLIDAY");

        const notWorkingDays = [];

        days.forEach(element => {
            workingDays.forEach(day => {
                if(element != day){
                    notWorkingDays.push(element);
                }
            });
        });

        console.log(notWorkingDays);
        console.log(typeof(notWorkingDays));

        if (submittedUser.userType.includes("CONTROL_CENTRE"))
        {
            console.log("test2");
            const addTrainSchedules = await scheduleService.addSchedule(startingStation, startingTime, destination, finishingTime, workingDays, stations, trainID, notWorkingDays);
            if(addTrainSchedules){
                console.log("Ok!!");
                res.status(201).json({ message: "Schedule added successfully", addTrainSchedules });
            }
        }
    }catch(error)
    {
        console.error("Error fetching schedules:", error);
    }
}

module.exports = {
    getResevationSchedules,
    addTrainSchedule
};
