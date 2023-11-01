const express = require('express');
const seasonRouter = express.Router();
const {
    addSeasonRequest, getSeason, getSeasonRequest, deleteSeason, paySeason,getAllSeasonRequests
} = require("../controllers/seasonController");

const { verifyToken } = require("../middleware/authenticate");

seasonRouter.use(verifyToken);


seasonRouter.post('/requestseason', addSeasonRequest);
seasonRouter.get('/getseasoninfo', getSeason);
seasonRouter.get('/getseasonrequest', getSeasonRequest);
seasonRouter.delete('/deleteseason', deleteSeason);
seasonRouter.put('/payseason', paySeason);
seasonRouter.get('/getallseasonrequests',getAllSeasonRequests);
module.exports = seasonRouter;
