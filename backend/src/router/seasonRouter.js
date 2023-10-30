const express = require('express');
const seasonRouter = express.Router();
const {
    addSeasonRequest, getSeason, getSeasonRequest
} = require("../controllers/seasonController");

const { verifyToken } = require("../middleware/authenticate");

seasonRouter.use(verifyToken);


seasonRouter.post('/requestseason', addSeasonRequest);
seasonRouter.get('/getseasoninfo', getSeason);
seasonRouter.get('/getseasonrequest', getSeasonRequest);

module.exports = seasonRouter;
