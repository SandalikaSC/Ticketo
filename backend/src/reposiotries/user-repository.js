const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email: email } });
};
const getUserByNic = async (nic) => {
  return await prisma.user.findUnique({ where: { nic: nic } });
};

const getUserByMobile = async (mobileNumber) => {
  return await prisma.user.findUnique({ where: { mobileNumber: mobileNumber } });
}

const updateToken = async (id, refreshToken) => {
  return await prisma.user.update({ where: { id: id }, data: { token: refreshToken } });
}
const addEmployeeAsPassenger = async (nic) => {
  try {
    // Find the user with the matching NIC
    const userToUpdate = await prisma.user.findFirst({ where: { nic: nic } });

    if (!userToUpdate) {
      // User with the provided NIC does not exist
      throw new Error({ message: "Employee not found " });
    }


    // Add the new role to the userType array
    const updatedUser = await prisma.user.updateMany({
      where: { nic: nic },
      data: {
        userType: [...userToUpdate.userType, 'PASSENGER'],
      },
    });

    return updatedUser;
  } catch (error) {
    // Handle any error that might occur during the process
    console.error(error);
    throw new Error("An error occurred while adding the new role to the user.");
  }
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
      token: ""
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


module.exports = {
  getUserByEmail,
  getUserByNic,
  getUserByMobile,
  addEmployeeAsPassenger,
  updateToken,
  insertUser,
  getOTP,
  updateOTP,
  updatePassword
};


