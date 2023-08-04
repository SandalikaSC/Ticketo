-- AlterEnum
ALTER TYPE "ticketType" ADD VALUE 'SEASON';

-- AlterTable
ALTER TABLE "SeasonCard" ADD COLUMN     "seasonToken" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "ticketToken" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessToken" TEXT DEFAULT '',
ADD COLUMN     "registeredDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
