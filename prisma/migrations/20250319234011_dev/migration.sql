/*
  Warnings:

  - The primary key for the `ChatPermissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `can_change_info` on the `ChatPermissions` table. All the data in the column will be lost.
  - You are about to drop the column `can_invite_users` on the `ChatPermissions` table. All the data in the column will be lost.
  - You are about to drop the column `can_pin_messages` on the `ChatPermissions` table. All the data in the column will be lost.
  - You are about to drop the column `can_send_audio_files` on the `ChatPermissions` table. All the data in the column will be lost.
  - You are about to drop the column `can_send_audio_notes` on the `ChatPermissions` table. All the data in the column will be lost.
  - You are about to drop the column `can_send_basic_messages` on the `ChatPermissions` table. All the data in the column will be lost.
  - You are about to drop the column `can_send_documents` on the `ChatPermissions` table. All the data in the column will be lost.
  - You are about to drop the column `can_send_other_messages` on the `ChatPermissions` table. All the data in the column will be lost.
  - You are about to drop the column `can_send_photos` on the `ChatPermissions` table. All the data in the column will be lost.
  - You are about to drop the column `can_send_polls` on the `ChatPermissions` table. All the data in the column will be lost.
  - You are about to drop the column `can_send_video_notes` on the `ChatPermissions` table. All the data in the column will be lost.
  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `can_be_saved` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `content_type` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `edit_date` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `is_channel_post` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `is_pinned` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sender_chat_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sender_type` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sender_user_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sending_state` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sheduling_state` on the `Message` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `birthday` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_admin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_premium` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_support` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_seen` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `public_key` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UserPrivacy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `allow_calls` on the `UserPrivacy` table. All the data in the column will be lost.
  - You are about to drop the column `allow_chat_invites` on the `UserPrivacy` table. All the data in the column will be lost.
  - You are about to drop the column `allow_finding_by_phone_number` on the `UserPrivacy` table. All the data in the column will be lost.
  - You are about to drop the column `allow_peer_to_peer_calls` on the `UserPrivacy` table. All the data in the column will be lost.
  - You are about to drop the column `allow_voice_and_video_messages` on the `UserPrivacy` table. All the data in the column will be lost.
  - You are about to drop the column `autosave_gifts` on the `UserPrivacy` table. All the data in the column will be lost.
  - You are about to drop the column `hide_read_time` on the `UserPrivacy` table. All the data in the column will be lost.
  - You are about to drop the column `show_bio` on the `UserPrivacy` table. All the data in the column will be lost.
  - You are about to drop the column `show_birthday` on the `UserPrivacy` table. All the data in the column will be lost.
  - You are about to drop the column `show_link_in_forwarded_messages` on the `UserPrivacy` table. All the data in the column will be lost.
  - You are about to drop the column `show_phone_number` on the `UserPrivacy` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `UserPrivacy` table. All the data in the column will be lost.
  - The primary key for the `UserPrivacyException` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `field` on the `UserPrivacyException` table. All the data in the column will be lost.
  - You are about to drop the column `privacy_id` on the `UserPrivacyException` table. All the data in the column will be lost.
  - You are about to drop the column `target_user_id` on the `UserPrivacyException` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `UserPrivacyException` table. All the data in the column will be lost.
  - You are about to drop the `ChatAdminPermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServerData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChatMemberToChats` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[chatId]` on the table `ChatPermissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chatId` to the `ChatPermissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaType` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `UserPrivacy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserPrivacy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privacyId` to the `UserPrivacyException` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `UserPrivacyException` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserPrivacyException` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PrivacyLevel" AS ENUM ('EVERYONE', 'NO_ONE', 'CONTACTS');

-- CreateEnum
CREATE TYPE "ExceptionType" AS ENUM ('WHITELIST', 'BLACKLIST');

-- CreateEnum
CREATE TYPE "PrivacyType" AS ENUM ('PHONE_NUMBER', 'LAST_SEEN', 'PROFILE_PHOTO', 'ABOUT', 'BIRTH_DATE', 'FORWARDING_MESSAGES', 'CALLS', 'VOICE_MESSAGES', 'MESSAGES', 'INVITES');

-- CreateEnum
CREATE TYPE "MessageAutoDelete" AS ENUM ('DONT_DELETE', 'ONE_DAY', 'ONE_WEEK', 'ONE_MONTH', 'CUSTOM');

-- CreateEnum
CREATE TYPE "AutoDeleteUnits" AS ENUM ('DAY', 'WEEK', 'MONTH', 'YEAR');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('userStatusEmpty', 'userStatusLongTime', 'userStatusLastMonth', 'userStatusLastWeek', 'userStatusOffline', 'userStatusOnline', 'userStatusRecently');

-- CreateEnum
CREATE TYPE "ChatTypes" AS ENUM ('PRIVATE', 'GROUP', 'CHANNEL');

-- CreateEnum
CREATE TYPE "ChatRoles" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "MediaTypes" AS ENUM ('TEXT', 'AUDIO', 'VIDEO', 'DOCUMENT', 'IMAGE');

-- DropForeignKey
ALTER TABLE "ChatMember" DROP CONSTRAINT "ChatMember_admin_permissions_id_fkey";

-- DropForeignKey
ALTER TABLE "ChatMember" DROP CONSTRAINT "ChatMember_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Chats" DROP CONSTRAINT "Chats_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Chats" DROP CONSTRAINT "Chats_permissions_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_sender_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_sender_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPrivacy" DROP CONSTRAINT "UserPrivacy_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPrivacyException" DROP CONSTRAINT "UserPrivacyException_privacy_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPrivacyException" DROP CONSTRAINT "UserPrivacyException_target_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserSessions" DROP CONSTRAINT "UserSessions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_ChatMemberToChats" DROP CONSTRAINT "_ChatMemberToChats_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatMemberToChats" DROP CONSTRAINT "_ChatMemberToChats_B_fkey";

-- DropIndex
DROP INDEX "User_phone_number_key";

-- DropIndex
DROP INDEX "User_public_key_key";

-- DropIndex
DROP INDEX "UserPrivacy_user_id_key";

-- DropIndex
DROP INDEX "UserPrivacyException_privacy_id_target_user_id_field_key";

-- AlterTable
ALTER TABLE "ChatPermissions" DROP CONSTRAINT "ChatPermissions_pkey",
DROP COLUMN "can_change_info",
DROP COLUMN "can_invite_users",
DROP COLUMN "can_pin_messages",
DROP COLUMN "can_send_audio_files",
DROP COLUMN "can_send_audio_notes",
DROP COLUMN "can_send_basic_messages",
DROP COLUMN "can_send_documents",
DROP COLUMN "can_send_other_messages",
DROP COLUMN "can_send_photos",
DROP COLUMN "can_send_polls",
DROP COLUMN "can_send_video_notes",
ADD COLUMN     "canChangeInfo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canInviteUsers" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canPinMessages" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canSendAudioNotes" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canSendAudios" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canSendBasicMessages" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canSendDocuments" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canSendOtherMessaged" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canSendPhotos" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canSendPolls" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canSendVideoNotes" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "canSendVideos" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "chatId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ChatPermissions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ChatPermissions_id_seq";

-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
DROP COLUMN "can_be_saved",
DROP COLUMN "content",
DROP COLUMN "content_type",
DROP COLUMN "date",
DROP COLUMN "edit_date",
DROP COLUMN "is_channel_post",
DROP COLUMN "is_pinned",
DROP COLUMN "sender_chat_id",
DROP COLUMN "sender_type",
DROP COLUMN "sender_user_id",
DROP COLUMN "sending_state",
DROP COLUMN "sheduling_state",
ADD COLUMN     "chatId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "forwardedFromId" TEXT,
ADD COLUMN     "isForwarded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mediaType" "MediaTypes" NOT NULL,
ADD COLUMN     "mediaUrl" TEXT,
ADD COLUMN     "originalSenderId" TEXT,
ADD COLUMN     "text" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Message_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "bio",
DROP COLUMN "birthday",
DROP COLUMN "created_at",
DROP COLUMN "first_name",
DROP COLUMN "is_admin",
DROP COLUMN "is_premium",
DROP COLUMN "is_support",
DROP COLUMN "last_name",
DROP COLUMN "last_seen",
DROP COLUMN "phone_number",
DROP COLUMN "public_key",
ADD COLUMN     "accentColorId" INTEGER DEFAULT -1,
ADD COLUMN     "backgroundEmojiId" INTEGER DEFAULT 0,
ADD COLUMN     "chatId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emojiStatus" INTEGER DEFAULT -1,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSupport" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "lastOnline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "premiumTill" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profileAccent_colorId" INTEGER DEFAULT -1,
ADD COLUMN     "profileBackgroundEmojiId" INTEGER DEFAULT 0,
ADD COLUMN     "profilePhoto" TEXT,
ADD COLUMN     "restictedReason" TEXT,
ADD COLUMN     "restictedTo" TIMESTAMP(3),
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'userStatusEmpty',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserPrivacy" DROP CONSTRAINT "UserPrivacy_pkey",
DROP COLUMN "allow_calls",
DROP COLUMN "allow_chat_invites",
DROP COLUMN "allow_finding_by_phone_number",
DROP COLUMN "allow_peer_to_peer_calls",
DROP COLUMN "allow_voice_and_video_messages",
DROP COLUMN "autosave_gifts",
DROP COLUMN "hide_read_time",
DROP COLUMN "show_bio",
DROP COLUMN "show_birthday",
DROP COLUMN "show_link_in_forwarded_messages",
DROP COLUMN "show_phone_number",
DROP COLUMN "user_id",
ADD COLUMN     "type" "PrivacyType" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "visibility" "PrivacyLevel" NOT NULL DEFAULT 'EVERYONE',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserPrivacy_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserPrivacy_id_seq";

-- AlterTable
ALTER TABLE "UserPrivacyException" DROP CONSTRAINT "UserPrivacyException_pkey",
DROP COLUMN "field",
DROP COLUMN "privacy_id",
DROP COLUMN "target_user_id",
DROP COLUMN "value",
ADD COLUMN     "privacyId" TEXT NOT NULL,
ADD COLUMN     "type" "ExceptionType" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserPrivacyException_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserPrivacyException_id_seq";

-- DropTable
DROP TABLE "ChatAdminPermissions";

-- DropTable
DROP TABLE "ChatMember";

-- DropTable
DROP TABLE "Chats";

-- DropTable
DROP TABLE "ServerData";

-- DropTable
DROP TABLE "UserSessions";

-- DropTable
DROP TABLE "UserSettings";

-- DropTable
DROP TABLE "_ChatMemberToChats";

-- DropEnum
DROP TYPE "ChatType";

-- DropEnum
DROP TYPE "MessageContentType";

-- DropEnum
DROP TYPE "MessageSenderType";

-- DropEnum
DROP TYPE "MessageState";

-- DropEnum
DROP TYPE "ScheduledMessageState";

-- CreateTable
CREATE TABLE "UserProfilePhoto" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfilePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBlocklist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blockedUserId" TEXT NOT NULL,

    CONSTRAINT "UserBlocklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAutoDelete" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deleteType" "MessageAutoDelete" NOT NULL DEFAULT 'DONT_DELETE',
    "deleteTime" INTEGER DEFAULT 1,
    "timeUnit" "AutoDeleteUnits" NOT NULL DEFAULT 'DAY',

    CONSTRAINT "UserAutoDelete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserChat" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "ChatRoles" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "UserChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "ChatTypes" NOT NULL,
    "photo" TEXT,
    "chatUserPermissionsId" TEXT,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatUserPermissions" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "canSendBasicMessages" BOOLEAN NOT NULL DEFAULT true,
    "canSendAudios" BOOLEAN NOT NULL DEFAULT true,
    "canSendDocuments" BOOLEAN NOT NULL DEFAULT true,
    "canSendPhotos" BOOLEAN NOT NULL DEFAULT true,
    "canSendVideos" BOOLEAN NOT NULL DEFAULT true,
    "canSendVideoNotes" BOOLEAN NOT NULL DEFAULT true,
    "canSendAudioNotes" BOOLEAN NOT NULL DEFAULT true,
    "canSendPolls" BOOLEAN NOT NULL DEFAULT true,
    "canSendOtherMessaged" BOOLEAN NOT NULL DEFAULT true,
    "canChangeInfo" BOOLEAN NOT NULL DEFAULT true,
    "canInviteUsers" BOOLEAN NOT NULL DEFAULT true,
    "canPinMessages" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ChatUserPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserBlocklist_userId_blockedUserId_key" ON "UserBlocklist"("userId", "blockedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatUserPermissions_chatId_userId_key" ON "ChatUserPermissions"("chatId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatPermissions_chatId_key" ON "ChatPermissions"("chatId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfilePhoto" ADD CONSTRAINT "UserProfilePhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPrivacy" ADD CONSTRAINT "UserPrivacy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPrivacyException" ADD CONSTRAINT "UserPrivacyException_privacyId_fkey" FOREIGN KEY ("privacyId") REFERENCES "UserPrivacy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPrivacyException" ADD CONSTRAINT "UserPrivacyException_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBlocklist" ADD CONSTRAINT "UserBlocklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBlocklist" ADD CONSTRAINT "UserBlocklist_blockedUserId_fkey" FOREIGN KEY ("blockedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAutoDelete" ADD CONSTRAINT "UserAutoDelete_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChat" ADD CONSTRAINT "UserChat_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChat" ADD CONSTRAINT "UserChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_forwardedFromId_fkey" FOREIGN KEY ("forwardedFromId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatPermissions" ADD CONSTRAINT "ChatPermissions_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatUserPermissions" ADD CONSTRAINT "ChatUserPermissions_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatUserPermissions" ADD CONSTRAINT "ChatUserPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
