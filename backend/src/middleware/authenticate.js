const AuthService = require("../services/auth-service");



const verifyToken = async (req, res, next) =>
{
    const token = req.headers.authorization;

    if (!token)
    {
        return res.status(400).json({ message: 'Authorization header missing' });
    }

    try
    {
        const decodedToken = await AuthService.verifyToken(token);
        const user = decodedToken;
        req.user = user;

        next();
    } catch (err)
    {
        return res.status(401).json({ message: "Invalid token" });
    }
}
module.exports = {
    verifyToken
};
