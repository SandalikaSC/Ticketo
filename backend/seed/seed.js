const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main()
{
    const stationData = [
        {
            name: 'Abanpola',
            latitude: 7.9191593978269585,
            longitude: 80.24610072883551,
            contactNumber: '+94253891292',
        },
        {
            name: 'Agbopura',
            latitude: 8.326962653569677,
            longitude: 80.97974659692282,
            contactNumber: '+94771879448',
        },
        {
            name: 'Ahangama',
            latitude: 5.973381846866456,
            longitude: 80.36371580669417,
            contactNumber: '+94912283271',
        },
        {
            name: 'Ahungalle',
            latitude: 6.3129101606375215,
            longitude: 80.03758907971037,
            contactNumber: null,
        },
        {
            name: 'Akurala',
            latitude: 6.192301917328595,
            longitude: 80.0649127527224,
            contactNumber: null,
        },
        {
            name: 'Alawwa',
            latitude: 7.293554459377983,
            longitude: 80.2385616085557,
            contactNumber: '+94372278171',
        },
        {
            name: 'Alawathupitiya',
            latitude: 7.116038463034067,
            longitude: 79.88709429690901,
            contactNumber: null,
        },
        {
            name: 'Aluthgama',
            latitude: 6.43207381963862,
            longitude: 80.00036135272454,
            contactNumber: '+94342275282',
        },
        {
            name: 'Ambalangoda',
            latitude: 6.235459770328387,
            longitude: 80.05513779874897,
            contactNumber: '+94912258271',
        },
        // Add more station data here...
    ];

    for (const data of stationData)
    {
        await prisma.station.create({
            data,
        });
    }


    const classData = [
        { className: 'THIRD_CLASS_RESERVED', code: 'TCR' },
        { className: 'THIRD_CLASS_NOT_RESERVED', code: 'TC' },
        { className: 'FIRST_CLASS_AC', code: 'FC' },
        { className: 'FIRST_CLASS_RESERVED', code: 'FCR' },
        { className: 'OBSERVATION_CLASS', code: 'OFV' },
        { className: 'SLEEPER_CLASS', code: 'SLEEP' },
        { className: 'SECOND_CLASS_RESERVED', code: 'SCR' },
        { className: 'SECOND_CLASS_NOT_RESERVED', code: 'SC' },
        // Add more class data here...
    ];


    for (const data of classData)
    {
        await prisma.class.create({
            data,
        });
    }

    const coachData = [
        { coachCode: 'TC5', seatCapacity: 48, seatArrangement: 5, classId: 2, reservable: false },
        { coachCode: 'TC2', seatCapacity: 48, seatArrangement: 2, classId: 2, reservable: false },
        { coachCode: 'TCR5', seatCapacity: 48, seatArrangement: 5, classId: 1, reservable: true },
        { coachCode: 'TCR4', seatCapacity: 48, seatArrangement: 4, classId: 1, reservable: true },
        { coachCode: 'FC4', seatCapacity: 48, seatArrangement: 4, classId: 3, reservable: true },
        { coachCode: 'OFV4', seatCapacity: 48, seatArrangement: 4, classId: 5, reservable: true },
        { coachCode: 'SLEEP4', seatCapacity: 48, seatArrangement: 4, classId: 6, reservable: true },
        { coachCode: 'SCR', seatCapacity: 48, seatArrangement: 4, classId: 7, reservable: true },
        { coachCode: 'SC', seatCapacity: 48, seatArrangement: 4, classId: 8, reservable: false },
        // Add more coach data here...
    ];

    for (const data of coachData)
    {
        await prisma.coach.create({
            data,
        });
    } cd
}

main()
    .catch((e) =>
    {
        throw e;
    })
    .finally(async () =>
    {
        await prisma.$disconnect();
    });
