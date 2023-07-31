const { getUserByEmail, updateToken, insertUser } = require("../reposiotries/user-repository");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Now you can use the ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET variables in your code.


const signup = async (firstName, email, password, userType) =>
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
    const newUser = await insertUser(firstName, email, hashPassword, userType);
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
