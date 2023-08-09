const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const addTrain = async (req, res) =>
{
    console.log("inside train controller");
    const trainData = req.body;

    try
    {
        // Validation checks
        if (
            trainData.TC === 0 ||
            !trainData.TC0 ||
            (trainData.TCR !== 0 && !trainData.TCR0) ||
            !trainData.trainName ||
            !trainData.trainNumber
        )
        {
            console.log('Validation failed. Details:');
            console.log('TC:', trainData.TC);
            console.log('TC0:', trainData.TC0);
            console.log('TCR:', trainData.TCR);
            console.log('TCR0:', trainData.TCR0);
            console.log('trainName:', trainData.trainName);
            console.log('trainNumber:', trainData.trainNumber);
            throw new Error("Validation failed: Please provide valid inputs.");
        }

        // Create the train record and get its ID
        const newTrain = await prisma.train.create({
            data: {
                trainName: trainData.trainName,
                trainNumber: trainData.trainNumber,
            },
        });

        const coachArrangementData = [];

        // Handle FC case
        if (trainData.FC !== 0)
        {
            const fcCoach = await prisma.coach.findFirst({
                where: { coachCode: 'FC4' },
            });
            if (fcCoach)
            {
                for (let i = 0; i < trainData.FC; i++)
                {
                    coachArrangementData.push({
                        Code: `FC_${i + 1}`,
                        coachId: fcCoach.coachId,
                        trainId: newTrain.trainId,
                    });
                }
            }
        }

        // Handle OFV case
        if (trainData.OFV !== 0)
        {
            const ofvCoach = await prisma.coach.findFirst({
                where: { coachCode: 'OFV4' },
            });
            if (ofvCoach)
            {
                for (let i = 0; i < trainData.OFV; i++)
                {
                    coachArrangementData.push({
                        Code: `OFV_${i + 1}`,
                        coachId: ofvCoach.coachId,
                        trainId: newTrain.trainId,
                    });
                }
            }
        }

        // Handle SLEEPER case
        if (trainData.SLEEPER !== 0)
        {
            const sleeperCoach = await prisma.coach.findFirst({
                where: { coachCode: 'SLEEPER4' },
            });
            if (sleeperCoach)
            {
                for (let i = 0; i < trainData.SLEEPER; i++)
                {
                    coachArrangementData.push({
                        Code: `SLEEPER_${i + 1}`,
                        coachId: sleeperCoach.coachId,
                        trainId: newTrain.trainId,
                    });
                }
            }
        }

        // Handle SCR case
        if (trainData.SCR !== 0)
        {
            const scrCoach = await prisma.coach.findFirst({
                where: { coachCode: 'SCR4' },
            });
            if (scrCoach)
            {
                for (let i = 0; i < trainData.SCR; i++)
                {
                    coachArrangementData.push({
                        Code: `SCR_${i + 1}`,
                        coachId: scrCoach.coachId,
                        trainId: newTrain.trainId,
                    });
                }
            }
        }

        // Handle TCR case
        if (trainData.TCR !== 0)
        {
            const tcrCoach = await prisma.coach.findFirst({
                where: { coachCode: 'TCR5' },
            });
            if (tcrCoach)
            {
                const tcr0Value = trainData.TCR0;
                const tcrRowCount = tcr0Value === '5 per row' ? 5 : 4;
                for (let i = 0; i < trainData.TCR; i++)
                {
                    for (let j = 1; j <= tcrRowCount; j++)
                    {
                        coachArrangementData.push({
                            Code: `TCR${tcrRowCount}_${i + 1}_${j}`,
                            coachId: tcrCoach.coachId,
                            trainId: newTrain.trainId,
                        });
                    }
                }
            }
        }

        // Handle TC case
        if (trainData.TC !== 0)
        {
            const tc0Value = trainData.TC0;
            const tcSide = tc0Value === '2 by side' ? 2 : 5;
            const tcCoach = await prisma.coach.findFirst({
                where: { coachCode: `TC${tcSide}` },
            });
            if (tcCoach)
            {
                for (let i = 0; i < trainData.TC; i++)
                {
                    for (let j = 1; j <= tcSide; j++)
                    {
                        coachArrangementData.push({
                            Code: `TC${tcSide}_${i + 1}_${j}`,
                            coachId: tcCoach.coachId,
                            trainId: newTrain.trainId,
                        });
                    }
                }
            }
        }

        // Handle SC case
        if (trainData.SC !== 0)
        {
            const scCoaches = await prisma.coach.findMany({
                where: { coachCode: 'SC' },
            });

            for (let i = 0; i < trainData.SC; i++)
            {
                if (scCoaches[i])
                {
                    coachArrangementData.push({
                        Code: `SC_${i + 1}`,
                        coachId: scCoaches[i].coachId,
                        trainId: newTrain.trainId,
                    });
                }
            }
        }

        // Create coach arrangements in the database
        const createdCoachArrangements = await prisma.coachArrangement.createMany({
            data: coachArrangementData,
        });

        return {
            train: newTrain,
            coachArrangements: createdCoachArrangements,
        };
    } catch (error)
    {
        throw error;
    }
};


module.exports = {
    addTrain,
};