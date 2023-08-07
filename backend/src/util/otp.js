const { getOTP, updateOTP } = require("../reposiotries/user-repository");

const verifyOtp = async (req, res) =>
{
    const { email, mobileNumber, otp } = req.body;

    const user = await getOTP(email, mobileNumber);

    const generatedOTP = user.otp;
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

    // Check if the time difference is less than 2 minutes (120,000 milliseconds)
    if (timeDifference < 120000)
    {
        if (otp === generatedOTP)
        {
            // OTP matched
            // Send success response
            await updateOTP(email, "", null);
            return res.status(200).json({ message: "OTP matched" });
        } else
        {
            // Invalid OTP
            return res.status(400).json({ message: "Invalid OTP" });
        }
    } else
    {
        // Delete OTP and otpGenerateTime from the database
        await updateOTP(email, "", null);
        // await prisma.user.update({
        //     where: { email: user.email },
        //     data: {
        //         otp: "",
        //         otpGenerateTime: null
        //     }
        // });

        return res.status(400).json({ message: "OTP expired" });
    }
}


module.exports = {
    verifyOtp
};