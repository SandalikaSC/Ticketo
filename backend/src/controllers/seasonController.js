const seasonService = require("../services/seasonService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addSeasonRequest = async (req, res) => {


    const user = req.user;
    const { duration, startStation, endStation, designation, workplace, workplaceAddress, seasonType, seasonClass, applicationForm } = req.body;
    if (
        !duration ||
        !startStation ||
        !endStation ||
        !designation ||
        !workplace ||
        !workplaceAddress ||
        !seasonType ||
        !seasonClass || !applicationForm
    ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }


    try {
        console.log("controller");
        const requestStatus = await seasonService.makeSeasonRequest(user.id, duration, startStation, endStation, designation, workplace, workplaceAddress, seasonType, seasonClass, applicationForm);

        if (requestStatus) {
            return res.status(200).json(requestStatus);
        } else {
            return res.status(400).json({ message: "Something went wrong" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
const getSeason = async (req, res) => {


    const user = req.user;
    try {
        const myseason = await seasonService.getSeasonbyUser(user.id);
        const seasonReq = await seasonService.getSeasonRequestbyUser(user.id);


        if (myseason || seasonReq) {
            // At least one of them is not null, so return 200
            return res.status(200).json({ myseason, seasonReq });
        } else {
            // Both are null, still return 200
            return res.status(200).json({ myseason, seasonReq });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
const getSeasonRequest = async (req, res) => {


    const user = req.user;
    try {
        const tickets = await seasonService.getSeasonRequestbyUser(user.id);

        if (tickets) {
            return res.status(200).json(tickets);
        } else {
            return res.status(404).json(tickets);
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
const deleteSeason = async (req, res) => {


    const user = req.user;
    const { seasonId } = req.body;
    if (
        !seasonId
    ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const requestResult = await seasonService.deleteSeasonRequest(user.id, seasonId);

        if (requestResult) {
            return res.status(200).json(requestResult);
        } else {
            return res.status(404).json("Something Went Wrong Try Again");
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
const paySeason = async (req, res) => {


    const user = req.user;
    const { seasonId } = req.body;
    if (
        !seasonId
    ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const requestResult = await seasonService.PayForSeason(user.id, seasonId);

        if (requestResult) {
            return res.status(200).json(requestResult);
        } else {
            return res.status(404).json("Something Went Wrong Try Again");
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}

// const getAllSeasonRequests = async(req, res)=>{

//     try{
//         const seasonRequests = await seasonService.getAllSeasonRequests();

//         if(seasonRequests){
//             return res.status(200).json(seasonRequests);
//         }else{
//             return res.status(404).json({ message:"No season card requests found"});
//         }
//        } catch (err) {
//         return res.status(500).json({message:err.message});
//     }
      
// };


const getAllSeasonRequests = async(req, res) =>{
    try{
        const cardsData = await seasonService.getAllSeasons();
        console.log(cardsData);
        if(cardsData){
                        return res.status(200).json(cardsData);
                    }else{
                        return res.status(404).json({ message:"No season card requests found"});
                    }
       
    }catch (error){
        console.error('Error fetching data:',error);
       return res.status(500).json({error:'Internal Server Error'})
    }
};

const acceptSeasonRequest = async (req, res) => {
    try {

        const user = req.user;
        const { seasonId } = req.body;
        if (
            !seasonId
        ) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const cardsData = await seasonService.acceptSeasonRequest(seasonId);
        console.log(cardsData);
        if (cardsData) {
            return res.status(200).json(cardsData);
        } else {
            return res.status(404).json({ message: "No season card requests found" });
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Internal Server Error' })
    }
};
const rejectSeasonRequest = async (req, res) => {
    try {

        const user = req.user;
        const { seasonId } = req.body;
        if (
            !seasonId
        ) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const cardsData = await seasonService.rejectSeasonRequest(seasonId);
        console.log(cardsData);
        if (cardsData) {
            return res.status(200).json(cardsData);
        } else {
            return res.status(404).json({ message: "No season card requests found" });
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Internal Server Error' })
    }
};




module.exports = {
    addSeasonRequest,
    getSeason,
    getSeasonRequest,
    deleteSeason,
    paySeason,
    getAllSeasonRequests,
    acceptSeasonRequest,
    rejectSeasonRequest
    
};
