-- CreateEnum
CREATE TYPE "public"."Grade" AS ENUM ('A', 'B', 'C');

-- CreateTable
CREATE TABLE "public"."Retailers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "crop" TEXT NOT NULL,
    "quality" "public"."Grade" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Retailers_pkey" PRIMARY KEY ("id")
);
