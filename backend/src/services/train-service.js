const trainRepository = require('../reposiotries/trainRepository');

const addTrain = async (trainData) =>
{
    try
    {
        // Create the train record and get its ID using the repository
        const newTrain = await trainRepository.createTrain({
            trainName: trainData.trainName,
            trainNumber: trainData.trainNumber,
        });

        const coachArrangementData = [];

        // Define an array of alphabet letters
        const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        // Handle FC case
        if (trainData.FC !== 0)
        {
            const fcCoach = await trainRepository.findCoachByCode('FC4');
            if (fcCoach)
            {
                for (let i = 0; i < trainData.FC; i++)
                {
                    coachArrangementData.push({
                        Code: `FC4_${alphabet[i]}`,
                        coachId: fcCoach.coachId,
                        trainId: newTrain.trainId,
                    });
                }
            }
        }

        // Handle OFV case
        if (trainData.OFV !== 0)
        {
            const ofvCoach = await trainRepository.findCoachByCode('OFV4');
            if (ofvCoach)
            {
                for (let i = 0; i < trainData.OFV; i++)
                {
                    coachArrangementData.push({
                        Code: `OFV4_${alphabet[i]}`,
                        coachId: ofvCoach.coachId,
                        trainId: newTrain.trainId,
                    });
                }
            }
        }

        // Handle SLEEPER case
        if (trainData.SLEEPER !== 0)
        {
            const sleeperCoach = await trainRepository.findCoachByCode('SLEEPER4');
            if (sleeperCoach)
            {
                for (let i = 0; i < trainData.SLEEPER; i++)
                {
                    coachArrangementData.push({
                        Code: `SLEEPER4_${alphabet[i]}`,
                        coachId: sleeperCoach.coachId,
                        trainId: newTrain.trainId,
                    });
                }
            }
        }

        // Handle SCR case
        if (trainData.SCR !== 0)
        {
            const scrCoach = await trainRepository.findCoachByCode('SCR4');
            if (scrCoach)
            {
                for (let i = 0; i < trainData.SCR; i++)
                {
                    coachArrangementData.push({
                        Code: `SCR4_${alphabet[i]}`,
                        coachId: scrCoach.coachId,
                        trainId: newTrain.trainId,
                    });
                }
            }
        }

        if (trainData.SC !== 0)
        {
            const scCoach = await trainRepository.findCoachByCode('SC4');
            if (scCoach)
            {
                for (let i = 0; i < trainData.SC; i++)
                {
                    coachArrangementData.push({
                        Code: `SC4_${alphabet[i]}`,
                        coachId: scCoach.coachId,
                        trainId: newTrain.trainId,
                    });
                }
            }
        }

        // Handle TCR case
        if (trainData.TCR !== 0)
        {
            const tcr5Coach = await trainRepository.findCoachByCode('TCR5');
            const tcr4Coach = await trainRepository.findCoachByCode('TCR4');
            if (tcr5Coach)
            {
                const tcr0Value = trainData.TCR0;
                if (tcr0Value === '5 per row')
                {
                    for (let i = 0; i < trainData.TCR; i++)
                    {
                        coachArrangementData.push({
                            Code: `TCR5_${alphabet[i]}`,
                            coachId: tcr5Coach.coachId,
                            trainId: newTrain.trainId,
                        });
                    }
                } else if (tcr0Value === '4 per row')
                {
                    for (let i = 0; i < trainData.TCR; i++)
                    {
                        coachArrangementData.push({
                            Code: `TCR4_${alphabet[i]}`,
                            coachId: tcr4Coach.coachId,
                            trainId: newTrain.trainId,
                        });
                    }
                }
            }
        }

        // Handle TC case
        if (trainData.TC !== 0)
        {
            const tc5Coach = await trainRepository.findCoachByCode('TC5');
            const tc2Coach = await trainRepository.findCoachByCode('TC2');
            if (tc5Coach)
            {
                const tc0Value = trainData.TC0;
                if (tc0Value === '5 per row')
                {
                    for (let i = 0; i < trainData.TC; i++)
                    {
                        coachArrangementData.push({
                            Code: `TC5_${alphabet[i]}`,
                            coachId: tc5Coach.coachId,
                            trainId: newTrain.trainId,
                        });
                    }
                } else if (tc0Value === '2 by side')
                {
                    for (let i = 0; i < trainData.TC; i++)
                    {
                        coachArrangementData.push({
                            Code: `TC2_${alphabet[i]}`,
                            coachId: tc2Coach.coachId,
                            trainId: newTrain.trainId,
                        });
                    }
                }
            }
        }

        // Create coach arrangements using the repository
        const createdCoachArrangements = await trainRepository.createCoachArrangements(coachArrangementData);

        return {
            train: newTrain,
            coachArrangements: createdCoachArrangements,
        };
    } catch (error)
    {
        throw error;
    }
};

const getTrains = async() =>{
    try
    {
      return await getAllTrains();
    } catch (error)
    {
      throw new Error("An error occurred during login");
    }
}

module.exports = {
    addTrain,
    getTrains
};
