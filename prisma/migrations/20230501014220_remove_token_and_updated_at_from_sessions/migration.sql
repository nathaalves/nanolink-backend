/*
  Warnings:

  - You are about to drop the column `token` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `sessions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "sessions_token_key";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "token",
DROP COLUMN "updatedAt";
