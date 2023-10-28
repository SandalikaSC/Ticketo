const locationUpdate = async (req, res) =>
{
    console.log("hi");
    console.log(req.body);
    return res.status(200).json({ message: "successfully updated " });
}

module.exports = { locationUpdate };