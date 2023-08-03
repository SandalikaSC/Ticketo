const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserByEmail = async (email) =>
{
  return await prisma.user.findUnique({ where: { email: email } });
};

const getUserByMobile = async (mobileNumber) =>
{
  return await prisma.user.findUnique({ where: { mobileNumber: mobileNumber } });
}

const updateToken = async (id, refreshToken) =>
{
  return await prisma.user.update({ where: { id: id }, data: { token: refreshToken } });
}

const updateOTP = async (email, otp, otpGenerateTime) =>
{
  return await prisma.user.update({ where: { email: email }, data: { otp: otp, otpGenerateTime: otpGenerateTime } });
}

const getOTP = async (email, mobileNumber) =>
{
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: email },
        {
          mobileNumber: mobileNumber
        }
      ]
    },
    select: {
      otp: true,
      otpGenerateTime: true
    }
  });

  return user;
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
  getUserByMobile,
  updateToken,
  insertUser,
  getOTP,
  updateOTP
};


