-- CreateTable
CREATE TABLE "Import" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "fixed" BOOLEAN,
    "entry" BOOLEAN NOT NULL,
    "start_date" TIMESTAMP(3),
    "update_date" TIMESTAMP(3),
    "due_date" TIMESTAMP(3),
    "description" TEXT,
    "category" TEXT,

    CONSTRAINT "Import_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryImport" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CategoryImport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportsOnUsers" (
    "userId" TEXT NOT NULL,
    "importId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT,

    CONSTRAINT "ImportsOnUsers_pkey" PRIMARY KEY ("userId","importId")
);

-- CreateTable
CREATE TABLE "ImportsOnCategory" (
    "importId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "ImportsOnCategory_pkey" PRIMARY KEY ("importId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryImport_name_key" ON "CategoryImport"("name");

-- AddForeignKey
ALTER TABLE "ImportsOnUsers" ADD CONSTRAINT "ImportsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportsOnUsers" ADD CONSTRAINT "ImportsOnUsers_importId_fkey" FOREIGN KEY ("importId") REFERENCES "Import"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportsOnCategory" ADD CONSTRAINT "ImportsOnCategory_importId_fkey" FOREIGN KEY ("importId") REFERENCES "Import"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportsOnCategory" ADD CONSTRAINT "ImportsOnCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryImport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
