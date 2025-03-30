-- CreateEnum
CREATE TYPE "Chat_Type" AS ENUM ('PRIVATE', 'GROUP', 'CHANNEL');

-- CreateEnum
CREATE TYPE "MessageState" AS ENUM ('NULL', 'SENDING', 'SENDED', 'FAILED');

-- CreateEnum
CREATE TYPE "ScheduledMessageState" AS ENUM ('NULL', 'WAITING', 'SENDED', 'FAILED');

-- CreateEnum
CREATE TYPE "MessageSenderType" AS ENUM ('USER', 'CHAT');

-- CreateEnum
CREATE TYPE "MessageContentType" AS ENUM ('TEXT', 'PHOTO', 'VIDEO', 'AUDIO', 'DOCUMENT', 'STICKER', 'CONTACT', 'LOCATION', 'POLL', 'GAME', 'WEB_APP', 'VOICE_NOTE', 'VIDEO_NOTE', 'ANIMATION', 'DICE', 'INVOICE', 'PAYMENT_SUCCESSFUL', 'PAYMENT_REFUNDED', 'GIFT', 'PREMIUM_GIFT_CODE', 'CHAT_CREATED', 'CHAT_TITLE_CHANGED', 'CHAT_PHOTO_CHANGED', 'CHAT_MEMBER_JOINED', 'CHAT_MEMBER_LEFT', 'CHAT_UPGRADED_TO', 'CHAT_UPGRADED_FROM', 'PIN_MESSAGE', 'FORUM_TOPIC_CREATED', 'FORUM_TOPIC_EDITED', 'FORUM_TOPIC_CLOSED', 'FORUM_TOPIC_HIDDEN', 'MESSAGE_REACTION', 'MESSAGE_EDITED', 'MESSAGE_DELETED', 'MESSAGE_FORWARD', 'MESSAGE_REPLY', 'MESSAGE_MENTION', 'MESSAGE_QUOTE', 'MESSAGE_SCHEDULED', 'MESSAGE_UNSUPPORTED');

-- CreateTable
CREATE TABLE "Server_Data" (
    "id" SERIAL NOT NULL,
    "settings_name" TEXT,
    "public_key" TEXT,
    "created_at" TIMESTAMP(3),
    "editeds_at" TIMESTAMP(3),

    CONSTRAINT "Server_Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "public_key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3),
    "last_seen" TIMESTAMP(3),
    "first_name" TEXT,
    "last_name" TEXT,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "birthday" TIMESTAMP(3),
    "phone_number" TEXT NOT NULL,
    "is_premium" BOOLEAN,
    "is_support" BOOLEAN,
    "is_admin" BOOLEAN,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Privacy" (
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

    CONSTRAINT "User_Privacy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Privacy_Exception" (
    "id" SERIAL NOT NULL,
    "privacy_id" INTEGER,
    "target_user_id" INTEGER,
    "field" TEXT,
    "value" BOOLEAN,

    CONSTRAINT "User_Privacy_Exception_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Settings" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "private_show_message_notification" BOOLEAN NOT NULL DEFAULT true,
    "private_show_message_previews" BOOLEAN NOT NULL DEFAULT true,
    "group_show_message_notification" BOOLEAN NOT NULL DEFAULT true,
    "group_show_message_previews" BOOLEAN NOT NULL DEFAULT true,
    "channel_show_message_notification" BOOLEAN NOT NULL DEFAULT true,
    "channel_show_message_previews" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "sender_type" "MessageSenderType" NOT NULL,
    "sender_user_id" INTEGER,
    "sender_chat_id" INTEGER,
    "sending_state" "MessageState",
    "sheduling_state" "MessageState",
    "is_pinned" BOOLEAN,
    "can_be_saved" BOOLEAN,
    "is_channel_post" BOOLEAN,
    "date" TIMESTAMP(3),
    "edit_date" TIMESTAMP(3),
    "content_type" "MessageContentType",
    "content" JSONB,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chats" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER,
    "chat_type" "Chat_Type" NOT NULL,
    "title" TEXT,
    "photo" TEXT,
    "permissions_id" INTEGER,

    CONSTRAINT "Chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat_Member" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "joined_at" TIMESTAMP(3),
    "custom_title" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "admin_permissions_id" INTEGER,

    CONSTRAINT "Chat_Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat_Permissions" (
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

    CONSTRAINT "Chat_Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat_Admin_Permissions" (
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

    CONSTRAINT "Chat_Admin_Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Chat_MemberToChats" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Chat_MemberToChats_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_public_key_key" ON "User"("public_key");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_Privacy_user_id_key" ON "User_Privacy"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_Privacy_Exception_privacy_id_target_user_id_field_key" ON "User_Privacy_Exception"("privacy_id", "target_user_id", "field");

-- CreateIndex
CREATE UNIQUE INDEX "User_Settings_user_id_key" ON "User_Settings"("user_id");

-- CreateIndex
CREATE INDEX "_Chat_MemberToChats_B_index" ON "_Chat_MemberToChats"("B");

-- AddForeignKey
ALTER TABLE "User_Privacy" ADD CONSTRAINT "User_Privacy_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Privacy_Exception" ADD CONSTRAINT "User_Privacy_Exception_privacy_id_fkey" FOREIGN KEY ("privacy_id") REFERENCES "User_Privacy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Privacy_Exception" ADD CONSTRAINT "User_Privacy_Exception_target_user_id_fkey" FOREIGN KEY ("target_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Settings" ADD CONSTRAINT "User_Settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sender_user_id_fkey" FOREIGN KEY ("sender_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sender_chat_id_fkey" FOREIGN KEY ("sender_chat_id") REFERENCES "Chats"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_permissions_id_fkey" FOREIGN KEY ("permissions_id") REFERENCES "Chat_Permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Member" ADD CONSTRAINT "Chat_Member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat_Member" ADD CONSTRAINT "Chat_Member_admin_permissions_id_fkey" FOREIGN KEY ("admin_permissions_id") REFERENCES "Chat_Admin_Permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Chat_MemberToChats" ADD CONSTRAINT "_Chat_MemberToChats_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat_Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Chat_MemberToChats" ADD CONSTRAINT "_Chat_MemberToChats_B_fkey" FOREIGN KEY ("B") REFERENCES "Chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
