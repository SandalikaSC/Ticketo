-- AlterEnum
ALTER TYPE "ticketType" ADD VALUE 'PHYSICAL';

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "ticketNumber" SERIAL NOT NULL;
