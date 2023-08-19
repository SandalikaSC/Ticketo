const { addStationMasterToDatabase } = require("../repositories/stationMasterRepository");
const bcrypt = require("bcrypt");

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

module.exports = {
  addStationMaster,
};
