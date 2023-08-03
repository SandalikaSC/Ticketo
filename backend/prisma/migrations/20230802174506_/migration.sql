-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otp" TEXT DEFAULT '',
ADD COLUMN     "otpGenerateTime" TIMESTAMP(3);
