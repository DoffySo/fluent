-- AlterTable
ALTER TABLE "ChatMessages" ADD COLUMN     "messageNonce" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "publicKey" TEXT;
