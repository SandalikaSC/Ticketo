const { getUserByEmail, getUserByMobile, updateOTP } = require("../reposiotries/user-repository");
const OTP = require("../middleware/generateOtp");

const sendOTP = async (email, mobileNumber, res) =>
{
    const { otp, timestamp } = await OTP.generateOtp();
    console.log(timestamp);
    const otpGenerateDateTime = new Date(timestamp);

    await updateOTP(email, otp, otpGenerateDateTime);
    try
    {
        if (email)
        {
            await OTP.sendOtpEmail(email, otp);
            return res.status(200).json({
                message: "OTP sent successfully"
            });
        } else
        {
            return res.status(400).json({ message: "Email is required" });
        }
    } catch (err)
    {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const checkUserExists = async (email, mobileNumber) =>
{
    let userWithEmail = null;
    let userWithMobile = null;

    if (email)
    {
        userWithEmail = await getUserByEmail(email);
    } else if (mobileNumber)
    {
        userWithMobile = await getUserByMobile(mobileNumber);
    }

    if (userWithEmail || userWithMobile)
    {
        return true;
    }

    return false;
}

module.exports = {
    checkUserExists,
    sendOTP
};