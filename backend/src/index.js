
const express = require('express');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require('@prisma/client');
const authRouter = require('./router/authRouter');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
  credentials: true, // Allow cookies to be sent along with the request
}));

// Routes
app.use("/api/auth", authRouter);

// Start the server
app.listen(port, () =>
{
  console.log(`Server is running on port ${port}`);
});

// Async function example
// async function main() {
//   try {
//     const user1 = await prisma.user.create({ data: { username: "frcdscsdcfdvdr" } });
//     console.log(user1);
//   } catch (error) {
//     console.error(error.message);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();

