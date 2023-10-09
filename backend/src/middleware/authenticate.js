const AuthService = require("../services/auth-service");



const verifyToken = async (req, res, next) =>
{
    const token = req.headers.authorization;

    if (!token)
    {
        console.log("Authorization header missing");
        return res.status(400).json({ message: 'Authorization header missing' });
    }

    try
    {
        const decodedToken = await AuthService.verifyToken(token);
        const user = decodedToken;
        req.user = user;
        console.log("Authentication successful");
        next();
    } catch (err)
    {
        console.log("error");
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = {
    verifyToken
};
