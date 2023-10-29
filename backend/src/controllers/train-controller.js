
const trainService = require("../services/train-service");

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
            return res.status(400).json({ error: "Validation failed: Please provide valid inputs." });
        }

        // Call train service to handle the logic
        const result = await trainService.addTrain(trainData);

        return res.status(201).json(result);
    } catch (error)
    {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while processing the request." });
    }
};

const getAllTrains = async (req, res) => {
    try {
        const trains = await trainService.getTrains();
        // console.log(trains);
        if (trains) {
            return res.status(200).json({ trains: trains });
        } else {
            return res.status(400).json({ message: "Not found" });
        }

    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    addTrain,
    getAllTrains
};
