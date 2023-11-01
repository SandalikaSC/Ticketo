const { PrismaClient } = require('@prisma/client');
const { getSeason } = require('../controllers/seasonController');
const prisma = new PrismaClient();

async function addSeasonRequest(userId, duration, startStation, endStation, designation, workplace, workplaceAddress, seasonType, seasonClass, price, applicationForm) {
    const newSeasonCardData = {

        duration: duration,               // Set the duration (you can adjust this)
        startStation: startStation,            // Set the start station ID (you can adjust this)
        endStation: endStation,              // Set the end station ID (you can adjust this)
        designation: designation,
        workplace: workplace,
        workplaceAddress: workplaceAddress,
        applyedDate: new Date(),
        seasonType: seasonType, // Set the season type (e.g., 'monthly', 'annual', etc.)
        seasonClass: seasonClass,             // Set the season class (you can adjust this)
        approvedStatus: 'PENDING',  // Set the approved status (e.g., 'pending', 'approved', etc.)
        applicationForm: applicationForm, // Set the application form (if any)
        price: price,               // Set the price (you can adjust this)
        userId: userId,          // Set the user ID to associate the card with 
    };


    const seasonRequest = await prisma.seasonCard.create({
        data: newSeasonCardData,
    });


    return seasonRequest;

}
async function getUserSeason(userId) {
    return await prisma.seasonCard.findFirst({
        where: {
            userId: userId,
            approvedStatus: "PAID",
        },
        orderBy: {
            dateIssued: 'desc' // Sort by most recent one
        },
    });

}
async function getUserSeasonRequest(userId) {
    return await prisma.seasonCard.findFirst({
        where: {
            userId: userId,
            approvedStatus: {
                in: ['APPROVED', 'PENDING', 'REJECTED']
            },
        },
        orderBy: {
            dateIssued: 'desc' // Sort by most recent one
        },
    });

}
async function deleteRequeset(userId, seasonId) {
    return await prisma.seasonCard.delete({
        where: {
            userId,
            seasonId,
        },
    });
}
async function paySeason(userId, seasonId) {
    return await prisma.seasonCard.update({
        where: {

            seasonId: seasonId
        },
        data: {
            approvedStatus: 'PAID',
        },
    });
}

async function getSeasonRepo()  {
    // const getSeasonRepo = async (userId) => {
        
    try {
        const seasonCards = await prisma.seasonCard.findMany({
          include: {
            user: {
              select: {
                firstName: true,
                lastName:true,
                email: true,
                mobileNumber: true,
                nic: true,
              }
            }
          }
        });
  
        return seasonCards;
      } catch (error) {
        throw new Error(`Error fetching season cards: ${error.message}`);
      }
    }
  

// async function getSeasonRequests(){
//     return await prisma.seasonCard.findMany();
// }
module.exports = {
    addSeasonRequest,
    getUserSeasonRequest,
    getUserSeason,
    deleteRequeset,
    paySeason,
    getSeasonRepo
};


