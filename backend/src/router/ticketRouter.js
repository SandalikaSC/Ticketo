const express = require('express');
const ticketRouter = express.Router();
const {
    // getTickets,
    addTicket, getTickets
} = require("../controllers/ticket-controller");

const { verifyToken } = require("../middleware/authenticate");

ticketRouter.use(verifyToken);

ticketRouter.post('/addticket', addTicket);
ticketRouter.get('/gettickets', getTickets);

module.exports = ticketRouter;
