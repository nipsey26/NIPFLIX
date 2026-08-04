/*
  Warnings:

  - A unique constraint covering the columns `[bunnyVideoId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "bunnyGuid" TEXT,
ADD COLUMN     "bunnyHlsUrl" TEXT,
ADD COLUMN     "bunnyLength" INTEGER,
ADD COLUMN     "bunnyMp4Url" TEXT,
ADD COLUMN     "bunnyPreview" TEXT,
ADD COLUMN     "bunnyStatus" INTEGER,
ADD COLUMN     "bunnyThumbnail" TEXT,
ADD COLUMN     "bunnyVideoId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Movie_bunnyVideoId_key" ON "Movie"("bunnyVideoId");
