/*
  Warnings:

  - You are about to drop the `Chat_Admin_Permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chat_Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chat_Permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Server_Data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Privacy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Privacy_Exception` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Chat_MemberToChats` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `chat_type` on the `Chats` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ChatType" AS ENUM ('PRIVATE', 'GROUP', 'CHANNEL');

-- DropForeignKey
ALTER TABLE "Chat_Member" DROP CONSTRAINT "Chat_Member_admin_permissions_id_fkey";

-- DropForeignKey
ALTER TABLE "Chat_Member" DROP CONSTRAINT "Chat_Member_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Chats" DROP CONSTRAINT "Chats_permissions_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Privacy" DROP CONSTRAINT "User_Privacy_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Privacy_Exception" DROP CONSTRAINT "User_Privacy_Exception_privacy_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Privacy_Exception" DROP CONSTRAINT "User_Privacy_Exception_target_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Sessions" DROP CONSTRAINT "User_Sessions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Settings" DROP CONSTRAINT "User_Settings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_Chat_MemberToChats" DROP CONSTRAINT "_Chat_MemberToChats_A_fkey";

-- DropForeignKey
ALTER TABLE "_Chat_MemberToChats" DROP CONSTRAINT "_Chat_MemberToChats_B_fkey";

-- AlterTable
ALTER TABLE "Chats" DROP COLUMN "chat_type",
ADD COLUMN     "chat_type" "ChatType" NOT NULL;

-- DropTable
DROP TABLE "Chat_Admin_Permissions";

-- DropTable
DROP TABLE "Chat_Member";

-- DropTable
DROP TABLE "Chat_Permissions";

-- DropTable
DROP TABLE "Server_Data";

-- DropTable
DROP TABLE "User_Privacy";

-- DropTable
DROP TABLE "User_Privacy_Exception";

-- DropTable
DROP TABLE "User_Sessions";

-- DropTable
DROP TABLE "User_Settings";

-- DropTable
DROP TABLE "_Chat_MemberToChats";

-- DropEnum
DROP TYPE "Chat_Type";

-- CreateTable
CREATE TABLE "ServerData" (
    "id" SERIAL NOT NULL,
    "settings_name" TEXT,
    "public_key" TEXT,
    "created_at" TIMESTAMP(3),
    "edited_at" TIMESTAMP(3),

    CONSTRAINT "ServerData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPrivacy" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "allow_calls" BOOLEAN NOT NULL DEFAULT true,
    "allow_chat_invites" BOOLEAN NOT NULL DEFAULT true,
    "allow_finding_by_phone_number" BOOLEAN NOT NULL DEFAULT true,
    "allow_peer_to_peer_calls" BOOLEAN NOT NULL DEFAULT false,
    "allow_voice_and_video_messages" BOOLEAN NOT NULL DEFAULT true,
    "autosave_gifts" BOOLEAN NOT NULL DEFAULT false,
    "show_bio" BOOLEAN NOT NULL DEFAULT true,
    "show_birthday" BOOLEAN NOT NULL DEFAULT true,
    "show_link_in_forwarded_messages" BOOLEAN NOT NULL DEFAULT true,
    "show_phone_number" BOOLEAN NOT NULL DEFAULT true,
    "hide_read_time" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserPrivacy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPrivacyException" (
    "id" SERIAL NOT NULL,
    "privacy_id" INTEGER,
    "target_user_id" INTEGER,
    "field" TEXT,
    "value" BOOLEAN,

    CONSTRAINT "UserPrivacyException_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "private_show_message_notification" BOOLEAN NOT NULL DEFAULT true,
    "private_show_message_previews" BOOLEAN NOT NULL DEFAULT true,
    "group_show_message_notification" BOOLEAN NOT NULL DEFAULT true,
    "group_show_message_previews" BOOLEAN NOT NULL DEFAULT true,
    "channel_show_message_notification" BOOLEAN NOT NULL DEFAULT true,
    "channel_show_message_previews" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSessions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMember" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "joined_at" TIMESTAMP(3),
    "custom_title" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "admin_permissions_id" INTEGER,

    CONSTRAINT "ChatMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatPermissions" (
    "id" SERIAL NOT NULL,
    "can_send_basic_messages" BOOLEAN NOT NULL DEFAULT true,
    "can_send_other_messages" BOOLEAN NOT NULL DEFAULT true,
    "can_send_audio_files" BOOLEAN NOT NULL DEFAULT true,
    "can_send_documents" BOOLEAN NOT NULL DEFAULT true,
    "can_send_photos" BOOLEAN NOT NULL DEFAULT true,
    "can_send_video_notes" BOOLEAN NOT NULL DEFAULT true,
    "can_send_audio_notes" BOOLEAN NOT NULL DEFAULT true,
    "can_send_polls" BOOLEAN NOT NULL DEFAULT true,
    "can_change_info" BOOLEAN NOT NULL DEFAULT true,
    "can_invite_users" BOOLEAN NOT NULL DEFAULT true,
    "can_pin_messages" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ChatPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatAdminPermissions" (
    "id" SERIAL NOT NULL,
    "can_manage_chat" BOOLEAN NOT NULL DEFAULT false,
    "can_change_info" BOOLEAN NOT NULL DEFAULT false,
    "can_post_message" BOOLEAN NOT NULL DEFAULT false,
    "can_delete_message" BOOLEAN NOT NULL DEFAULT false,
    "can_invite_users" BOOLEAN NOT NULL DEFAULT false,
    "can_restrict_users" BOOLEAN NOT NULL DEFAULT false,
    "can_promote_users" BOOLEAN NOT NULL DEFAULT false,
    "can_manage_video_chats" BOOLEAN NOT NULL DEFAULT false,
    "is_anonymous" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ChatAdminPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChatMemberToChats" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ChatMemberToChats_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPrivacy_user_id_key" ON "UserPrivacy"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserPrivacyException_privacy_id_target_user_id_field_key" ON "UserPrivacyException"("privacy_id", "target_user_id", "field");

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_user_id_key" ON "UserSettings"("user_id");

-- CreateIndex
CREATE INDEX "_ChatMemberToChats_B_index" ON "_ChatMemberToChats"("B");

-- AddForeignKey
ALTER TABLE "UserPrivacy" ADD CONSTRAINT "UserPrivacy_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPrivacyException" ADD CONSTRAINT "UserPrivacyException_privacy_id_fkey" FOREIGN KEY ("privacy_id") REFERENCES "UserPrivacy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPrivacyException" ADD CONSTRAINT "UserPrivacyException_target_user_id_fkey" FOREIGN KEY ("target_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSessions" ADD CONSTRAINT "UserSessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_permissions_id_fkey" FOREIGN KEY ("permissions_id") REFERENCES "ChatPermissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMember" ADD CONSTRAINT "ChatMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMember" ADD CONSTRAINT "ChatMember_admin_permissions_id_fkey" FOREIGN KEY ("admin_permissions_id") REFERENCES "ChatAdminPermissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatMemberToChats" ADD CONSTRAINT "_ChatMemberToChats_A_fkey" FOREIGN KEY ("A") REFERENCES "ChatMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatMemberToChats" ADD CONSTRAINT "_ChatMemberToChats_B_fkey" FOREIGN KEY ("B") REFERENCES "Chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
