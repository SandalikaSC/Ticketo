const express = require('express');

const locationRouter = express.Router();
const {
    locationUpdate
} = require("../controllers/location-controller");



locationRouter.post("/", locationUpdate);


module.exports = locationRouter;