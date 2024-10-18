/*
  Warnings:

  - The primary key for the `Board` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Board` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Transference" DROP CONSTRAINT "Transference_boardId_fkey";

-- AlterTable
ALTER TABLE "Board" DROP CONSTRAINT "Board_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Transference" ALTER COLUMN "boardId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Board_id_key" ON "Board"("id");

-- AddForeignKey
ALTER TABLE "Transference" ADD CONSTRAINT "Transference_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
