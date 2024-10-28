/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CLUB_OWNER', 'CLUB_MEMBER', 'USER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "globalRole" "UserRole" NOT NULL DEFAULT 'USER',
ADD COLUMN     "lastName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SpaceRole" (
    "id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "userId" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,

    CONSTRAINT "SpaceRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubRole" (
    "id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "userId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,

    CONSTRAINT "ClubRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Space" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Club" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SpaceMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ClubMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "SpaceRole_userId_idx" ON "SpaceRole"("userId");

-- CreateIndex
CREATE INDEX "SpaceRole_spaceId_idx" ON "SpaceRole"("spaceId");

-- CreateIndex
CREATE UNIQUE INDEX "SpaceRole_userId_spaceId_key" ON "SpaceRole"("userId", "spaceId");

-- CreateIndex
CREATE INDEX "ClubRole_userId_idx" ON "ClubRole"("userId");

-- CreateIndex
CREATE INDEX "ClubRole_clubId_idx" ON "ClubRole"("clubId");

-- CreateIndex
CREATE UNIQUE INDEX "ClubRole_userId_clubId_key" ON "ClubRole"("userId", "clubId");

-- CreateIndex
CREATE UNIQUE INDEX "_SpaceMember_AB_unique" ON "_SpaceMember"("A", "B");

-- CreateIndex
CREATE INDEX "_SpaceMember_B_index" ON "_SpaceMember"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClubMember_AB_unique" ON "_ClubMember"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubMember_B_index" ON "_ClubMember"("B");

-- AddForeignKey
ALTER TABLE "SpaceRole" ADD CONSTRAINT "SpaceRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceRole" ADD CONSTRAINT "SpaceRole_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubRole" ADD CONSTRAINT "ClubRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubRole" ADD CONSTRAINT "ClubRole_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpaceMember" ADD CONSTRAINT "_SpaceMember_A_fkey" FOREIGN KEY ("A") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpaceMember" ADD CONSTRAINT "_SpaceMember_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubMember" ADD CONSTRAINT "_ClubMember_A_fkey" FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubMember" ADD CONSTRAINT "_ClubMember_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
