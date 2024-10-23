-- CreateTable
CREATE TABLE "Blacklist" (
    "id" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "includedIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blacklist_pkey" PRIMARY KEY ("id")
);
