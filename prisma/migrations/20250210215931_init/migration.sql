/*
  Warnings:

  - You are about to drop the column `editeds_at` on the `Server_Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Server_Data" DROP COLUMN "editeds_at",
ADD COLUMN     "edited_at" TIMESTAMP(3);
