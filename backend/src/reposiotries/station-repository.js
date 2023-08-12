const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllStations = async () =>
{
    return await prisma.station.findMany({
        orderBy: { name: 'asc' }, // Order by 'name' in ascending order (alphabetical)
    });
};

const getStationId = async (stationName) =>
{
    try
    {
        const station = await prisma.station.findFirst({
            where: {
                name: stationName
            },
            select: {
                stationId: true
            }
        });

        if (station)
        {
            return station.stationId;
        } else
        {
            return null;
        }
    } catch (error)
    {
        console.error("Error in getStationId:", error);
        throw new Error("An error occurred while fetching station ID");
    }
};
module.exports = {
    getAllStations,
    getStationId
};


