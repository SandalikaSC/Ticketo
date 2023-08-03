/*
  Warnings:

  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Employee` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userRole` on the `User` table. All the data in the column will be lost.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "userType" AS ENUM ('ADMIN', 'CONTROL_CENTER', 'STATION_MASTER', 'DRIVER', 'TICKET_CLERK', 'TICKET_CHECKER', 'PASSENGER');

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_addedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "_DependentToUser" DROP CONSTRAINT "_DependentToUser_B_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("employeeId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "userId",
DROP COLUMN "userRole",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "userType" "userType"[],
ALTER COLUMN "token" SET DEFAULT '',
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Wallet" (
    "walletId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "walletBalance" DOUBLE PRECISION NOT NULL,
    "holdValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("walletId")
);

-- CreateTable
CREATE TABLE "SeasonCard" (
    "seasonId" TEXT NOT NULL,
    "seasonStartDate" TIMESTAMP(3),
    "seasonEndDate" TIMESTAMP(3),
    "duration" INTEGER NOT NULL,
    "startStation" INTEGER NOT NULL,
    "endStation" INTEGER NOT NULL,
    "dateIssued" TIMESTAMP(3),
    "approvedStatus" BOOLEAN NOT NULL DEFAULT false,
    "certifiedBy" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SeasonCard_pkey" PRIMARY KEY ("seasonId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_addedByUserId_fkey" FOREIGN KEY ("addedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonCard" ADD CONSTRAINT "SeasonCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonCard" ADD CONSTRAINT "SeasonCard_startStation_fkey" FOREIGN KEY ("startStation") REFERENCES "Station"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonCard" ADD CONSTRAINT "SeasonCard_endStation_fkey" FOREIGN KEY ("endStation") REFERENCES "Station"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependentToUser" ADD CONSTRAINT "_DependentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
