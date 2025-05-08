import { supabase } from '@/lib/supabase';

export const uploadToStorage = async (
    path: string,
    blob: Blob
): Promise<void> => {
    const { error } = await supabase.storage
        .from('user_files')
        .upload(path, blob, {
            contentType: 'application/octet-stream',
            upsert: false
        });
    if (error) throw error;
};
