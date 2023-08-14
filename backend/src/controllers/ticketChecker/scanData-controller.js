
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const scanData = async (req, res) =>
{
    const { id, resultData } = req.body;

    try
    {
        const parsedData = JSON.parse(resultData);
        const uuid = parsedData.uuid;
        const ticketType = parsedData.ticketType;

        const ticket = await prisma.ticket.findUnique({ where: { ticketId: uuid } });
        // console.log("ticket", ticket);
        const employee = await prisma.employee.findUnique({ where: { employeeId: id } });
        // console.log("employee", employee);
        const wallet = await prisma.wallet.findUnique({ where: { userId: ticket.userId } });

        const classDetails = await prisma.class.findUnique({ where: { classId: ticket.classId } });


        if (ticketType == 'NORMAL')
        {
            console.log("NORMAL");
            if (ticket.journeyState == 0)
            {

                await prisma.ticket.update({
                    where: { ticketId: uuid },
                    data: { startStation: employee.stationId },
                });

                if (ticket.startStation == ticket.endStation)
                {
                    res.status(200).json({ message: 'Journey cannot start.Please Try again later!' });
                }
                else
                {

                    const journey = await prisma.journey.findFirst({
                        where: {
                            AND: [
                                {
                                    OR: [
                                        { start: employee.stationId },
                                        { end: employee.stationId }
                                    ]
                                },
                                {
                                    OR: [
                                        { start: ticket.endStation },
                                        { end: ticket.endStation }
                                    ]
                                }
                            ]
                        }
                    });

                    console.log("journey", journey);
                    // Calculate ticket price based on class code
                    let ticketprice;
                    if (classDetails.code == 'FC')
                    {
                        ticketprice = journey.firstClass;
                    } else if (classDetails.code == 'SC')
                    {
                        ticketprice = journey.secondClass;
                    } else if (classDetails.code == 'TC')
                    {
                        ticketprice = journey.thirdClass;
                        console.log("ticketPrice", ticketprice);
                    }

                    console.log("ticket price", ticketprice);

                    const ticketPrice = parseFloat(ticketprice);
                    const holdValue = parseFloat(wallet.holdValue);
                    const walletBalance = parseFloat(wallet.walletBalance);

                    await prisma.ticket.update({
                        where: {
                            ticketId: ticket.ticketId,
                        },
                        data: {
                            price: ticketPrice,
                        },
                    });

                    if (holdValue >= ticketPrice)
                    {
                        // Update wallet holdValue
                        console.log("wallet hold value:", holdValue);

                        // Update ticket details and mark journey as started
                        await prisma.ticket.update({
                            where: { ticketId: uuid },
                            data: { scannedBy: employee.employeeId, journeyState: 1 },
                        });

                        res.status(200).json({ message: 'Journey started successfully' });

                    } else
                    {
                        if (walletBalance >= ticketPrice - holdValue)
                        {
                            // Update wallet balance and holdValue
                            await prisma.wallet.update({
                                where: { userId: ticket.userId },
                                data: {
                                    walletBalance: walletBalance - (ticketPrice - holdValue),
                                    holdValue: ticketPrice,
                                },
                            });

                            // Update ticket details and mark journey as started
                            await prisma.ticket.update({
                                where: { ticketId: uuid },
                                data: { scannedBy: employee.employeeId, journeyState: 1 },
                            });

                            // Send response: journey started successfully
                            res.status(200).json({ message: 'started successfully' });
                        } else
                        {
                            // Send error response: wallet balance is insufficient
                            res.status(400).json({ message: 'Wallet balance is insufficient. Please top up your wallet.' });
                        }

                        // Send error response: wallet holdValue is insufficient
                        // res.status(400).json({ message: 'Wallet holdValue is insufficient' });
                    }
                }
            } else if (ticket.journeyState == 1)
            {
                // Update endStation of Ticket table

                await prisma.ticket.update({
                    where: { ticketId: uuid },
                    data: { endStation: employee.stationId },
                });

                if (ticket.startStation == employee.stationId)
                {


                    //const ticketPrice = 20.00;
                    const holdValue = parseFloat(wallet.holdValue);
                    const walletBalance = parseFloat(wallet.walletBalance);
                    await prisma.ticket.update({
                        where: {
                            ticketId: ticket.ticketId,
                        },
                        data: {
                            price: 20.00,
                        },
                    });

                    if (holdValue >= 20.00)
                    {
                        // Update wallet holdValue
                        console.log("wallet hold value:", holdValue);

                        await prisma.wallet.update({
                            where: { userId: ticket.userId },
                            data: { holdValue: holdValue - 20.00 },
                        });



                        // Update ticket details and mark journey as started
                        await prisma.ticket.update({
                            where: { ticketId: uuid },
                            data: { scannedBy: employee.employeeId, journeyState: 2 },
                        });

                        res.status(200).json({ message: 'Platform ticket of Rs:20.00 deducted.' });

                    } else
                    {
                        if (walletBalance >= 20.00 - holdValue)
                        {
                            // Update wallet balance and holdValue
                            await prisma.wallet.update({
                                where: { userId: ticket.userId },
                                data: {
                                    walletBalance: walletBalance - (20.00 - holdValue),
                                    holdValue: 0.0,
                                },
                            });

                            // Update ticket details and mark journey as started
                            await prisma.ticket.update({
                                where: { ticketId: uuid },
                                data: { scannedBy: employee.employeeId, journeyState: 2 },
                            });

                            // Send response: journey started successfully
                            res.status(200).json({ message: 'Platform ticket of Rs:20.00 deducted.' });
                        } else
                        {
                            // Send error response: wallet balance is insufficient
                            res.status(400).json({ message: 'Wallet balance is insufficient. Please top up your wallet with Rs:20.00' });
                        }

                        // Send error response: wallet holdValue is insufficient
                        // res.status(400).json({ message: 'Wallet holdValue is insufficient' });
                    }


                }
                else if (ticket.startStation != ticket.endStation)
                {
                    // Calculate ticket price based on class code
                    const journey = await prisma.journey.findFirst({
                        where: {
                            AND: [
                                {
                                    OR: [
                                        { start: employee.stationId },
                                        { end: employee.stationId }
                                    ]
                                },
                                {
                                    OR: [
                                        { start: ticket.startStation },
                                        { end: ticket.startStation }
                                    ]
                                }
                            ]
                        }
                    });

                    let ticketprice;
                    if (classDetails.code == 'FC')
                    {
                        ticketprice = journey.firstClass;
                    } else if (classDetails.code == 'SC')
                    {
                        ticketprice = journey.secondClass;
                    } else if (classDetails.code == 'TC')
                    {
                        ticketprice = journey.thirdClass;
                    }

                    const ticketPrice = parseFloat(ticketprice);
                    await prisma.ticket.update({
                        where: {
                            ticketId: ticket.ticketId,
                        },
                        data: {
                            price: ticketPrice,
                        },
                    });

                    const holdValue = parseFloat(wallet.holdValue);
                    const walletBalance = parseFloat(wallet.walletBalance);
                    if (holdValue >= ticketPrice)
                    {
                        // Update wallet holdValue
                        console.log("wallet hold value:", holdValue);

                        await prisma.wallet.update({
                            where: { userId: ticket.userId },
                            data: { holdValue: holdValue - ticketPrice },
                        });



                        // Update ticket details and mark journey as started
                        await prisma.ticket.update({
                            where: { ticketId: uuid },
                            data: { scannedBy: employee.employeeId, journeyState: 2 },
                        });

                        res.status(200).json({ message: 'Journey ended successfully' });

                    } else
                    {
                        if (walletBalance >= ticketPrice - holdValue)
                        {
                            // Update wallet balance and holdValue
                            await prisma.wallet.update({
                                where: { userId: ticket.userId },
                                data: {
                                    walletBalance: walletBalance - (ticketPrice - holdValue),
                                    holdValue: 0.0,
                                },
                            });

                            // Update ticket details and mark journey as started
                            await prisma.ticket.update({
                                where: { ticketId: uuid },
                                data: { scannedBy: employee.employeeId, journeyState: 2 },
                            });

                            // Send response: journey started successfully
                            res.status(200).json({ message: 'Journey Ended Successfully!' });
                        } else
                        {
                            // Send error response: wallet balance is insufficient
                            res.status(400).json({ message: 'Wallet balance is insufficient. Please top up your wallet.' });
                        }

                        // Send error response: wallet holdValue is insufficient
                        // res.status(400).json({ message: 'Wallet holdValue is insufficient' });
                    }
                }
            } else if (ticket.journeyState == 2)
            {
                res.status(400).json({ message: 'Your ticket has been ended. Buy a new ticket.' });
            }
        } else
        {
            // Handle other ticket types if needed
            res.status(400).json({ message: 'Invalid ticket type' });
        }
    } catch (error)
    {
        console.error('Error processing scanned data:', error);
        res.status(500).json({ message: 'An error occurred while processing scanned data' });
    }
};


module.exports = {
    scanData
};

