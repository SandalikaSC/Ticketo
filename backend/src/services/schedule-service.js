const { getSchedule, getTripSchedules } = require("../reposiotries/schedule-repository");
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

        workingdays = ['WEEKEND'];
        return await getTripSchedules(startStation, endStation, workingdays);
    } catch (error) {
        throw new Error("An error while retrieving data");
    }
}


module.exports = {
    getGuardSchedule,
    getScheduleByTrip
}
