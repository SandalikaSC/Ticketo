/*
  Warnings:

  - You are about to drop the column `geoLocation` on the `Station` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Station` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Station" DROP COLUMN "geoLocation",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "contactNumber" DROP NOT NULL,
ALTER COLUMN "contactNumber" SET DEFAULT '';
