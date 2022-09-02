-- CreateTable
CREATE TABLE "Movies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imdbID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Movies_imdbID_key" ON "Movies"("imdbID");
