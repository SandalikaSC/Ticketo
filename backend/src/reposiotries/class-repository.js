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
const getClassnameById = async (id) => {
    return await prisma.class.findFirst({
        where: {
            classId: id,
        },
        select: {
            code: true,
        },
    });
};
classIdgetClassIdByCode
module.exports = {
    classIdgetClassIdByCode,
    getClassnameById
};


