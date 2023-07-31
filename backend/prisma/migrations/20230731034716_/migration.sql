/*
  Warnings:

  - The values [OPERATING_CENTER] on the enum `userType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "userType_new" AS ENUM ('ADMIN', 'CONTROL_CENTRE', 'STATION_MASTER', 'DRIVER', 'TICKET_CLERK', 'TICKET_CHECKER', 'PASSENGER');
ALTER TABLE "User" ALTER COLUMN "userType" TYPE "userType_new"[] USING ("userType"::text::"userType_new"[]);
ALTER TYPE "userType" RENAME TO "userType_old";
ALTER TYPE "userType_new" RENAME TO "userType";
DROP TYPE "userType_old";
COMMIT;
