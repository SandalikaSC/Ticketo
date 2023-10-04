const express = require('express');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require('@prisma/client');
const authRouter = require('./router/authRouter');
const stationMasterRoutes = require('./router/stationMasterRoutes');
const adminRouter = require('./router/admin'); // Import the admin router

const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', '*'],
  credentials: true, // Allow cookies to be sent along with the request
}));

// Routes
app.use("/api", authRouter);
app.use('/api', stationMasterRoutes);

// Use the admin router for /api/reports/income
app.use('/api/reports', adminRouter);

// Start the server
app.listen(port, () =>
{
  console.log(`Server is running on port ${port}`);
});
