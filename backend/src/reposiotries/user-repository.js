const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email: email } });
};
const getUserByNic = async (nic) => {
  return await prisma.user.findUnique({ where: { nic: nic } });
};
const getUserByNicEmail = async (nic, email) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        { nic: nic }, // Find by nic
        { email: email }, // Find by email
      ],
    },
  });
};

const getUserByMobile = async (mobileNumber) => {
  return await prisma.user.findUnique({ where: { mobileNumber: mobileNumber } });
}

const updateToken = async (id, refreshToken) => {
  return await prisma.user.update({ where: { id: id }, data: { token: refreshToken } });
}

const updateaccessToken = async (id, accessToken) => {
  return await prisma.user.update({ where: { id: id }, data: { accessToken: accessToken } });
}

const addEmployeeAsPassenger = async (nic) => {

  return await prisma.user.update({
    where: {
      nic: nic,
    },
    data: {
      userType: {
        push: 'PASSENGER',
      },
    },
  });
};

const updateOTP = async (email, otp, otpGenerateTime) => {
  return await prisma.user.update({ where: { email: email }, data: { otp: otp, otpGenerateTime: otpGenerateTime } });
}

const getOTP = async (email, mobileNumber) => {
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

const insertUser = async (nic, email, birthDate, hashPassword, firstName, lastName, phoneNumber) => {
  return await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
      userType: { set: ['PASSENGER'] },
      nic: nic,
      dob: birthDate,
      mobileNumber: phoneNumber,
      accountStatus: true,
      token: "",
      wallet: {
        create: {
          walletBalance: 0.0,
          holdValue: 0.0,
        },
      },
    }
  })
}
const insertTemperyOtp = async (nic, otp) => {
  return await prisma.verificationOtp.create({
    data: {
      nic: nic,
      otp: otp
    }
  })
}
const updatePassword = async (email, mobileNumber, hashPassword) => {
  if (email) {
    return await prisma.user.update({
      where: { email: email },
      data: { password: hashPassword },
    });
  } else if (mobileNumber) {
    return await prisma.user.update({
      where: { mobileNumber: mobileNumber },
      data: { password: hashPassword },
    });
  } else {
    throw new Error('Neither email nor mobileNumber provided.');
  }
};
const getTempOtp = async (nic) => {
  return await prisma.verificationOtp.findFirst({
    where: { nic: nic },
    orderBy: { time: 'desc' }, // Sort by 'time' in descending order (latest first)
  });


}

module.exports = {
  getTempOtp,
  getUserByEmail,
  getUserByNic,
  getUserByMobile,
  addEmployeeAsPassenger,
  updateToken,
  updateaccessToken,
  insertUser,
  getOTP,
  updateOTP,
  getUserByNicEmail,
  updatePassword,
  insertTemperyOtp
};


