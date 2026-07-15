/*
  Warnings:

  - You are about to drop the column `movieId` on the `MyList` table. All the data in the column will be lost.
  - Added the required column `mediaId` to the `MyList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaType` to the `MyList` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "WatchProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL,
    "progress" REAL NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WatchProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MyList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "posterPath" TEXT,
    "overview" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MyList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MyList" ("createdAt", "id", "overview", "posterPath", "title", "userId") SELECT "createdAt", "id", "overview", "posterPath", "title", "userId" FROM "MyList";
DROP TABLE "MyList";
ALTER TABLE "new_MyList" RENAME TO "MyList";
CREATE UNIQUE INDEX "MyList_userId_mediaId_mediaType_key" ON "MyList"("userId", "mediaId", "mediaType");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "WatchProgress_userId_mediaId_mediaType_key" ON "WatchProgress"("userId", "mediaId", "mediaType");
