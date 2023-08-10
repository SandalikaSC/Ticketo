const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllStations = async () => {
    return await prisma.station.findMany({
        orderBy: { name: 'asc' }, // Order by 'name' in ascending order (alphabetical)
    });
};
module.exports = {
    getAllStations
};


