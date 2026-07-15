/*
  Warnings:

  - Added the required column `title` to the `WatchProgress` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WatchProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "posterPath" TEXT,
    "overview" TEXT,
    "progress" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WatchProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WatchProgress" ("id", "mediaId", "mediaType", "progress", "updatedAt", "userId") SELECT "id", "mediaId", "mediaType", "progress", "updatedAt", "userId" FROM "WatchProgress";
DROP TABLE "WatchProgress";
ALTER TABLE "new_WatchProgress" RENAME TO "WatchProgress";
CREATE UNIQUE INDEX "WatchProgress_userId_mediaId_mediaType_key" ON "WatchProgress"("userId", "mediaId", "mediaType");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
