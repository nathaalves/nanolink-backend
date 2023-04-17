/*
  Warnings:

  - You are about to drop the column `url` on the `links` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[originalURL]` on the table `links` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `originalURL` to the `links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "links" DROP COLUMN "url",
ADD COLUMN     "originalURL" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "links_originalURL_key" ON "links"("originalURL");
