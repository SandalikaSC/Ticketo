const seasonService = require("../services/seasonService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addSeasonRequest = async (req, res) => {


    const user = req.user;
    const { duration, startStation, endStation, designation, workplace, workplaceAddress, seasonType, seasonClass, applicationForm } = req.body;
    if (
        !duration ||
        !startStation ||
        !endStation ||
        !designation ||
        !workplace ||
        !workplaceAddress ||
        !seasonType ||
        !seasonClass || !applicationForm
    ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }


    try {
        console.log("controller");
        const requestStatus = await seasonService.makeSeasonRequest(user.id, duration, startStation, endStation, designation, workplace, workplaceAddress, seasonType, seasonClass, applicationForm);

        if (requestStatus) {
            return res.status(200).json(requestStatus);
        } else {
            return res.status(400).json({ message: "Something went wrong" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
module.exports = {
    addSeasonRequest
};
