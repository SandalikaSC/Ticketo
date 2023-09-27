const scheduleService = require('../../services/schedule-service')
const getGuardSchedules = async (req, res) =>
{
    const user = req.user;

    const schedule = await scheduleService.getGuardSchedule(user);
    console.log(schedule);
    return res.status(200).json({ schedule });
}

module.exports = {
    getGuardSchedules
};