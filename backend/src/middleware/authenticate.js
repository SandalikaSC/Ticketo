const AuthService = require("../services/auth-service").default;

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(400).json({ message: 'Authorization header missing' });
    }

    try {
        const decodedToken = await AuthService.verifyToken(token);
        const id = decodedToken.id;
        req.id = id;
        console.log(req.id);
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}


const generateRandomOtp = async () => {

}
module.exports = {
    verifyToken
};
