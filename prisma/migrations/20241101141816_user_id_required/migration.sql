/*
  Warnings:

  - Made the column `userId` on table `Transference` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Transference" DROP CONSTRAINT "Transference_userId_fkey";

-- AlterTable
ALTER TABLE "Transference" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Transference" ADD CONSTRAINT "Transference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
