// Import required modules and packages
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const authService = require('../services/auth-service');
const prisma = new PrismaClient();

// Secret key for JWT
// const JWT_SECRET_KEY = "TicketoSSSKPN";
const ACCESS_TOKEN_SECRET = "access-token-secret-ticketo-SSSKPN";
const REFRESH_TOKEN_SECRET = "refresh-token-secret-ticketo-SSSKPN";

const addUser = async (req, res) =>
{
    try
    {
        const authHeader = req.headers.authorization;
        const submittedUser = await authService.verifyToken(authHeader);

        console.log("submitted user", submittedUser);
        console.log(submittedUser.id);
        const id = submittedUser.id;

        if (submittedUser.userType.includes("ADMIN"))
        {
            // User has the ADMIN role, proceed to add the user
            const { firstName, lastName, station, mobileNumber, email, nic } = req.body;
            console.log(station);

            const userType = "STATION_MASTER";
            const addedUser = await authService.addEmployee(id, firstName, lastName, station, mobileNumber, email, nic, userType);
            console.log("User added successfully:", addedUser);

            // Respond to the client with a success message and the added user's information
            res.status(201).json({ message: "User added successfully", addedUser });

        } else
        {
            console.log("error occured");
            // User does not have the ADMIN role, send permission denied response
            res.status(403).json({ error: "Permission denied" });
        }
    } catch (error)
    {
        console.error("Error in add user:", error);
        res.status(500).json({ error: "An error occurred" });
    }
};





// POST Request - Signup new user
const signup = async (req, res, next) =>
{
    const { name, email, password, usertype } = req.body;

    try
    {
        // Check if the user already exists in the database
        const existingUser = await prisma.user.findUnique({ where: { email: email } });
        if (existingUser)
        {
            return res.status(400).json({ message: "User already exists! Login instead" });
        }

        // Hash the password before saving it to the database
        const hashPassword = bcrypt.hashSync(password, 10);

        // Create a new user in the database
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                usertype,
                password: hashPassword,
                token: ""
            },
        });

        return res.status(201).json({ message: newUser });
    } catch (err)
    {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// POST Request - Login existing user
const login = async (req, res, next) =>
{
    const { email, password } = req.body;

    if (!(email && password))
    {
        res.status(400).json("All input is required");
        return;
    }

    // Find the user in the database based on their email
    const existingUser = await prisma.user.findUnique({ where: { email: email } });

    console.log(existingUser.email);
    console.log(email);

    // If the user doesn't exist, return an error message
    if (existingUser.email !== email)
    {
        res.status(400).json("Invalid Credentials");
        return;
    }
    if (!existingUser)
    {
        return res.status(400).json({ message: "User not found. Signup Please" });
        //return;
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect)
    {
        return res.status(400).json({ message: "Invalid Email/Password" });
    }

    const accessToken = jwt.sign(
        { id: existingUser.id, usertype: existingUser.usertype },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        {
            id: existingUser.id,
            usertype: existingUser.usertype,
            type: "refresh"
        },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }

    )

    await prisma.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            token: refreshToken
        }
    });


    res.json({
        accessToken,
        refreshToken,
    });

};

// Middleware - Verify JWT token from the cookie


// GET Request - Get user details using the JWT token
// const getUser = async (req, res, next) =>
// {
//     //const userID = req.id;
//     const { userID } = req.body;
//     console.log(userID);
//     try
//     {
//         // Find the user in the database based on their user ID
//         const user = await prisma.user.findUnique({
//             where: { id: userID },
//             select: {
//                 id: true,
//                 name: true,
//                 email: true,
//                 usertype: true,
//                 token: true
//             }
//         });

//         console.log(user.email);
//         if (!user)
//         {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Return the user details in the response
//         return res.status(200).json({ user });
//     } catch (err)
//     {
//         console.log(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// Middleware - Refresh JWT token from the cookie
const refreshToken = async (req, res) =>
{
    const { refreshToken } = req.body;
    if (!refreshToken)
    {
        console.log("refresh token not found");
        res.status(400).json("refresh token not found");
        return;
    }

    let payload;
    try
    {
        payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    } catch (e)
    {
        console.log("Invalid refresh token");
        res.status(403).json("Invalid refresh token");
        return;
    }

    try
    {
        const existingUser = await prisma.user.findUnique({ where: { id: payload.id } });
        if (!existingUser)
        {
            res.status(400).json("User not found");
            return;
        }

        const storedRefreshToken = existingUser.token;

        if (storedRefreshToken !== refreshToken)
        {
            res.status(403).json("Invalid refresh token");
            return;
        }

        const newAccessToken = jwt.sign(
            {
                id: payload.id,
                usertype: payload.usertype
            },
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m"
            }
        );

        const newRefreshToken = jwt.sign(
            {
                id: payload.id,
                usertype: payload.usertype,
                type: "refresh"
            },
            REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        await prisma.user.update({
            where: {
                id: payload.id
            },
            data: {
                token: newRefreshToken
            }
        });

        res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });

    } catch (error)
    {
        res.status(500).json("Internal server error");
    }


};

// POST Request - Logout user and clear the JWT token from the cookie
const logout = async (req, res, next) =>
{
    const { accessToken } = req.body;

    console.log(req.body);

    if (!accessToken)
    {
        res.status(400).json("Access token is required");
        return;
    }

    let payload;
    try
    {
        payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    } catch (e)
    {
        res.status(403).json("Invalid access token");
        return;
    }


    await prisma.user.update({
        where: {
            id: payload.id
        },
        data: {
            token: ""
        }
    });

    res.sendStatus(204);

};

// Export the functions for use in other modules
module.exports = {
    signup,
    login,
    refreshToken,
    logout,
    addUser,
};
