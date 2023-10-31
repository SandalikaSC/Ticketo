const { PrismaClient } = require('@prisma/client');
const { appendFile } = require('fs');
const prisma = new PrismaClient();

const getAllStations = async () =>
{
    //Get the stations
    return await prisma.station.findMany({
        orderBy: { name: 'asc' },
    });
};

const getAllStationsWithSMs = () => {
    //Get the stations
    return prisma.station.findMany({
        orderBy: { name: 'asc' },
    });

    //Get station master details
    // const stationM = await prisma.user.findMany({
    //     where: {
    //         userType: {
    //             has: 'STATION_MASTER'
    //         }
    //     }
    // });

    //get station master id and station id
    // const employeeData = await prisma.employee.findMany({
    //     select: {
    //         employeeId: true,
    //         stationId: true,
    //     },
    // });

    const stationsWithEmployees = [];

    stations.forEach(element => {
        const employeeArray = [];
        employeeArray.push(element.stationId);
        employeeArray.push(element.name);
        employeeArray.push(element.contactNumber);
        employeeArray.push(element.latitude);
        employeeArray.push(element.longitude);
        stationsWithEmployees.push(employeeArray);
    });

    stationsWithEmployees.forEach(element => {
        employeeData.forEach(empData => {
            element.push(empData.employeeId);
        });
    });

    // stationsWithEmployees.forEach(element => {
    //     stationM.forEach(master => {
    //         if(element[5] = master.id){
    //             console.log(master.firstName);
    //             element.push(master.firstName);
    //             element.push(master.lastName);
    //             element.push(master.mobileNumber);
    //             element.push(master.loginStatus);
    //         }
            
    //     });
    // });

    stationM.forEach(master => {
        stationsWithEmployees.forEach(element => {
            if(element[5] = master.id){
                console.log(master.firstName);
                element.push(master.firstName);
                element.push(master.lastName);
                element.push(master.mobileNumber);
                element.push(master.loginStatus);
            }
        });
    });

    console.log(typeof(stations));

    return stationsWithEmployees;
    
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
    getStationName,
    getAllStationsWithSMs

};


