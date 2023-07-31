/*
  Warnings:

  - You are about to drop the column `accountStatus` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `loginStatus` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mobileNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nic` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `registeredDate` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_nic_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountStatus",
DROP COLUMN "dob",
DROP COLUMN "lastName",
DROP COLUMN "loginStatus",
DROP COLUMN "mobileNumber",
DROP COLUMN "nic",
DROP COLUMN "registeredDate";
