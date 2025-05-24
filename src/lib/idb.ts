import { openDB } from 'idb';

const DB_NAME = 'crypto-db';
const STORE_NAME = 'keys';

export const getDb = () =>
    openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        },
    });

export async function saveKey(keyId: string, key: Uint8Array) {
    const db = await getDb();
    await db.put(STORE_NAME, key, keyId);
}

export async function loadKey(keyId: string): Promise<Uint8Array | null> {
    const db = await getDb();
    return await db.get(STORE_NAME, keyId);
}
