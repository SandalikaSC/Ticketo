const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTickets = async (userId) =>
{
    return prisma.ticket.findMany({
        where: {
            userId: userId,
        },
    });
};

const insertTicket = async (passengers, journeyprice, startDate, tripType, ticketType, userid, startStation, endStation, classId) =>
{
    return await prisma.$transaction(async (tx) =>
    {
        try
        {
            // Fetch the user's wallet
            const userWallet = await tx.wallet.findUnique({
                where: { userId: userid },
            });

            if (!userWallet)
            {
                throw new Error("User wallet not found");
            }

            // Update the wallet's hold value
            const updatedWallet = await tx.wallet.update({
                where: { walletId: userWallet.walletId },
                data: { holdValue: userWallet.holdValue + journeyprice },
            });

            // Insert the ticket
            const insertedTicket = await tx.ticket.create({
                data: {
                    noOfPassengers: passengers,
                    price: journeyprice,
                    journeyDate: startDate,
                    tripType: tripType,
                    userId: userid,
                    startStation: startStation,
                    endStation: endStation,
                    ticketType: ticketType,
                    classId: classId,
                },
            });

            return insertedTicket;
        } catch (error)
        {
            throw new Error("Failed to complete the transaction: " + error.message);
        }
    });
};

const updateReturnTicket = async (ticket, returnticket) =>
{
    return await prisma.ticket.update({
        where: { ticketId: ticket },
        data: {
            returnTicketId: returnticket
        },
    });
};

const getTicket = async (uuid) =>
{
    return await prisma.ticket.findUnique({ where: { ticketId: uuid } });
}
module.exports = {
    insertTicket,
    updateReturnTicket,
    getTickets,
    getTicket
};


