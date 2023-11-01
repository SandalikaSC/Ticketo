
const { getSchedule, scheduleStations, getTripSchedules, getAllSchedulesByWorkingday, deleteSchedule } = require("../reposiotries/schedule-repository");
const { getStationId } = require('../reposiotries/station-repository')
const { getStationName } = require("../reposiotries/station-repository");
const { getReservedSeats } = require("../reposiotries/reservation-repository");
const { getTrain } = require("../reposiotries/trainRepository");
const { getReservationCoaches } = require("../reposiotries/coach-repository");
const { addTrainSchedule, getScheduleID, getSchedulebytrainID, getTrainBySchedule } = require("../reposiotries/schedule-repository");

function formatTime(time) {
    const date = new Date(time);

    // Format the time without the date
    const timeString = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Use 12-hour format with AM/PM
    });

    return timeString;
}


const addSchedule = async (startingStation, startingTime, destination, finishingTime, workingDays, stations, trainID,notWorkingDays) =>
{

    console.log("reached service");
    const startStationId = await getStationId(startingStation);
    const endStationId = await getStationId(destination);

    console.log(startStationId);
    console.log(endStationId);

    const addedSchedule = await addTrainSchedule(startStationId,endStationId,startingTime,
        finishingTime,workingDays, trainID, notWorkingDays, stations);


    // const getScheduleID = await getScheduleID(startStationId, endStationId, startingTime);

    // insert for each of the arrays in stations
    // await updateStationSchedule
    return addedSchedule;

}


const deleteSchedulebyID = async (scheduleId) => 
{
    try
    {
        const isDeleted = await deleteSchedule(scheduleId);
        return isDeleted;
    }catch(err){

        console.log(err);
        throw new Error(err.message);
    }
}

const getAllScheduleStations = async (scheduleId) =>
{
    // try
    // {
    //     const stations = await scheduleStations(scheduleId);
    //     const formattedStations = await Promise.all(
    //         stations.map(async (station) =>
    //         {
    //             const arrivalTime = formatTime(station.arrivalTime);
    //             const departureTime = formatTime(station.departureTime);
    //             const stationName = await getStationName(station.stationId);

    //             return {
    //                 id: station.id,
    //                 arrivalTime,
    //                 departureTime,
    //                 delayTime: station.delayTime,
    //                 stationName,
    //             };
    //         })
    //     );

    //     console.log(formattedStations);
    //     return formattedStations;
    // } catch (err)
    // {
    //     console.log(err);
    //     throw new Error(err.message);
    // }
}

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

//get schedule by train ID

const getAllSchedulebyID = async (trainID) =>
{
    try
    {
        const schedules = await getSchedulebytrainID(trainID);


    //     //sort schedules by scheduleID
    //     schedules.sort((a, b) => a.scheduleId - b.scheduleId);
    //     // Grouping the schedules by scheduleId
    //     const groupedSchedules = schedules.reduce((acc, schedule) => {
    //     const { scheduleId } = schedule;
    //     if (!acc[scheduleId]) {
    //       acc[scheduleId] = [];
    //     }
    //     acc[scheduleId].push(schedule);
    //     return acc;
    //   }, {});

        // Converting the grouped schedules object to a two-dimensional array
        // const formattedStations = Object.values(groupedSchedules);


        // console.log(formattedStations);
        return schedules;
    } catch (err)
    {

        console.log(err);
        throw new Error(err.message);
    }
}


//get schedules for reservation
const getScheduleByTrip = async (startStation, endStation, departureDate, returnDate) => {
    try {

        workingdays = getWorkingDayType(departureDate);
        return await selectSchedules(startStation, endStation, workingdays);
        // return await getTripSchedules(startStation, endStation, workingdays);
    } catch (error) {
        throw new Error("An error while retrieving data");
    }
}
const getWorkingDayType = (givenDate) => {

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
        var sortSchedule = [];


        schedules.forEach(async scheduleElement => {
            const stationSchedule = scheduleElement.StationSchedule;
            let startIndex = -1;
            let endIndex = -1;

            // Find the index of the start and end stations in the stationSchedule array
            for (let i = 0; i < stationSchedule.length; i++) {
                if (stationSchedule[i].stationId === startStation) {
                    startIndex = i;
                }
                if (stationSchedule[i].stationId === endStation) {
                    endIndex = i;
                }
            }

            // Check if both start and end stations were found in the schedule
            if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
                // If the start station appears before the end station, add this schedule to sortSchedule

                scheduleElement.starting = (await getStationName(scheduleElement.start))['name'];
                scheduleElement.ending = (await getStationName(scheduleElement.end))['name'];
                sortSchedule.push(scheduleElement);
            }

        });
        startStation = (await getStationName(startStation))['name'];
        endStation = (await getStationName(endStation))['name'];
        return {
            sortSchedules: sortSchedule,
            startStation: startStation,
            endStation: endStation,

        }
        console.log(sortSchedule);
        return sortSchedule;
    } catch (error) {
        throw new Error("An error while retrieving data");
    }

}
const getReservationSchedule = async (scheduleId, classname, depatureDate) => {
    try {
        const firstCoaches = [5, 6, 7];
        const secondCoaches = [8];
        const thirdCoaches = [3, 4];
        let coaches;
        if (classname == 'First Class') {
            coaches = firstCoaches;
        } else if (classname == 'Second Class') {
            coaches = secondCoaches;
        } else {
            coaches = thirdCoaches;
        }

        const trainId = await getTrainBySchedule(scheduleId);
        const coachArrangements = await getReservationCoaches(trainId.trainId, coaches);

        coachArrangements.forEach(async (coachArrangement) => {
            const { arrangementId, code, trainId, /* ... other properties ... */ } = coachArrangement;

            const seats = await getReservedSeats(arrangementId, parseCustomDate(depatureDate), scheduleId);
            coachArrangement.seats = seats;

            console.log(coachArrangement);
            console.log("next")
        });
        // console.log()


        return coachArrangements;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
}
function parseCustomDate(dateString) {
    const months = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    const parts = dateString.split(' ');
    const day = parseInt(parts[0], 10);
    const month = months[parts[1]];
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
}
module.exports = {
    getGuardSchedule,
    getScheduleByTrip,
    addSchedule,
    getAllScheduleStations,
    getAllSchedulebyID,

    deleteSchedulebyID,
    getReservationSchedule,
}
