/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `usertype` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nic]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loginStatus` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nic` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registeredDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "usertype",
ADD COLUMN     "accountStatus" BOOLEAN,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "loginStatus" BOOLEAN NOT NULL,
ADD COLUMN     "mobileNumber" TEXT NOT NULL,
ADD COLUMN     "nic" TEXT NOT NULL,
ADD COLUMN     "registeredDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "userType" TEXT NOT NULL,
ALTER COLUMN "password" DROP DEFAULT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_nic_key" ON "User"("nic");
