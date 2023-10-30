const express = require('express');
const seasonRouter = express.Router();
const {
    addSeasonRequest
} = require("../controllers/seasonController");

const { verifyToken } = require("../middleware/authenticate");

seasonRouter.use(verifyToken);


seasonRouter.post('/requestseason', addSeasonRequest);

module.exports = seasonRouter;
