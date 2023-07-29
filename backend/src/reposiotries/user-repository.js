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

const insertUser = async (name, email, hashPassword, usertype) =>
{
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      usertype,
      token: ""
    }
  })
}
module.exports = {
  getUserByEmail,
  updateToken,
  insertUser
};


