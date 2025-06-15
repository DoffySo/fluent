/*
  Warnings:

  - A unique constraint covering the columns `[messageId,userId,read,chatId]` on the table `MessageRead` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "MessageRead_messageId_userId_key";

-- AlterTable
ALTER TABLE "MessageRead" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "MessageRead_messageId_userId_read_chatId_key" ON "MessageRead"("messageId", "userId", "read", "chatId");
