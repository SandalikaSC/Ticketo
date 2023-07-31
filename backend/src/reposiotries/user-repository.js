const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserByEmail = async (email) =>
{
  return await prisma.user.findUnique({ where: { email: email } });
};

const updateToken = async (id, refreshToken) =>
{
  return await prisma.user.update({ where: { id: id }, data: { token: refreshToken } });
}

const insertUser = async (firstName, email, hashPassword, userType) =>
{
  return await prisma.user.create({
    data: {
      firstName,
      email,
      password: hashPassword,
      userType,
      token: ""
    }
  })
}
module.exports = {
  getUserByEmail,
  updateToken,
  insertUser
};


