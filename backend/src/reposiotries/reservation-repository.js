const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getReservedSeats = async (coachArrangementId, date, scheduleId) => {
    const seatReservations = await prisma.seatReservation.findMany({
        where: {
            coachArrangementId: coachArrangementId,
            reserveDate: date,
        },
        include: {
            Reservation: {
                where: {
                    scheduleId: scheduleId,
                },
            },
        },
    });
    const seatReservationIds = seatReservations.map((reservation) => reservation.id);

    const seats = await prisma.seats.findMany({
        where: {
            SeatReservationID: {
                in: seatReservationIds,
            },
        },
    });

    return seats;
};
module.exports = {
    getReservedSeats
};


