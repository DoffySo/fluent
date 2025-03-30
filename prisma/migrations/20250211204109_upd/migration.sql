/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `UserSessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserSessions_token_key" ON "UserSessions"("token");
