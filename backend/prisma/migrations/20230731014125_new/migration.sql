-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'OPERATING_CENTER', 'STATION_MASTER', 'DRIVER', 'TICKET_CLERK', 'TICKET_CHECKER', 'PASSENGER');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "nic" TEXT,
    "email" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "loginStatus" BOOLEAN NOT NULL DEFAULT false,
    "accountStatus" BOOLEAN NOT NULL DEFAULT false,
    "registeredDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mobileNumber" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userRole" "UserRole"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "employeeId" TEXT NOT NULL,
    "addedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addedByUserId" TEXT,
    "stationId" INTEGER,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependent" (
    "dependentId" SERIAL NOT NULL,

    CONSTRAINT "Dependent_pkey" PRIMARY KEY ("dependentId")
);

-- CreateTable
CREATE TABLE "Station" (
    "stationId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "geoLocation" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("stationId")
);

-- CreateTable
CREATE TABLE "_DependentToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nic_key" ON "User"("nic");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_DependentToUser_AB_unique" ON "_DependentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DependentToUser_B_index" ON "_DependentToUser"("B");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_addedByUserId_fkey" FOREIGN KEY ("addedByUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("stationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependentToUser" ADD CONSTRAINT "_DependentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Dependent"("dependentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependentToUser" ADD CONSTRAINT "_DependentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
