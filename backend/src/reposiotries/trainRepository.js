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

module.exports = {
    createTrain,
    findCoachByCode,
    createCoachArrangements,
};
