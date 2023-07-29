// Import required modules and packages
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { existsSync } = require("fs");
// const { login } = require("../services/auth-service");
const AuthService = require("../services/auth-service");

const prisma = new PrismaClient();


//POST Request - Add user to a database
const signup = async (req, res) =>
{
  const { name, email, password, usertype } = req.body;

  if (!(name && email && password && usertype))
  {
    res.status(400).json("All input is required");
    return;
  }

  try
  {
    const existingUser = await AuthService.signup(name, email, password, usertype);

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
  const { email, password } = req.body;
  // email and password validations gone here
  if (!(email && password))
  {
    res.status(400).json("All input is required");
    return;
  }

  try
  {
    const { accessToken, refreshToken } = await AuthService.login(email, password);
    console.log(accessToken);
    return res.status(200).json({ accessToken, refreshToken });
  } catch (error)
  {
    console.log("hi");
    return res.status(400).json({ message: error.message });
  }
};



// GET Request - Get user details using the JWT token
const getUser = async (req, res) =>
{
  const userID = req.id;
  try
  {
    // Find the user in the database based on their user ID
    const user = await prisma.user.findUnique({
      where: { id: userID },
      select: { id: true, name: true, email: true },
    });

    console.log(user.email);
    if (!user)
    {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user details in the response
    return res.status(200).json({ user });
  } catch (err)
  {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
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
  const { accessToken } = req.body;

  if (!accessToken)
  {
    res.status(400).json("Access token is require");
    return;
  }

  let payload;
  try
  {
    payload = await AuthService.logout(accessToken);
  } catch (e)
  {
    res.status(403).json("Invalid access token");
  }

  console.log("logout successfull");
  res.sendStatus(204);
};

// Export the functions for use in other modules
module.exports = {
  login,
  getUser,
  refreshToken,
  logout,
  signup
};
