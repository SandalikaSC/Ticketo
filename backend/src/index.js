const express = require('express');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require('@prisma/client');
const authRouter = require('./router/authRouter');
const stationMasterRoutes = require('./router/stationMasterRoutes');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true, // Allow cookies to be sent along with the request
}));

// Routes
app.use("/api", authRouter);
app.use('/api', stationMasterRoutes);


// Start the server
app.listen(port, () =>
{
  console.log(`Server is running on port ${port}`);
});

