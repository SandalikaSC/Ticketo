


// const scanData = async (req, res) =>
// {
//     const resultData = req.body.resultData;
//     console.log("Received Scanned Data:", resultData);

//     res.status(200).json({ message: 'Data received successfully' });
// };
const scanData = async (req, res) =>
{
    const { id, resultData } = req.body; // Destructure id and resultData from the request body
    console.log("Received Scanned Data:", resultData);

    try
    {
        const parsedData = JSON.parse(resultData);
        const uuid = parsedData.uuid;
        const ticketType = parsedData.ticketType;

        // Now you can use the uuid and ticketType variables as needed
        console.log("UUID:", uuid);
        console.log("Ticket Type:", ticketType);
        console.log("id of user", id);

        res.status(200).json({ message: 'Data received successfully' });
    } catch (error)
    {
        console.error("Error parsing scanned data:", error);
        res.status(400).json({ message: 'Error parsing scanned data' });
    }
};


module.exports = {
    scanData
};