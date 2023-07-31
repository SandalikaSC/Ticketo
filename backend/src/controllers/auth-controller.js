const { PrismaClient } = require("@prisma/client");
const AuthService = require("../services/auth-service");

const prisma = new PrismaClient();

//POST Request - Add user to a database
const signup = async (req, res) =>
{
  const { firstName, email, password, userType } = req.body;

  console.log(userType);
  try
  {
    const existingUser = await AuthService.signup(firstName, email, password, userType);

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
    const { accessToken, refreshToken, userType } = await AuthService.login(email, password);
    return res.status(200).json({ accessToken, refreshToken, userType });
  } catch (error)
  {
    return res.status(400).json({ message: error.message });
  }
};

const verifyToken = async (req, res, next) =>
{
  const token = req.headers.authorization;
  console.log(token);
  if (!token)
  {
    return res.status(400).json({ message: 'Authorization header missing' });
  }

  try
  {
    const decodedToken = await AuthService.verifyToken(token);
    const id = decodedToken.id;
    req.id = id;
    console.log(req.id);
    next();
  } catch (err)
  {
    return res.status(401).json({ message: "Invalid token" });
  }
}

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

// Export the functions for use in other modules
module.exports = {
  login,
  getUser,
  refreshToken,
  logout,
  signup,
  verifyToken
};