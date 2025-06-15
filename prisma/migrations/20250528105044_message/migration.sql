/*
  Warnings:

  - You are about to drop the column `read` on the `MessageRead` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[messageId,userId]` on the table `MessageRead` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "MessageRead_messageId_userId_read_chatId_key";

-- AlterTable
ALTER TABLE "MessageRead" DROP COLUMN "read";

-- CreateIndex
CREATE UNIQUE INDEX "MessageRead_messageId_userId_key" ON "MessageRead"("messageId", "userId");
