const { getSchedule, getTripSchedules, getAllSchedulesByWorkingday } = require("../reposiotries/schedule-repository");
const { getStationName } = require("../reposiotries/station-repository");
const { getTrain } = require("../reposiotries/trainRepository");

// const getGuardSchedule = async (userId) =>
// {
//     try
//     {
//         const schedule = await getSchedule(userId);

//         console.log(schedule);
//         // const startStation = await getStationName(schedule.start);
//         // console.log(startStation);

//         // const train = await getTrain(schedule.trainId);
//         // console.log(train.trainName);
//     } catch (err)
//     {
//         console.log(err);
//         throw new Error(err.message);
//     }
// }

const getGuardSchedule = async (user) => {
    try {
        const schedules = await getSchedule(user.id);

        // Fetch station and train information for each schedule
        const schedulesWithInfo = await Promise.all(
            schedules.map(async (schedule) => {

                const startStation = await getStationName(schedule.start);

                const endStation = await getStationName(schedule.end);

                const train = await getTrain(schedule.trainId);

                // Create a new schedule object with additional information
                return {
                    ...schedule,
                    startStationName: startStation,
                    endStationName: endStation,
                    trainName: train.trainName,
                };
            })
        );

        // console.log(schedulesWithInfo);
        return schedulesWithInfo;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
}
//get scheduleses for reservation
const getScheduleByTrip = async (startStation, endStation, departureDate, returnDate) => {
    try {

        workingdays = getWorkingDayType(departureDate);
        schedule = selectSchedules(startStation, endStation, workingdays);
        // return await getTripSchedules(startStation, endStation, workingdays);
    } catch (error) {
        throw new Error("An error while retrieving data");
    }
}
const getWorkingDayType = async (givenDate) => {

    // Parse the input date string into a Date object
    const date = new Date(givenDate);

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0) {
        return "SUNDAY";
    } else if (dayOfWeek === 6) {
        return "WEEKENDS"; // Saturday is considered part of the weekend
    } else {
        return "WEEKDAYS"; // Monday to Friday
    }
}
const selectSchedules = async (startStation, endStation, workingdays) => {
    try {

        const schedules = await getAllSchedulesByWorkingday(workingdays);



        schedules.forEach(element => {
            const stationSchedule = element.StationSchedule;

            stationSchedule.forEach(station => {
                if (station.id == startStation.id) {

                }

            });


        });

        console.log("set");
    } catch (error) {
        throw new Error("An error while retrieving data");
    }

}

module.exports = {
    getGuardSchedule,
    getScheduleByTrip
}
