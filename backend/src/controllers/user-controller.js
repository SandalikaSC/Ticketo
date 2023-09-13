const authService = require('../services/auth-service');
const { findStation } = require('../reposiotries/station-repository')

const addUser = async (req, res) =>
{
    try
    {
        const authHeader = req.headers.authorization;
        const submittedUser = await authService.verifyToken(authHeader);
        const id = submittedUser.id;
        if (submittedUser.userType.includes("ADMIN"))
        {
            const { firstName, lastName, station, mobileNumber, email, nic } = req.body;
            const userType = "STATION_MASTER";
            const addedUser = await authService.addEmployee(id, firstName, lastName, station, mobileNumber, email, nic, userType);
            // console.log("User added successfully:", addedUser);
            res.status(201).json({ message: "User added successfully", addedUser });

        } else if (submittedUser.userType.includes("STATION_MASTER"))
        {
            const { firstName, lastName, email, jobPosition, nic, mobileNumber } = req.body;

            const station = await findStation(id);
            if (jobPosition == "clerk")
            {
                userType = "TICKET_CLERK";
                const addedUser = await authService.addEmployee(id, firstName, lastName, station, mobileNumber, email, nic, userType);
                // console.log("User added successfully:", addedUser);
                res.status(201).json({ message: "User added successfully", addedUser });
            }
            else if (jobPosition == "checker")
            {
                userType = "TICKET_CHECKER";
                const addedUser = await authService.addEmployee(id, firstName, lastName, station, mobileNumber, email, nic, userType);
                console.log("User added successfully:", addedUser); +
                    res.status(201).json({ message: "User added successfully", addedUser });
            }


        } else
        {
            console.log("error occured");
            res.status(403).json({ error: "Permission denied" });
        }
    } catch (error)
    {
        console.error("Error in add user:", error);
        res.status(500).json({ error: "An error occurred" });
    }
};


// Export the functions for use in other modules
module.exports = {
    addUser,
};
