const express = require('express');

const locationRouter = express.Router();
const {
    locationUpdate, locationInsert
} = require("../controllers/location-controller");



locationRouter.post("/", locationUpdate);
locationRouter.post("/l-insert", locationInsert);


module.exports = locationRouter;