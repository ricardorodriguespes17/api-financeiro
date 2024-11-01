-- AlterTable
ALTER TABLE "Transference" ALTER COLUMN "recurrence" DROP NOT NULL,
ALTER COLUMN "recurrenceLimit" DROP NOT NULL,
ALTER COLUMN "recurrenceTime" DROP NOT NULL;
