/*
  Warnings:

  - You are about to drop the column `lastMessageFromId` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the `ChatFolderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatFolders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MessageReaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfilePhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_lastMessageFromId_fkey";

-- DropForeignKey
ALTER TABLE "ChatFolderItem" DROP CONSTRAINT "ChatFolderItem_chatId_fkey";

-- DropForeignKey
ALTER TABLE "ChatFolderItem" DROP CONSTRAINT "ChatFolderItem_folderId_fkey";

-- DropForeignKey
ALTER TABLE "ChatFolderItem" DROP CONSTRAINT "ChatFolderItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "ChatFolders" DROP CONSTRAINT "ChatFolders_userId_fkey";

-- DropForeignKey
ALTER TABLE "MessageReaction" DROP CONSTRAINT "MessageReaction_chatId_fkey";

-- DropForeignKey
ALTER TABLE "MessageReaction" DROP CONSTRAINT "MessageReaction_messageId_fkey";

-- DropForeignKey
ALTER TABLE "MessageReaction" DROP CONSTRAINT "MessageReaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProfilePhoto" DROP CONSTRAINT "ProfilePhoto_userId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "lastMessageFromId";

-- DropTable
DROP TABLE "ChatFolderItem";

-- DropTable
DROP TABLE "ChatFolders";

-- DropTable
DROP TABLE "MessageReaction";

-- DropTable
DROP TABLE "ProfilePhoto";
