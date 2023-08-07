const { addStationMasterToDatabase } = require("../repositories/stationMasterRepository");
const bcrypt = require("bcrypt");

const addStationMaster = async (name, email, nic, mobileNumber) => {
  try {
    // Check if the station master with the given email already exists
    const existingStationMaster = await getStationMasterByEmail(email);

    if (existingStationMaster) {
      console.log("Station master with this email already exists");
      return existingStationMaster;
    }

    // Split the name into firstName and lastName
    const [firstName, lastName] = name.split(" ");

    // Derive the date of birth from the first 6 characters of the NIC number
    const dob = nic.substring(0, 6);

    // Hash the password before storing it in the database
    const hashedPassword = bcrypt.hashSync(nic, 10);

    // Set the userType to "station master"
    const userType = "station master";

    // Add the new station master to the database
    const newStationMaster = await addStationMasterToDatabase(
      firstName,
      lastName,
      email,
      hashedPassword,
      userType,
      nic,
      mobileNumber,
      dob, // Pass the date of birth to the repository function
    );

    return newStationMaster;
  } catch (err) {
    console.log(err);
    throw new Error("Error adding station master to the database");
  }
};

module.exports = {
  addStationMaster,
  // Add other exported functions
};
