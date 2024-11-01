/*
  Warnings:

  - You are about to drop the column `recurrence` on the `Transference` table. All the data in the column will be lost.
  - You are about to drop the column `recurrenceTime` on the `Transference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transference" DROP COLUMN "recurrence",
DROP COLUMN "recurrenceTime";
