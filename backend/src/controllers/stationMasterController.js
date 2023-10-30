const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { stationMasterAll } = require("../services/stationmasterservice");


const addStationMaster = async (req, res) =>
{
  const { name, email, nic } = req.body;

  // Split the name into firstName and lastName
  const [firstName, lastName] = name.split(" ");

  // Derive the date of birth from the first 6 characters of the NIC number
  const dob = nic.substring(0, 6);

  try
  {
    // Hash the NIC number to use it as the password
    const hashedPassword = await bcrypt.hash(nic, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        nic,
        mobileNumber: req.body.mobileNumber,
        dob, // Add the date of birth
        password: hashedPassword, // Save the hashed NIC as the password
      },
    });

    return res.status(200).json({ message: "Station master added successfully" });
  } catch (error)
  {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getStationMasters = async (req, res) =>
{
  //console.log("inside get station master function");
  const stationMasters = await stationMasterAll();
  console.log(stationMasters);
  return res.status(200).json({ stationMasters });
}

module.exports = {
  addStationMaster, getStationMasters
};
