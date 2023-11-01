/*
  Warnings:

  - You are about to drop the column `Code` on the `CoachArrangement` table. All the data in the column will be lost.
  - Added the required column `code` to the `CoachArrangement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoachArrangement" DROP COLUMN "Code",
ADD COLUMN     "code" TEXT NOT NULL;
