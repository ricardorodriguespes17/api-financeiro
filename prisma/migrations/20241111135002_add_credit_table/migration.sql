-- AlterTable
ALTER TABLE "Transference" ADD COLUMN     "creditId" UUID;

-- CreateTable
CREATE TABLE "Credit" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "expireDay" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Credit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transference" ADD CONSTRAINT "Transference_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
