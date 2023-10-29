
const { addSeasonRequest } = require("../reposiotries/season-repository")
const { getStationId } = require("../reposiotries/station-repository")
const { getJourneyPrice } = require("../reposiotries/journey-rerpositary")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const makeSeasonRequest = async (
    userId, duration, startStation, endStation, designation, workplace, workplaceAddress, seasonType, seasonClass, applicationForm
) => {
    try {
        console.log("service");

        startStation = await getStationId(startStation);
        endStation = await getStationId(endStation);

        const journey = await getJourneyPrice(startStation, endStation);
        let price = await calculateSeasonPrice(seasonType, seasonClass, duration, journey);


        console.log(duration, startStation, endStation, designation, workplace, workplaceAddress, seasonType, seasonClass, price, applicationForm);
        const status = await addSeasonRequest(userId, duration, startStation, endStation, designation, workplace, workplaceAddress, seasonType, seasonClass, price, applicationForm);

        return status;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
}

const calculateSeasonPrice = async (seasonType, seasonClass, duration, journey) => {
    var price = 0;

    if (seasonType == 'Government') {
        if (seasonClass === 2) {
            price = journey.govenmentSecond;

        } else {
            price = journey.govenmentThird;
        }
    } else {
        if (seasonClass == 2) {
            price = journey.privateSecond;
        } else {
            price = journey.privateThird;
        }
    }
    if (duration == 3) {
        price = price * 3;
    }

    return price;
}

module.exports = {
    makeSeasonRequest
};
