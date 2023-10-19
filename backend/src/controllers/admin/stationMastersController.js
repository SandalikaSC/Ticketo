const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getStationMasters = async (req, res) => {
  try {
    const stationMasters = await prisma.user.findMany({
      where: {
        userType: 'station master',
      },
      include: {
        employee: true,
      },
    });

    return res.status(200).json(stationMasters);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getStationMasters,
};
