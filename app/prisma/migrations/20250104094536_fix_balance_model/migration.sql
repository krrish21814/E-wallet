/*
  Warnings:

  - You are about to drop the column `if` on the `Balance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "if",
ADD COLUMN     "id" SERIAL NOT NULL;
