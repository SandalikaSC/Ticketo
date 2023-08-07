const nodemailer = require('nodemailer');

// Assuming you have set up these environment variables with your Gmail credentials
const senderEmail = process.env.SENDER_EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;

// Function to send an email
async function sendEmail(userEmail, subject, body) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: senderEmail,
                pass: emailPassword,
            },
        });

        const mailOptions = {
            from: senderEmail,
            to: userEmail,
            subject: subject,
            text: body,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending Email:", error.message);
        return { success: false, message: "Failed to send email. Please try again later." };
    }
}


module.exports = {
    sendEmail
}