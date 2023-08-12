const { insertTicket, updateReturnTicket } = require("../reposiotries/ticket-repository");
const { getJourneyPrice } = require("../reposiotries/journey-rerpositary")
const { getwallet, getavailableBalance } = require("../reposiotries/wallet-repository")
const { classIdgetClassIdByCode } = require("../reposiotries/class-repository");
const { Console } = require("console");



const PLATFORM_TICKET = 20;
const classTypeToCode = {
    "THIRD_CLASS_RESERVED": "TCR",
    "THIRD_CLASS_NOT_RESERVED": "TC",
    "FIRST_CLASS_AC": "FC",
    "FIRST_CLASS_RESERVED": "FCR",
    "OBSERVATION_CLASS": "OFV",
    "SLEEPER_CLASS": "SLEEP",
    "SECOND_CLASS_RESERVED": "SCR",
    "SECOND_CLASS_NOT_RESERVED": "SC",
};

const addTicket = async (startStation, endStation, tripType, startDate, returnDate, passengers, classname, user) => {
    try {
        //get journey price
        const baseJourneyPrice = await generateJourneyPrice(startStation, endStation, classname);

        var journeyprice = baseJourneyPrice * passengers;

        // check wallet balance
        const walletBalance = await getavailableBalance(user.id);
        if (walletBalance < journeyprice) {
            throw new Error("Insufficient balance please Recharge.");

        }
        //get class id
        const classValue = mapClassToValue(classname);
        var classId;
        if (classValue == 2) {
            classId = await classIdgetClassIdByCode(classTypeToCode["SECOND_CLASS_NOT_RESERVED"]);
        } else {
            classId = await classIdgetClassIdByCode(classTypeToCode["THIRD_CLASS_NOT_RESERVED"]);
        }


        if (tripType == 0) {
            var triptypeName = 'ONE_WAY';

        } else {
            var triptypeName = 'ROUND_TRIP';
        }
        // generate ticket
        var ticket = await insertTicket(
            passengers, journeyprice, startDate, triptypeName, "NORMAL", user.id, startStation, endStation, classId.classId);;
        if (tripType == 1) {
            var returnticket = await insertTicket(
                passengers, journeyprice, startDate, triptypeName, "NORMAL", user.id, startStation, endStation, classId.classId);

            if (ticket) {
                var updateticket = await updateReturnTicket(ticket.id, returnticket.ticketId, journeyprice * 2);
            }
        }
        console.log(ticket);
        console.log("journeyprice " + journeyprice);
        console.log('startDate' + startDate);
        console.log("triptypeName" + triptypeName);
        console.log(classId.classId);




        // const ticket = await insertTicket(nic, email, birthDate, hashPassword, firstName, lastName, phoneNumber);


    } catch (err) {
        console.log(err);
        throw new Error("Ticket generation failed");
    }
}
const generateJourneyPrice = async (startStation, endStation, classname) => {
    if (startStation == endStation) {
        return PLATFORM_TICKET;
    } else {

        try {
            const journey = await getJourneyPrice(startStation, endStation);

            const classValue = mapClassToValue(classname.toLowerCase());

            var price;
            switch (classValue) {
                case 1:
                    price = journey.firstClass;
                    break;
                case 2:
                    price = journey.secondClass;
                    break;
                case 3:
                    price = journey.thirdClass;
                    break;
                default:
                    price = 0;
                // Return a default value or handle unknown classes accordingly
            }
            console.error("rend price" + price);
            return price;

        } catch (error) {
            console.error(error);
            throw new Error("Error No journey");
        }

    }

}
function mapClassToValue(className) {
    switch (className.toLowerCase()) {
        case 'third class':
            return 3;
        case 'second class':
            return 2;
        case 'first class':
            return 1;
        default:
            return -1; // Return a default value or handle unknown classes accordingly
    }
}

// Test the function

// const login = async (email, password) => {
//     try {
//         const existingUser = await getUserByEmail(email);
//         if (!existingUser) {
//             throw new Error("User not found. Signup Please");
//         }

//         const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
//         if (!isPasswordCorrect) {

//             throw new Error("Invalid password");
//         }
//         const accessToken = jwt.sign({
//             id: existingUser.id,
//             nic: existingUser.nic,
//             email: existingUser.email,
//             firstName: existingUser.firstName,
//             lastName: existingUser.lastName,
//             mobileNumber: existingUser.mobileNumber,
//             userType: existingUser.userType,
//         }, ACCESS_TOKEN_SECRET, {
//             expiresIn: "2h",
//         });

//         const refreshToken = jwt.sign({ id: existingUser.id, email: existingUser.email, userType: existingUser.userType, type: "refresh" }, REFRESH_TOKEN_SECRET, {
//             expiresIn: "7d",
//         });

//         await updateToken(existingUser.id, refreshToken);
//         await updateaccessToken(existingUser.id, accessToken);
//         userType = existingUser.userType;
//         return { accessToken, refreshToken, userType };
//     } catch (error) {
//         console.error(error);
//         throw new Error("An error occurred during login");
//     }
// };


module.exports = {
    addTicket
};

