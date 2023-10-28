const bcrypt = require("bcrypt");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addStationMasterToDatabase = async (firstName, lastName, email, password, userType, nic, mobileNumber, dob) =>
{
  try
  {
    const newStationMaster = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        userType: { set: [userType] },
        nic,
        mobileNumber,
        dob,
      }
    });

    return newStationMaster;
  } catch (err)
  {
    console.log(err);
    throw new Error("Internal Server Error");
  }
};

const getAllStationMasters = async () =>
{

  const stationMasters = await prisma.user.findMany({
    where: {
      userType: {
        has: "STATION_MASTER" // Use "in" to filter by enum values
      }
    }
  });

  return stationMasters;

}
module.exports = {
  addStationMasterToDatabase,
  getAllStationMasters,
};
