const { insertTicket } = require("../reposiotries/ticket-repository");



const addTicket = async (startStation, endStation, tripType, startDate, returnDate, passengers, classname) => {
    try {


        const newUser = await insertTicket(nic, email, birthDate, hashPassword, firstName, lastName, phoneNumber);
        return newUser;

    } catch (err) {
        throw new Error("SignUp failed");
    }
}
const login = async (email, password) => {
    try {
        const existingUser = await getUserByEmail(email);
        if (!existingUser) {
            throw new Error("User not found. Signup Please");
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect) {

            throw new Error("Invalid password");
        }
        const accessToken = jwt.sign({
            id: existingUser.id,
            nic: existingUser.nic,
            email: existingUser.email,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            mobileNumber: existingUser.mobileNumber,
            userType: existingUser.userType,
        }, ACCESS_TOKEN_SECRET, {
            expiresIn: "2h",
        });

        const refreshToken = jwt.sign({ id: existingUser.id, email: existingUser.email, userType: existingUser.userType, type: "refresh" }, REFRESH_TOKEN_SECRET, {
            expiresIn: "7d",
        });

        await updateToken(existingUser.id, refreshToken);
        await updateaccessToken(existingUser.id, accessToken);
        userType = existingUser.userType;
        return { accessToken, refreshToken, userType };
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred during login");
    }
};


module.exports = {
    addTicket
};

