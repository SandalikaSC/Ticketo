const { PrismaClient } = require("@prisma/client");
const AuthService = require("../services/auth-service");
const OTPService = require("../services/otp-service");
const middlewareService = require("../middleware/authenticate");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
//POST Request - Add user to a database
const signup = async (req, res) =>
{
  const { firstName, lastName, email, password, userType, nic, mobileNumber } = req.body;

  // console.log(userType);
  try
  {
    const existingUser = await AuthService.signup(firstName, lastName, email, password, userType, nic, mobileNumber);

    if (existingUser)
    {
      return res.status(400).json({ message: "User already exists! Login instead" });
    }

    return res.status(200).json({ message: "User adding successful" });

  } catch (err)
  {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// POST Request - Login existing user
const login = async (req, res) =>
{
const p = 'ticketo123';
const costFactor = 10;

const hashPassword = bcrypt.hashSync(p, costFactor);
console.log(hashPassword);
  const { email, password } = req.body;
  // email and password validations gone here
  if (!(email && password))
  {
    res.status(400).json("All input is required");
    return;
  }

  try
  {
    const { accessToken, refreshToken, userType } = await AuthService.login(email, password);
    return res.status(200).json({ accessToken, refreshToken, userType });
  } catch (error)
  {
    return res.status(400).json({ message: error.message });
  }
};


// GET Request - Get user details using the JWT token
const getUser = async (req, res) =>
{
  const id = req.id;
  console.log(req.id);
  try
  {
    // Find the user in the database based on their user ID
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { id: true, firstName: true, email: true, userType: true },
    });

    // Check if the user exists
    if (!user)
    {
      return res.status(404).json({ message: "User not found" });
    }
    // Return the user details in the response
    return res.status(200).json({ user });
  } catch (err)
  {
    // Handle the error if any occurred during the database query
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const refreshToken = async (req, res, next) =>
{
  const { refreshToken } = req.body;

  if (!refreshToken)
  {
    console.log("refresh token not found");
    res.status(400).json("refresh token not found");
    return;
  }

  let payload;

  try
  {
    payload = await AuthService.refreshToken(accessToken);
  } catch (e)
  {
    res.status(403).json("Invalid refresh token");
  }

  next();
}

// POST Request - Logout user and clear the JWT token from the cookie
const logout = async (req, res, next) =>
{
  const id = req.id;
  if (!id)
  {
    res.status(400).json("Access token is require");
    return;
  }
  let payload;
  try
  {
    payload = await AuthService.logout(id);
  } catch (e)
  {
    res.status(403).json("Invalid access token");
  }
  console.log("logout successfull");
  res.sendStatus(204);
};


// const generateOtp = async (req, res) =>
// {
//   const { email, mobileNumber } = req.body;

//   const userExists = await OTPService.checkUserExists(email, mobileNumber);

//   if (!userExists)
//   {
//     return res.status(400).json({ message: "User not found" });
//   }

//   const otp = await OTPService.sendOTP(email, mobileNumber);
// }

const generateOtp = async (req, res) =>
{
  const { email, mobileNumber } = req.body;

  const userExists = await OTPService.checkUserExists(email, mobileNumber);

  if (!userExists)
  {
    return res.status(400).json({ message: "User not found" });
  }

  try
  {
    await OTPService.sendOTP(email, mobileNumber, res); // Pass 'res' as a parameter
  } catch (err)
  {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Export the functions for use in other modules
module.exports = {
  login,
  getUser,
  refreshToken,
  logout,
  signup,
  generateOtp
};
