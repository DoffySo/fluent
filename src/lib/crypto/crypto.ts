import sodium from 'libsodium-wrappers';

export const initSodium = async () => {
    await sodium.ready;
};

export const generateKey = (): Uint8Array => {
    return sodium.randombytes_buf(sodium.crypto_secretbox_KEYBYTES);
};

export const generateNonce = (): Uint8Array => {
    return sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
};

export const encryptFile = (
    plainData: Uint8Array,
    key: Uint8Array
): Uint8Array => {
    const nonce = generateNonce();
    const cipher = sodium.crypto_secretbox_easy(plainData, nonce, key);

    const combined = new Uint8Array(nonce.length + cipher.length);
    combined.set(nonce);
    combined.set(cipher, nonce.length);
    return combined;
};

export const hashFile = (data: Uint8Array): string => {
    const hash = sodium.crypto_hash_sha256(data);
    return Buffer.from(hash).toString('hex');
};
