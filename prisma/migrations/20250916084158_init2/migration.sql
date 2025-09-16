/*
  Warnings:

  - Changed the type of `quality` on the `Retailers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Retailers" DROP COLUMN "quality",
ADD COLUMN     "quality" TEXT NOT NULL;

-- DropEnum
DROP TYPE "public"."Grade";
