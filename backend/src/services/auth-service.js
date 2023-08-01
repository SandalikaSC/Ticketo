const { getUserByEmail, updateToken, insertUser } = require("../reposiotries/user-repository");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Now you can use the ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET variables in your code.


const signup = async (firstName, lastName, email, password, userType, nic, mobileNumber) =>
{
  try
  {
    const existingUser = await getUserByEmail(email);

    if (existingUser)
    {
      console.log("user exists");
      return existingUser;
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    // Extract the birth year, month, and date from the NIC number
    const birthYear = parseInt(nic.substring(0, 2), 10) + 1900; // Assume 1900 for the 20th century and 2000 for the 21st century. You can modify this logic based on your use case.
    const birthDayOfYear = parseInt(nic.substring(2, 5), 10);
    const birthDate = new Date(birthYear, 0); // January 1st of the birth year
    birthDate.setDate(birthDate.getDate() + birthDayOfYear - 1); // Set the date based on the day of the year

    console.log(birthDate);

    const newUser = await insertUser(firstName, lastName, email, hashPassword, userType, nic, mobileNumber, birthDate);
    if (!newUser)
    {
      console.log("User not updated");
    }
    console.log(newUser);

  } catch (err)
  {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const login = async (email, password) =>
{
  try
  {
    const existingUser = await getUserByEmail(email);
    if (!existingUser)
    {
      throw new Error("User not found. Signup Please");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect)
    {

      throw new Error("Invalid password");
    }
    const accessToken = jwt.sign({
      id: existingUser.id, userType: existingUser.userType
    }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ id: existingUser.id, userType: existingUser.userType, type: "refresh" }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    await updateToken(existingUser.id, refreshToken);
    userType = existingUser.userType;
    return { accessToken, refreshToken, userType };
  } catch (error)
  {
    console.error(error);
    throw new Error("An error occurred during login");
  }
};


const verifyToken = async (token) =>
{
  const decodedToken = jwt.verify(token.split(' ')[1], ACCESS_TOKEN_SECRET);
  console.log("her inside verifytoken");
  Console.log(decodedToken);
  return decodedToken;
}
const logout = async (id) =>
{
  await updateToken(id, "");
  if (!id)
  {
    console.log("logout unsuccessful");
  }
  return id;
}

const refreshToken = async (refreshToken) =>
{
  payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

  return payload;
}


module.exports = {
  login,
  logout,
  refreshToken,
  signup,
  verifyToken
};
