/*
  Warnings:

  - Made the column `message` on table `Retailers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Retailers" ALTER COLUMN "message" SET NOT NULL;
