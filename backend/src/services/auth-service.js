const { getUserByEmail, updateToken, insertUser } = require("../reposiotries/user-repository");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
// Secret key for JWT
const JWT_SECRET_KEY = "TicketoSSSKPN";
const ACCESS_TOKEN_SECRET = "access-token-secret-ticketo-SSSKPN";
const REFRESH_TOKEN_SECRET = "refresh-token-secret-ticketo-SSSKPN";


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
      console.log("hi");
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

    // Set the HttpOnly cookie for the accessToken
    // res.cookie("accessToken", accessToken, {
    //   httpOnly: true, // Set the HttpOnly flag to true
    //   secure: true, // Set the secure flag to true for HTTPS-only cookie
    //   sameSite: "strict", // Set the SameSite attribute to strict for added security
    //   // Optionally, you can set an expiration for the cookie if needed
    //   // maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
    // });

    return { accessToken, refreshToken };
  } catch (error)
  {
    // If an error occurs during the asynchronous operations, it will be caught here.
    // You can log the error or handle it as needed.
    console.error(error);
    throw new Error("An error occurred during login");
  }
};


const verifyToken = async (token) =>
{
  const decodedToken = jwt.verify(token.split(' ')[1], ACCESS_TOKEN_SECRET);
  return decodedToken;
}
const logout = async (accessToken) =>
{
  payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
  await updateToken(payload.id, "");
  if (!payload)
  {
    console.log("logout unsuccessful");
  }
  return payload;

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
