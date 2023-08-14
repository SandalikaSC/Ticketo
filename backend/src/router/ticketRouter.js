const express = require('express');
const ticketRouter = express.Router();
const {
    // getTickets,
    addTicket
} = require("../controllers/ticket-controller");

const { verifyToken } = require("../middleware/authenticate");

ticketRouter.use(verifyToken);

ticketRouter.post('/addticket', addTicket);
// ticketRouter.post('/gettickets', getTickets);

module.exports = ticketRouter;
