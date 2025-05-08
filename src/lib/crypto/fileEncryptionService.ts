import {
    initSodium,
    encryptFile,
    generateKey,
    hashFile
} from './crypto';
import { v4 as uuidv4 } from 'uuid';
import { uploadToStorage } from './storage';
import {
    findExistingFile,
    insertEncryptedFileRecord
} from './database';

export const uploadEncryptedFile = async (
    file: File,
    userId: string
): Promise<{
    fileId: string;
    encryptionKey: Uint8Array;
    isDuplicate: boolean;
}> => {
    await initSodium();

    const arrayBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    const sha256 = hashFile(fileData);

    const existing = await findExistingFile(userId, sha256);
    if (existing) {
        return {
            fileId: existing.id,
            encryptionKey: new Uint8Array(0),
            isDuplicate: true
        };
    }

    const encryptionKey = generateKey();
    const encrypted = encryptFile(fileData, encryptionKey);
    const fileId = uuidv4();
    const path = `${userId}/${fileId}.bin`;

    await uploadToStorage(path, new Blob([encrypted]));
    await insertEncryptedFileRecord(fileId, userId, file.name, path, sha256);

    return { fileId, encryptionKey, isDuplicate: false };
};
