-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "poster" TEXT NOT NULL,
    "backdrop" TEXT,
    "videoUrl" TEXT NOT NULL,
    "category" TEXT,
    "year" INTEGER,
    "sourceType" TEXT NOT NULL DEFAULT 'upload',
    "views" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Movie" ("backdrop", "category", "createdAt", "description", "featured", "id", "poster", "published", "title", "updatedAt", "videoUrl", "year") SELECT "backdrop", "category", "createdAt", "description", "featured", "id", "poster", "published", "title", "updatedAt", "videoUrl", "year" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
