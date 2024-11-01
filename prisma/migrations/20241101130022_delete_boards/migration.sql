/*
  Warnings:

  - You are about to drop the column `boardId` on the `Transference` table. All the data in the column will be lost.
  - You are about to drop the `Board` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `month` to the `Transference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurrence` to the `Transference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurrenceLimit` to the `Transference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurrenceTime` to the `Transference` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transference" DROP CONSTRAINT "Transference_boardId_fkey";

-- AlterTable
ALTER TABLE "Transference" DROP COLUMN "boardId",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "month" TEXT NOT NULL,
ADD COLUMN     "recurrence" TEXT NOT NULL,
ADD COLUMN     "recurrenceLimit" INTEGER NOT NULL,
ADD COLUMN     "recurrenceTime" INTEGER NOT NULL,
ADD COLUMN     "userId" UUID;

-- DropTable
DROP TABLE "Board";

-- AddForeignKey
ALTER TABLE "Transference" ADD CONSTRAINT "Transference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
