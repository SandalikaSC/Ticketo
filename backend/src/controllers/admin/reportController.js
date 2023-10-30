// reportController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getIncomeReport = async (req, res) => {
  try {
    const incomeReport = await prisma.payment.findMany();
    return res.status(200).json(incomeReport);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getIncomeReport,
};
