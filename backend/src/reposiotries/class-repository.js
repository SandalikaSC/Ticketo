const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const classIdgetClassIdByCode = async (code) =>
{
    return await prisma.class.findFirst({
        where: {
            code: code,
        },
        select: {
            classId: true,
        },
    });
};
const getClassnameById = async (id) =>
{
    return await prisma.class.findFirst({
        where: {
            classId: id,
        },
        select: {
            code: true,
        },
    });
};

const getClass = async (classId) =>
{
    return await prisma.class.findUnique({ where: { classId: classId } });
}
classIdgetClassIdByCode
module.exports = {
    classIdgetClassIdByCode,
    getClassnameById,
    getClass
};


