-- CreateEnum
CREATE TYPE "userType" AS ENUM ('ADMIN', 'CONTROL_CENTRE', 'STATION_MASTER', 'DRIVER', 'TICKET_CLERK', 'TICKET_CHECKER', 'PASSENGER');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('Wallet', 'Online');

-- CreateEnum
CREATE TYPE "payRelatedType" AS ENUM ('Fine', 'Ticket', 'SeasonCard', 'Refund');

-- CreateEnum
CREATE TYPE "ticketType" AS ENUM ('NORMAL', 'RESERVATION');

-- CreateEnum
CREATE TYPE "gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "classCode" AS ENUM ('OFV', 'SLEEP', 'FCR', 'SCR', 'TCR');

-- CreateEnum
CREATE TYPE "WorkingDays" AS ENUM ('WEEKDAYS', 'WEEKENDS', 'SUNDAY', 'HOLIDAY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
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
    "token" TEXT NOT NULL DEFAULT '',
    "userType" "userType"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "employeeId" TEXT NOT NULL,
    "addedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addedByUserId" TEXT,
    "stationId" INTEGER,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employeeId")
);

-- CreateTable
CREATE TABLE "Dependent" (
    "dependentId" SERIAL NOT NULL,

    CONSTRAINT "Dependent_pkey" PRIMARY KEY ("dependentId")
);

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

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL,
    "walletId" TEXT,
    "relatedId" TEXT,
    "RelatedName" "payRelatedType",

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateTable
CREATE TABLE "Fine" (
    "fineId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payStatus" BOOLEAN NOT NULL DEFAULT false,
    "ticketId" TEXT NOT NULL,

    CONSTRAINT "Fine_pkey" PRIMARY KEY ("fineId")
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
CREATE TABLE "Ticket" (
    "ticketId" TEXT NOT NULL,
    "noOfPassengers" INTEGER NOT NULL,
    "ticketStatus" BOOLEAN NOT NULL DEFAULT false,
    "purchasedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "journeyState" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL,
    "journeyDate" TIMESTAMP(3) NOT NULL,
    "ticketType" "ticketType" NOT NULL,
    "userId" TEXT NOT NULL,
    "startStation" INTEGER NOT NULL,
    "endStation" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "scannedBy" TEXT,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "ticketId" TEXT NOT NULL,
    "scheduleId" INTEGER,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "TravelerReservation" (
    "id" SERIAL NOT NULL,
    "seatNumber" TEXT NOT NULL,
    "ticketId" TEXT,
    "travelerId" INTEGER,

    CONSTRAINT "TravelerReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Traveler" (
    "travelerId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "gender" "gender" NOT NULL,

    CONSTRAINT "Traveler_pkey" PRIMARY KEY ("travelerId")
);

-- CreateTable
CREATE TABLE "Class" (
    "classId" SERIAL NOT NULL,
    "className" TEXT NOT NULL,
    "code" "classCode",

    CONSTRAINT "Class_pkey" PRIMARY KEY ("classId")
);

-- CreateTable
CREATE TABLE "Train" (
    "trainId" SERIAL NOT NULL,
    "trainName" TEXT NOT NULL,
    "trainNumber" TEXT NOT NULL,

    CONSTRAINT "Train_pkey" PRIMARY KEY ("trainId")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "scheduleId" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "start" INTEGER,
    "end" INTEGER,
    "driverId" TEXT NOT NULL,
    "trainId" INTEGER NOT NULL,
    "WorkingDays" "WorkingDays"[],
    "notWorking" "WorkingDays"[],

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("scheduleId")
);

-- CreateTable
CREATE TABLE "StationSchedule" (
    "id" SERIAL NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "waitingTime" DECIMAL(65,30) NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "delayTime" DECIMAL(65,30) NOT NULL,
    "scheduleId" INTEGER,
    "stationId" INTEGER,

    CONSTRAINT "StationSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteLine" (
    "routeId" SERIAL NOT NULL,
    "routeName" TEXT NOT NULL,

    CONSTRAINT "RouteLine_pkey" PRIMARY KEY ("routeId")
);

-- CreateTable
CREATE TABLE "Coach" (
    "coachId" SERIAL NOT NULL,
    "coachCode" TEXT NOT NULL,
    "seatCapacity" INTEGER NOT NULL,
    "seatArrangement" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "reservable" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("coachId")
);

-- CreateTable
CREATE TABLE "CoachArrangement" (
    "arrangementId" SERIAL NOT NULL,
    "Code" TEXT NOT NULL,
    "coachId" INTEGER NOT NULL,
    "trainId" INTEGER NOT NULL,

    CONSTRAINT "CoachArrangement_pkey" PRIMARY KEY ("arrangementId")
);

-- CreateTable
CREATE TABLE "Journey" (
    "journeyId" SERIAL NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "firstClass" DECIMAL(65,30) NOT NULL,
    "secondClass" DECIMAL(65,30) NOT NULL,
    "thirdClass" DECIMAL(65,30) NOT NULL,
    "seasonClass" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Journey_pkey" PRIMARY KEY ("journeyId")
);

-- CreateTable
CREATE TABLE "SeatReservation" (
    "id" SERIAL NOT NULL,
    "reserveDate" TIMESTAMP(3) NOT NULL,
    "noOfSeat" INTEGER NOT NULL,
    "ticketId" TEXT,
    "scheduleId" INTEGER,
    "coachArrangementId" INTEGER,

    CONSTRAINT "SeatReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DependentToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RouteLineToSchedule" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nic_key" ON "User"("nic");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Fine_ticketId_key" ON "Fine"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_coachCode_key" ON "Coach"("coachCode");

-- CreateIndex
CREATE UNIQUE INDEX "_DependentToUser_AB_unique" ON "_DependentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DependentToUser_B_index" ON "_DependentToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RouteLineToSchedule_AB_unique" ON "_RouteLineToSchedule"("A", "B");

-- CreateIndex
CREATE INDEX "_RouteLineToSchedule_B_index" ON "_RouteLineToSchedule"("B");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_addedByUserId_fkey" FOREIGN KEY ("addedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("stationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonCard" ADD CONSTRAINT "SeasonCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonCard" ADD CONSTRAINT "SeasonCard_startStation_fkey" FOREIGN KEY ("startStation") REFERENCES "Station"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonCard" ADD CONSTRAINT "SeasonCard_endStation_fkey" FOREIGN KEY ("endStation") REFERENCES "Station"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("walletId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "seasonPay" FOREIGN KEY ("relatedId") REFERENCES "SeasonCard"("seasonId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "finePay" FOREIGN KEY ("relatedId") REFERENCES "Fine"("fineId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "ticketPay" FOREIGN KEY ("relatedId") REFERENCES "Ticket"("ticketId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fine" ADD CONSTRAINT "Fine_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("ticketId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_startStation_fkey" FOREIGN KEY ("startStation") REFERENCES "Station"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_endStation_fkey" FOREIGN KEY ("endStation") REFERENCES "Station"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_scannedBy_fkey" FOREIGN KEY ("scannedBy") REFERENCES "Employee"("employeeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("ticketId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("scheduleId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelerReservation" ADD CONSTRAINT "TravelerReservation_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Reservation"("ticketId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelerReservation" ADD CONSTRAINT "TravelerReservation_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES "Traveler"("travelerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("trainId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_start_fkey" FOREIGN KEY ("start") REFERENCES "Station"("stationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_end_fkey" FOREIGN KEY ("end") REFERENCES "Station"("stationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationSchedule" ADD CONSTRAINT "StationSchedule_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("stationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationSchedule" ADD CONSTRAINT "StationSchedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("scheduleId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("classId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachArrangement" ADD CONSTRAINT "CoachArrangement_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("trainId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachArrangement" ADD CONSTRAINT "CoachArrangement_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("coachId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_start_fkey" FOREIGN KEY ("start") REFERENCES "Station"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_end_fkey" FOREIGN KEY ("end") REFERENCES "Station"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatReservation" ADD CONSTRAINT "SeatReservation_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Reservation"("ticketId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatReservation" ADD CONSTRAINT "SeatReservation_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("scheduleId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatReservation" ADD CONSTRAINT "SeatReservation_coachArrangementId_fkey" FOREIGN KEY ("coachArrangementId") REFERENCES "CoachArrangement"("arrangementId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependentToUser" ADD CONSTRAINT "_DependentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Dependent"("dependentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DependentToUser" ADD CONSTRAINT "_DependentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RouteLineToSchedule" ADD CONSTRAINT "_RouteLineToSchedule_A_fkey" FOREIGN KEY ("A") REFERENCES "RouteLine"("routeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RouteLineToSchedule" ADD CONSTRAINT "_RouteLineToSchedule_B_fkey" FOREIGN KEY ("B") REFERENCES "Schedule"("scheduleId") ON DELETE CASCADE ON UPDATE CASCADE;
