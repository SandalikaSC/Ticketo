const { getTempOtp, insertTemperyOtp, getUserByEmail, addEmployeeAsPassenger, updateToken, insertUser, updatePassword, getUserByNicEmail } = require("../reposiotries/user-repository");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { verifyOtp } = require("../util/otp");
const { error } = require("console");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;


const employeeToPassenger = async (nic) => {

  try {
    return await addEmployeeAsPassenger(nic);


  } catch (error) {
    throw new Error("An error occurred during login");
  }


}
const signup = async (firstName, lastName, phoneNumber, nic, email, password) => {
  try {


    const hashPassword = bcrypt.hashSync(password, 10);

    // Extract the birth year, month, and date from the NIC number
    const birthDate = getBirthDateFromNIC(nic);

    const newUser = await insertUser(nic, email, birthDate, hashPassword, firstName, lastName, phoneNumber);
    return newUser;

  } catch (err) {
    throw new Error("SignUp failed");
  }
}
const accountVerification = async (nic, otp) => {
  try {
    const verificationDetails = await getTempOtp(nic);
    if (verificationDetails) {
      const currentTime = new Date();
      const otpTime = new Date(verificationDetails.time);

      const timeDifferenceInMinutes = (currentTime - otpTime) / (1000 * 60);

      return verificationDetails.otp == otp && timeDifferenceInMinutes < 3;
    } else {
      throw new Error("Verification details not found");
    }
  } catch (error) {
    throw new Error("Internal Server Error");
  }



}
function getBirthDateFromNIC(nic) {

  if (nic.length == 10) {
    new_nic = "19" + nic;
    nic = new_nic.slice(0, -1);
  }
  const year = parseInt(nic.substring(0, 4));
  var dayOfBirth = parseInt(nic.substring(4, 7))
  if (dayOfBirth > 500) {
    dayOfBirth = dayOfBirth - 500;
  }

  const { month, day } = getMonthAndDayFromTotalDays(dayOfBirth);
  // console.log(`Month: ${month}, Day: ${day}`);

  // console.log(year + " " + month + " " + day)
  return new Date(year, month - 1, day);
}
function getMonthAndDayFromTotalDays(totalDays) {
  const startOfYear = new Date(new Date().getFullYear(), 0, 0); // January 1st of the current year
  const targetDate = new Date(startOfYear.getTime() + totalDays * 24 * 60 * 60 * 1000);

  const month = targetDate.getMonth() + 1; // getMonth() returns 0-11, so we add 1 to get the actual month number.
  const day = targetDate.getDate();
  return { month, day };
}

const isExistPassenger = async (nic, email) => {
  try {

    const existingUser = await getUserByNicEmail(nic, email);
    return existingUser;

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
const login = async (email, password) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      throw new Error("User not found. Signup Please");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {

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
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during login");
  }
};
const insertTempOtp = async (nic, otp) => {
  try {

    const dbresult = await insertTemperyOtp(nic, otp);
    return dbresult;

  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyToken = async (token) => {
  const decodedToken = jwt.verify(token.split(' ')[1], ACCESS_TOKEN_SECRET);
  console.log("her inside verifytoken");
  Console.log(decodedToken);
  return decodedToken;
}
const logout = async (id) => {
  await updateToken(id, "");
  if (!id) {
    console.log("logout unsuccessful");
  }
  return id;
}

const refreshToken = async (refreshToken) => {
  payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

  return payload;
}

const resetPassword = async (req, res) => {
  const { email, mobileNumber, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    console.log("hashpassword", hashPassword);
    await updatePassword(email, mobileNumber, hashPassword);

    return res.status(200).json({ message: 'Password updated successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}


module.exports = {
  login,
  logout,
  refreshToken,
  signup,
  verifyToken,
  resetPassword,
  accountVerification,
  employeeToPassenger,
  isExistPassenger,
  insertTempOtp
};

