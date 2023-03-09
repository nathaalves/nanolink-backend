-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "nanoId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "slug" TEXT,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "links_nanoId_key" ON "links"("nanoId");

-- CreateIndex
CREATE UNIQUE INDEX "links_slug_key" ON "links"("slug");
