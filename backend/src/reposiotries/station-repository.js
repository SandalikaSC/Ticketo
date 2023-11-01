const { PrismaClient } = require('@prisma/client');
const { appendFile } = require('fs');
const prisma = new PrismaClient();

const getAllStations = async () => {
    //Get the stations
    return await prisma.station.findMany({
        orderBy: { name: 'asc' },
    });

 

};

const getStationId = async (stationName) => {
    try {
        const station = await prisma.station.findFirst({
            where: {
                name: stationName
            },
            select: {
                stationId: true
            }
        });

        if (station) {
            return station.stationId;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error in getStationId:", error);
        throw new Error("An error occurred while fetching station ID");
    }
};
const getStationName = async (id) => {

    // console.log("inside the get station name", id);

    return await prisma.station.findUnique({
        where: {
            stationId: id
        },
        select: {
            name: true
        }
    });
};

const getStation = async (stationId) =>
{
    try
    {
        //console.log("inside get station", stationId);
        // Use Prisma's findOne method to query the station table by stationId
        const station = await prisma.station.findUnique({
            where: {
                stationId: stationId,
            },
        });

        return station;
    } catch (error)
    {
        // Handle any potential errors
        throw new Error(`Error fetching station: ${error.message}`);
    }
};

module.exports = {
    getAllStations,
    getStationId,
    getStationName,
    getStation

};


