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

const insertUser = async (firstName, lastName, email, hashPassword, userType, nic, mobileNumber, dob) =>
{
  return await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashPassword,
      userType: { set: [userType] },
      nic,
      dob,
      mobileNumber,
      token: ""
    }
  })
}
module.exports = {
  getUserByEmail,
  updateToken,
  insertUser
};


