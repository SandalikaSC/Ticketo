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

module.exports = {
  addStationMasterToDatabase
};
