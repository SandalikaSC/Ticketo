const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertTicket = async (passengers, journeyprice, startDate, tripType, ticketType, userid, startStation, endStation, classId) => {
    return await prisma.ticket.create({
        data: {
            noOfPassengers: passengers,
            price: journeyprice,
            journeyDate: startDate,
            tripType: tripType,
            userId: userid,
            startStation: {
                connect: { stationId: startStation } // Assuming stationId is the unique identifier for Station
            },
            endStation: {
                connect: { stationId: endStation } // Assuming stationId is the unique identifier for Station
            },
            ticketType: ticketType,
            classId: classId,
        }
    });
};

const updateReturnTicket = async (ticket, returnticket, price) => {
    return await prisma.ticket.update({
        where: { ticketId: ticket.ticketId },
        data: {
            returnTicketId: returnticket.ticketId,
            price: price,
        },
    });
};
module.exports = {
    insertTicket,
    updateReturnTicket
};


