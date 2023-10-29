//const { addStationMasterToDatabase } = require("../repositories/stationMasterRepository");
const bcrypt = require("bcrypt");
const { getAllStationMasters, addStationMasterToDatabase } = require("../reposiotries/stationMasterRepository");
const { getStationName } = require("../reposiotries/station-repository");
const addStationMaster = async (name, email, nic, mobileNumber) =>
{
  try
  {
    const existingStationMaster = await getStationMasterByEmail(email);

    if (existingStationMaster)
    {
      console.log("Station master with this email already exists");
      return existingStationMaster;
    }
    const [firstName, lastName] = name.split(" ");

    const dob = nic.substring(0, 6);

    const hashedPassword = bcrypt.hashSync(nic, 10);

    const userType = "station master";

    const newStationMaster = await addStationMasterToDatabase(
      firstName,
      lastName,
      email,
      hashedPassword,
      userType,
      nic,
      mobileNumber,
      dob,
    );

    return newStationMaster;
  } catch (err)
  {
    console.log(err);
    throw new Error("Error adding station master to the database");
  }
};
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const stationMasterAll = async () =>
{
  try
  {
    const stationMasters = await getAllStationMasters();
    // Call the function to get station IDs for each station master
    const stationMastersWithStationInfo = await getStationMasterStations(stationMasters);
    console.log(stationMastersWithStationInfo);

    return stationMastersWithStationInfo;
  } catch (err)
  {
    console.log(err);
    throw new Error("Error getting station masters");
  }
};

const getStationMasterStations = async (stationMasters) =>
{
  const stationMasterWithStations = [];
  for (const stationMaster of stationMasters)
  {
    // Replace 'YOUR_PRISMA_QUERY' with the query to fetch the station ID for the station master
    const stationInfo = await prisma.employee.findUnique({
      where: { employeeId: stationMaster.id },
      select: {
        station: {
          select: {
            stationId: true,
          },
        },
      },
    });

    console.log(stationInfo?.station?.stationId);
    const stationName = await getStationName(stationInfo?.station?.stationId);

    console.log(stationName);

    stationMasterWithStations.push({
      ...stationMaster,
      stationId: stationInfo?.station?.stationId, stationName: stationName?.name,
    });
  }

  return stationMasterWithStations;
};

module.exports = {
  addStationMaster, stationMasterAll, getStationMasterStations
};
