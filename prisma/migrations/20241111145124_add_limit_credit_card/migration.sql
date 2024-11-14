/*
  Warnings:

  - Added the required column `limit` to the `Credit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credit" ADD COLUMN     "limit" DOUBLE PRECISION NOT NULL;
