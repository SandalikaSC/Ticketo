const { PrismaClient } = require("@prisma/client");
const AuthService = require("../services/auth-service");
const OTPService = require("../services/otp-service");
const middlewareService = require("../middleware/authenticate");
const emailSender = require("../middleware/sendEmail");
const prisma = new PrismaClient();
const randToken = require('rand-token');
const bcrypt = require('bcrypt');

//POST Request - Add user to a database
const signup = async (req, res) =>
{
  const { firstName, lastName, phoneNumber, nic, email, password, otp } = req.body;

  //field validation

  if (!otp)
  {
    return res.status(400).json({ message: "invalid otp" });
  }


  try
  {
    const existingUser = await AuthService.isExistPassenger(nic, email);

    if (existingUser)
    {
      return res.status(400).json({ message: "User already exist. Please log in instead." });
    }
    if (!await AuthService.accountVerification(nic, otp))
    {
      return res.status(400).json({ message: "Invalid Otp" });
    }

    const newUser = await AuthService.signup(firstName, lastName, phoneNumber, nic, email, password);
    if (newUser)
    {
      return res.status(200).json({ message: "Registration successfull" });
    }

    return res.status(400).json({ message: "Registration  failed" });

  } catch (err)
  {
    // console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
const verifyAccount = async (req, res) =>
{
  const { firstName, lastName, phoneNumber, nic, email, password } = req.body;

  //field validation

  if (!firstName.trim())
  {
    return res.status(400).json({ message: "First name is required" });
  }
  if (!lastName.trim())
  {
    return res.status(400).json({ message: "Last name is required" });
  }
  if (!/^[A-Za-z]+$/.test(firstName.trim()))
  {
    return res.status(400).json({ message: "Invalid first name details" });
  }
  if (!/^[A-Za-z]+$/.test(lastName.trim()))
  {
    return res.status(400).json({ message: "Invalid last name details" });
  }
  if (!phoneNumber)
  {
    return res.status(400).json({ message: "Phone number is required" });
  } else if (!/^\d{10}$/.test(phoneNumber))
  {
    return res.status(400).json({ message: "Phone number is invalid" });
  }
  if (!nic)
  {
    return res.status(400).json({ message: "NIC is required" });
  } else if (!/^(?:\d{9}[v|V]|\d{12})$/.test(nic))
  {
    return res.status(400).json({ message: "Invalid NIC" });
  }
  if (!email.trim())
  {
    return res.status(400).json({ message: "Email is required" });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
  {
    return res.status(400).json({ message: "Invalid Email" });
  }
  if (!password)
  {
    return res.status(400).json({ message: "Password is required" });
  } else
  {
    if (password.length < 8)
    {
      return res.status(400).json({ message: "Password must be at least 8 letters" });
    }

    // Contains at least one uppercase letter
    if (!/[A-Z]/.test(password))
    {
      return res.status(400).json({ message: "Password must be Contains at least one uppercase letter" });
    }

    // Contains at least one lowercase letter
    if (!/[a-z]/.test(password))
    {
      return res.status(400).json({ message: "Password must be Contains at least one lowercase letter" });;
    }

    // Contains at least one digit (number)
    if (!/\d/.test(password))
    {
      return res.status(400).json({ message: "Password must be Contains at least one digit" });
    }

  }

  try
  {
    const existingUser = await AuthService.isExistPassenger(nic, email);

    if (existingUser && existingUser.userType.includes('PASSENGER'))
    {
      return res.status(400).json({ message: "User already exists as a passenger. Please log in instead." });
    } else if (existingUser && existingUser.userType.some(role => role !== 'PASSENGER'))
    {
      await AuthService.employeeToPassenger(nic);

      return res.status(201).json({ message: "You are already registered as an employee. Please log in with the same credentials." });
    }

    const otp = randToken.generate(4, nic);
    const emailResult = await emailSender.sendEmail(email, "Account Verification OTP", `Hi ${firstName},\nWelcome to Ticketo!Please use the following OTP to verify your account:\nOTP: [${otp}] \n\nThis OTP is valid for a limited time.Complete the verification process to get started. \n\nIf you didn't sign up for Ticketo, please disregard this email. \n\nBest regards, Ticketo Team`);

    if (emailResult.success)
    {
      const otpInsertResult = await AuthService.insertTempOtp(nic, otp);

      if (otpInsertResult)
      {
        return res.status(200).json({ message: "OTP sent to " + email });
      } else
      {
        return res.status(500).json({ message: "Failed to save OTP. Please try again later." });
      }
    } else
    {
      return res.status(500).json({ message: "Error occurred while sending email. Please try again later." });
    }
  } catch (err)
  {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// POST Request - Login existing user

const login = async (req, res) =>
{
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
    console.log("login successful");
    return res.status(200).json({ accessToken, refreshToken, userType });
  } catch (error)
  {
    return res.status(400).json({ message: error.message });
  }
};


// GET Request - Get user details using the JWT token
// const getUser = async (req, res) =>
// {
//   const id = req.id;
//   console.log(req.id);
//   try
//   {
//     // Find the user in the database based on their user ID
//     const user = await prisma.user.findUnique({
//       where: { id: id },
//       select: { id: true, firstName: true, email: true, userType: true },
//     });

//     // Check if the user exists
//     if (!user)
//     {
//       return res.status(404).json({ message: "User not found" });
//     }
//     // Return the user details in the response
//     return res.status(200).json({ user });
//   } catch (err)
//   {
//     // Handle the error if any occurred during the database query
//     console.error(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
const getUser = async (req, res) =>
{
  const id = req.id;

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
  generateOtp,
  verifyAccount
};
