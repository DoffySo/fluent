import { supabase } from './supabase';

export const findExistingFile = async (userId: string, sha256: string) => {
    const { data, error } = await supabase
        .from('EncryptedFile')
        .select('id')
        .eq('userId', userId)
        .eq('sha256', sha256);
    if (error) throw error;
    return data?.[0] || null;
};

export const insertEncryptedFileRecord = async (
    fileId: string,
    userId: string,
    ogFilename: string,
    storagePath: string,
    sha256: string
) => {
    const { error } = await supabase.from('EncryptedFile').insert({
        id: fileId,
        userId,
        ogFilename,
        storagePath,
        sha256
    });
    if (error) throw error;
};

export const attachFileToMessage = async (
    messageId: string,
    fileId: string
) => {
    const { error } = await supabase.from('MessageFile').insert({
        messageId,
        fileId
    });
    if (error) throw error;
};
