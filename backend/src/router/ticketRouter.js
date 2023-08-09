const express = require('express');
const ticketRouter = express.Router();
const {
    getTickets,
    getTicket
} = require("../controllers/ticket-controller");

const { verifyToken } = require("../middleware/authenticate");

ticketRouter.use(verifyToken);

ticketRouter.get('/', getTickets);

// Route to get user data by ID
ticketRouter.get('/:id', getTicket);

module.exports = ticketRouter;
