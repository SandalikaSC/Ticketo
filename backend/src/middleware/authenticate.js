const AuthService = require("../services/auth-service");



const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        // console.log("hi");
        return res.status(400).json({ message: 'Authorization header missing' });
    }

    try {
        // console.log(token);
        const decodedToken = await AuthService.verifyToken(token);
        // console.log(decodedToken);
        const user = decodedToken;
        req.user = user;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
module.exports = {
    verifyToken
};
