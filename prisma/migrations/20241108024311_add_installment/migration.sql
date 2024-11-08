/*
  Warnings:

  - You are about to drop the column `isPaid` on the `Transference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transference" DROP COLUMN "isPaid";

-- CreateTable
CREATE TABLE "Installment" (
    "id" UUID NOT NULL,
    "transferenceId" UUID NOT NULL,
    "dueMonth" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Installment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Installment" ADD CONSTRAINT "Installment_transferenceId_fkey" FOREIGN KEY ("transferenceId") REFERENCES "Transference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
