const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllStations = async () =>
{
    return await prisma.station.findMany({
        orderBy: { name: 'asc' },
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
const getStationName = async (id) =>
{

    console.log("inside the get station name", id);

    return await prisma.station.findUnique({
        where: {
            stationId: id
        },
        select: {
            name: true
        }
    });
};
module.exports = {
    getAllStations,
    getStationId,
    getStationName

};


