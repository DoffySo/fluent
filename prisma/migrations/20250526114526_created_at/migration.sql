/*
  Warnings:

  - A unique constraint covering the columns `[messageId,userId]` on the table `MessageRead` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MessageRead" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "MessageRead_messageId_userId_key" ON "MessageRead"("messageId", "userId");
