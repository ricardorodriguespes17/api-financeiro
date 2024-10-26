/*
  Warnings:

  - Added the required column `name` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Board` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `boardId` on the `Transference` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Transference" DROP CONSTRAINT "Transference_boardId_fkey";

-- DropIndex
DROP INDEX "Board_id_key";

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Board_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Transference" DROP COLUMN "boardId",
ADD COLUMN     "boardId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Transference" ADD CONSTRAINT "Transference_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
