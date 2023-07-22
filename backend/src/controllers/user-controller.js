// Import required modules and packages
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { existsSync } = require('fs');

const prisma = new PrismaClient();

// Secret key for JWT
const JWT_SECRET_KEY = "TicketoSSSKPN";

// POST Request - Signup new user
const signup = async (req, res, next) =>
{
    const { name, email, password } = req.body;

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
                password: hashPassword,
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

    try
    {
        // Find the user in the database based on their email
        const existingUser = await prisma.user.findUnique({ where: { email: email } });

        // If the user doesn't exist, return an error message
        if (!existingUser)
        {
            return res.status(400).json({ message: "User not found. Signup Please" });
        }

        // Check if the provided password matches the hashed password in the database
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect)
        {
            return res.status(400).json({ message: "Invalid Email/Password" });
        }

        // Generate a JWT token for the user
        const token = jwt.sign({ id: existingUser.id }, JWT_SECRET_KEY, {
            expiresIn: "35s"
        });
        console.log("Generated Token\n", token);
        if (req.cookies[`${existingUser.id}`])
        {
            req.cookies[`${existingUser.id}`] = ""
        }
        // Set the JWT token in the cookie and send it in the response
        res.cookie(String(existingUser.id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: 'lax'
        });

        console.log("Successfully Logged In\n", existingUser.name);

        return res.status(200).json({ message: "Successfully Logged In", user: existingUser, token });
    } catch (err)
    {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Middleware - Verify JWT token from the cookie
const verifyToken = (req, res, next) =>
{
    const cookies = req.headers.cookie;
    // console.log(cookies);
    if (!cookies)
    {
        return res.status(401).json({ message: "No token found" });
    }
    const token = cookies.split("=")[1];
    console.log(token);

    if (!token)
    {
        return res.status(404).json({ message: "No token found" });
        console.log("no token")
    }

    // Verify the JWT token and extract the user id
    jwt.verify(String(token), JWT_SECRET_KEY, (err, decoded) =>
    {
        if (err)
        {
            return res.status(400).json({ message: "Invalid Token" });
        }
        console.log(decoded.id);
        req.id = decoded.id;

    });
    next();
};

// GET Request - Get user details using the JWT token
const getUser = async (req, res, next) =>
{
    const userID = req.id;
    try
    {
        // Find the user in the database based on their user ID
        const user = await prisma.user.findUnique({
            where: { id: userID },
            select: { id: true, name: true, email: true }
        });

        console.log(user.email);
        if (!user)
        {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the user details in the response
        return res.status(200).json({ user });
    } catch (err)
    {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Middleware - Refresh JWT token from the cookie
const refreshToken = (req, res, next) =>
{
    const cookies = req.headers.cookie;
    // const prevToken = cookies.split("=")[1];
    // if (!cookies || typeof cookies !== 'string')

    const prevToken = cookies.split("=")[1];
    // console.log(token);
    console.log("prevToken\n");
    console.log(prevToken);

    if (!prevToken)
    {
        return res.status(401).json({ message: "No token found" });
        console.log("token not found");
    }

    // Verify the JWT token and extract the user id
    jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user) =>
    {
        if (err)
        {
            return res.status(403).json({ message: "Authentication Failed" });
            console.log("authentication failed");
        }
        console.log("userid :", user.id);
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";


        const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
            expiresIn: "35s"
        })

        console.log("Regenerated Token\n", token);
        res.cookie(String(user.id), token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: "lax",
        });
        // console.log(decoded.id);
        req.id = user.id;

    });
    next();
};

// POST Request - Logout user and clear the JWT token from the cookie
const logout = (req, res, next) =>
{
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken)
    {
        return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user) =>
    {
        if (err)
        {
            console.log(err);
            return res.status(403).json({ message: 'Authentication failed' });
        }
        // Clear the JWT token from the cookie and the request object
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        return res.status(200).json({ message: "Successfully Logged Out" });
        console.log("successfully logged out");
    });
};

// Export the functions for use in other modules
module.exports = {
    signup,
    login,
    verifyToken,
    getUser,
    refreshToken,
    logout,
};
