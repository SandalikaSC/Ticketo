const scheduleService = require('../../services/schedule-service')
const getGuardSchedules = async (req, res) =>
{
    const user = req.user;

    const schedule = await scheduleService.getGuardSchedule(user);
    console.log(schedule);
    return res.status(200).json({ schedule });
}

const getAllScheduleStations = async (req, res) =>
{
    const scheduleId = req.body.scheduleId;
    console.log(scheduleId);
    const stations = await scheduleService.getAllScheduleStations(scheduleId);
    return res.status(200).json({ stations });
}

const getTrainSchedules = async (req, res) => {
    try {
        //get trainId as a query parameter
        const { trainId } = req.query.trainId; 

        if (!trainId) {
            return res.status(400).json({ message: 'Train ID is missing in the request' });
        }

        const schedules = await scheduleService.getAllSchedulebyID(trainId);

        if (!schedules) {
            return res.status(404).json({ message: 'No schedules found for the provided train ID' });
        }

        console.log(schedules);
        return res.status(200).json({ schedules });
    } catch (error) {
        console.error('Error fetching train schedules:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    getGuardSchedules,
    getAllScheduleStations,
    getTrainSchedules
};