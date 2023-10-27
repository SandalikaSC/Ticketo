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

module.exports = {
    getGuardSchedules,
    getAllScheduleStations
};