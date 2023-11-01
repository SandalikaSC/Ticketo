const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTrains = async () =>
{
    return await prisma.train.findMany({
        orderBy: { trainId: 'asc' },
    });
};

const getAllDrivers = async () =>
{
    const driverUsers = await prisma.user.findMany({
        where: {
          userType: {
            has: 'DRIVER',
          },
        },
      });
      return driverUsers;
};

const createTrain = async (trainData) =>
{
    return await prisma.train.create({
        data: trainData,
    });
};

const findCoachByCode = async (coachCode) =>
{
    return await prisma.coach.findFirst({
        where: { coachCode },
    });
};

const createCoachArrangements = async (coachArrangementData) =>
{
    return await prisma.coachArrangement.createMany({
        data: coachArrangementData,
    });
};

const getTrain = async (trainId) =>
{
    const tid = parseInt(trainId);
    return await prisma.train.findUnique({
        where: { trainId: tid },
    });
}
module.exports = {
    getAllTrains,
    createTrain,
    findCoachByCode,
    createCoachArrangements,
    getTrain,
    getAllDrivers
};
