/*
  Warnings:

  - Added the required column `applicationForm` to the `SeasonCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `SeasonCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workPlace` to the `SeasonCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workPlaceAddress` to the `SeasonCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SeasonCard" ADD COLUMN     "applicationForm" TEXT NOT NULL,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "workPlace" TEXT NOT NULL,
ADD COLUMN     "workPlaceAddress" TEXT NOT NULL;
