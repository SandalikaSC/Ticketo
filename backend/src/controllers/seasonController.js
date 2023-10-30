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
const getSeason = async (req, res) => {


    const user = req.user;
    try {
        const myseason = await seasonService.getSeasonbyUser(user.id);
        const seasonReq = await seasonService.getSeasonRequestbyUser(user.id);


        if (myseason || seasonReq) {
            // At least one of them is not null, so return 200
            return res.status(200).json({ myseason, seasonReq });
        } else {
            // Both are null, still return 200
            return res.status(200).json({ myseason, seasonReq });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
const getSeasonRequest = async (req, res) => {


    const user = req.user;
    try {
        const tickets = await seasonService.getSeasonRequestbyUser(user.id);

        if (tickets) {
            return res.status(200).json(tickets);
        } else {
            return res.status(404).json(tickets);
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
module.exports = {
    addSeasonRequest,
    getSeason,
    getSeasonRequest
};
