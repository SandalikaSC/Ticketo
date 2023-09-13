const { getOTP, updateOTP } = require("../reposiotries/user-repository");

const verifyOtp = async (req, res) =>
{
    const { email, mobileNumber, otp } = req.body;

    const user = await getOTP(email, mobileNumber);

    const generatedOTP = parseInt(user.otp);
    const generatedTime = user.otpGenerateTime;

    if (!generatedOTP || !generatedTime)
    {
        return res.status(400).json({ message: "OTP not generated" });
    }

    const currentTime = new Date();
    const timeDifference = currentTime - generatedTime;
    console.log("current time", currentTime);
    console.log("generatedTime", generatedTime);
    console.log("Time difference", timeDifference);

    if (timeDifference < 120000)
    {
        if (otp == generatedOTP)
        {
            await updateOTP(email, "", null);
            return res.status(200).json({ message: "OTP matched" });
        } else
        {
            return res.status(400).json({ message: "Invalid OTP" });
        }
    } else
    {
        await updateOTP(email, "", null);
        return res.status(400).json({ message: "OTP expired" });
    }
}


module.exports = {
    verifyOtp
};