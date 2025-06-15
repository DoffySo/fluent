/*
  Warnings:

  - You are about to drop the column `customBadgePath` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `isFake` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `isHadCustomBadge` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `isScam` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `isSpam` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `lastMessageText` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `isArchived` on the `ChatParticipant` table. All the data in the column will be lost.
  - You are about to drop the column `isMuted` on the `ChatParticipant` table. All the data in the column will be lost.
  - You are about to drop the column `isPinned` on the `ChatParticipant` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isPremium` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isSupport` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "customBadgePath",
DROP COLUMN "isFake",
DROP COLUMN "isHadCustomBadge",
DROP COLUMN "isScam",
DROP COLUMN "isSpam",
DROP COLUMN "isVerified",
DROP COLUMN "lastMessageText";

-- AlterTable
ALTER TABLE "ChatParticipant" DROP COLUMN "isArchived",
DROP COLUMN "isMuted",
DROP COLUMN "isPinned";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin",
DROP COLUMN "isPremium",
DROP COLUMN "isSupport",
DROP COLUMN "isVerified";
