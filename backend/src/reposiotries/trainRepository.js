const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
    return await prisma.train.findUnique({
        where: { trainId: trainId },
    });
}
module.exports = {
    createTrain,
    findCoachByCode,
    createCoachArrangements,
    getTrain
};
