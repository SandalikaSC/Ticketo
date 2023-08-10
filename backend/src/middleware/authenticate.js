const AuthService = require("../services/auth-service").default;
// const verifyToken = async (req, res, next) =>
// {
//     const token = req.headers.authorization;
//     console.log(token);
//     if (!token)
//     {
//         return res.status(400).json({ message: 'Authorization header missing' });
//         // const token = await AuthService.getaccessToken()
//     }

//     try
//     {
//         const decodedToken = await AuthService.verifyToken(token);
//         const id = decodedToken.id;
//         req.id = id;
//         console.log(req.id);
//         next();
//     } catch (err)
//     {
//         return res.status(401).json({ message: "Invalid token" });
//     }
// }


const verifyToken = async (req, res, next) =>
{
    const token = req.headers.authorization;

    // console.log(token);

    if (!token)
    {
        console.log("hi");
        return res.status(400).json({ message: 'Authorization header missing' });
    }

    try
    {
        console.log(token);
        const decodedToken = await AuthService.verifyToken(token);
        console.log(decodedToken);
        const user = decodedToken.user; // Access the user object from the decoded token
        req.user = user; // Store the user object in the request for future use
        req.userId = user.id; // Store the user's ID in the request for easy access
        console.log(req.userId);
        next();
    } catch (err)
    {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = {
    verifyToken
};



module.exports = {
    verifyToken
};
