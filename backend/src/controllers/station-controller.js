const { PrismaClient } = require("@prisma/client");
const stationService = require("../services/station-service");
const prisma = new PrismaClient();

//POST Request - Add user to a database
const getAllStations = async (req, res) => {
    try {
        const stations = await stationService.getStations();

        if (stations) {
            return res.status(200).json({ stations: stations });
        } else {
            return res.status(400).json({ message: "Not found" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = {
    getAllStations
};
