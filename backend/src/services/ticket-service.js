const { insertTicket, updateReturnTicket } = require("../reposiotries/ticket-repository");
const { getJourneyPrice } = require("../reposiotries/journey-rerpositary")
const { getwallet, getavailableBalance } = require("../reposiotries/wallet-repository")
const { classIdgetClassIdByCode } = require("../reposiotries/class-repository");
const { Console } = require("console");
const { ticketType } = require("@prisma/client");
const qr = require('qrcode');



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

        } else {
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
                    passengers, journeyprice, returnDate, "RETURN", "NORMAL", user.id, endStation, startStation, classId.classId);

                if (ticket) {
                    var updateticket = await updateReturnTicket(ticket.ticketId, returnticket.ticketId);
                }
            }
            var qrCode = await generateQRCode(ticket.ticketId, ticket.ticketType);
            console.log("Generated QR Code:", qrCode);
            console.log("Inserted Ticket:", ticket);
            return { qrCode, ticket };
        }

    } catch (err) {
        console.log(err);
        throw new Error("Ticket generation failed");
    }
}
const generateQRCode = async (ticketId, ticketType) => {
    try {
        const qrCode = await qr.toBuffer(JSON.stringify(
            { ticketId: ticketId, ticketType: ticketType }
        ));
        return qrCode;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
};
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

module.exports = {
    addTicket
};

