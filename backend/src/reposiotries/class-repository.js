const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const classIdgetClassIdByCode = async (code) => {
    return await prisma.class.findFirst({
        where: {
            code: code,
        },
        select: {
            classId: true,
        },
    });
};
classIdgetClassIdByCode
module.exports = {
    classIdgetClassIdByCode
};


