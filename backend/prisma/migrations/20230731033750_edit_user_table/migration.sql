/*
  Warnings:

  - The `userType` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[nic]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "userType" AS ENUM ('ADMIN', 'OPERATING_CENTER', 'STATION_MASTER', 'DRIVER', 'TICKET_CLERK', 'TICKET_CHECKER', 'PASSENGER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "loginStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mobileNumber" TEXT NOT NULL,
ADD COLUMN     "nic" TEXT,
DROP COLUMN "userType",
ADD COLUMN     "userType" "userType"[];

-- CreateIndex
CREATE UNIQUE INDEX "User_nic_key" ON "User"("nic");
