
const { addSeasonRequest, getUserSeason, getUserSeasonRequest, paySeason, deleteRequeset,getSeasonRepo,acceptRequeset,rejectRequeset } = require("../reposiotries/season-repository")
const { getStationId, getStationName } = require("../reposiotries/station-repository")
const { getJourneyPrice } = require("../reposiotries/journey-rerpositary")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const qr = require('qrcode');
const { getSeasonRequest } = require("../controllers/seasonController");

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

const deleteSeasonRequest = async (
    userId, seasonId) => {
    try {


        const status = await deleteRequeset(userId, seasonId);

        return status;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
}
const PayForSeason = async (
    userId, seasonId) => {
    try {
        const status = await paySeason(userId, seasonId);

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
const getSeasonbyUser = async (userid) => {
    try {
        // Get journey price
        var season = await getUserSeason(userid);
        if (season) {
            const formattedseason =
            {
                ...season,
                start: await getStationName(season.startStation),
                end: await getStationName(season.endStation),
                qrcode: await generateQRCode(season.seasonId),
                status: season.approvedStatus,
                className: season.seasonClass,
                seasonType: season.seasonType,
                price: season.price,
                applyDate: season.applyedDate,
                month: await getAppliedSeasonMonth(season.applyedDate)
            };


            return formattedseason;
        }
        return season;
        // Return the formatted tickets
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
}
const getSeasonRequestbyUser = async (userid) => {
    try {
        // Get journey price
        var season = await getUserSeasonRequest(userid);
        if (season) {
            const formattedseason =
            {
                ...season,
                start: await getStationName(season.startStation),
                end: await getStationName(season.endStation),
                qrcode: await generateQRCode(season.seasonId),
                status: season.approvedStatus,
                className: season.seasonClass,
                seasonType: season.seasonType,
                price: season.price,
                applyDate: season.applyedDate,
                month: await getAppliedSeasonMonth(season.applyedDate)
            };
            ;

            return formattedseason;
        }
        return season;// Return the formatted tickets
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
}
const generateQRCode = async (seasonID) => {
    try {
        const qrCode = await qr.toBuffer(JSON.stringify(
            { uuid: seasonID, ticketType: "SEASON" }
        ));
        return qrCode;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
};
const getAppliedSeasonMonth = async (currentDate) => {

    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because months are zero-based
    const currentYear = currentDate.getFullYear();

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    // Check if the date falls between the 7th and the last day of the current month
    if (currentDate.getDate() > 7) {
        // Calculate the next month
        const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1; // Wrap around to January if December
        const nextYear = nextMonth === 1 ? currentYear + 1 : currentYear; // Increment year if moving to January

        // Get the name of the next month

        const nextMonthName = months[nextMonth - 1]; // Subtract 1 to access the correct array index

        return (nextMonthName + " " + nextYear);
    } else {


        const currentMonthName = months[currentMonth - 1]; // Subtract 1 to access the correct array index

        return (currentMonthName + " " + currentYear);
    }

}



// const getAllSeasonRequests =async () =>{
//     try{
//         const seasonRequests =await getSeasonRequestbyUser(); //to implement in repository
        
//         return seasonRequests;   
//     } catch(err){
//         throw new Error(err.message);
//     }
// }

const getAllSeasons = async ()=>{
    try{
        const cardsData = await getSeasonRepo();
        return cardsData;
    } catch(error){
        throw error;

    }
}

const rejectSeasonRequest = async (seasonId) => {
    try {


        const status = await rejectRequeset(seasonId.toString());

        return status;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
}

const acceptSeasonRequest = async (seasonId) => {
    try {


        const status = await acceptRequeset(seasonId.toString());

        return status;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
}





module.exports = {
    makeSeasonRequest,
    getSeasonbyUser,
    getSeasonRequestbyUser,
    deleteSeasonRequest,
    PayForSeason,
    getAllSeasons,
    acceptSeasonRequest,
    rejectSeasonRequest
};
