const nodemailer = require("nodemailer");

const generateOtp = async () =>
{
    const min = 1000;
    const max = 9999;

    const otp = Math.floor(Math.random() * (max - min + 1)) + min;

    const timestamp = new Date().getTime();
    console.log("Timestamp", timestamp);

    return { otp: otp.toString(), timestamp };
}

// const sendOtpEmail = async (email, otp) =>
// {
//     const transporter = nodemailer.createTransport({
//         service: "Gmail",
//         auth: {
//             user: "nadeedarshika1999@gmail.com",
//             pass: "n99d10W05."
//         },
//     });

//     const mailOptions = {
//         from: "nadeedarshika1999@gmail.com",
//         to: email,
//         subject: "Your OTP for password reset",
//         text: `Your OTP for password reset is : ${otp}. This OTP is valid for 1 minute.`,
//     };

//     try
//     {
//         await transporter.sendMail(mailOptions);
//         console.log("OTP mail sent successfully");
//     } catch (eror)
//     {
//         console.log("Error sending otp mail", error);
//         throw error;
//     }
// }

const sendOtpEmail = async (email, otp) =>
{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "ticketo.nssspk@gmail.com",
            pass: "tirsfqbqjbkbylrj"
        },
    });

    const mailOptions = {
        from: "ticketo.nssspk@gmail.com",
        to: email,
        subject: "Your OTP for password reset",
        text: `Your OTP for password reset is : ${otp}. This OTP is valid for 1 minute.`,
    };

    try
    {
        await transporter.sendMail(mailOptions);
        console.log("OTP mail sent successfully");
    } catch (error)
    { // Fix the typo here
        console.log("Error sending otp mail", error);
        throw error;
    }
}


module.exports = {
    generateOtp,
    sendOtpEmail
}