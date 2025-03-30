import sodium from "libsodium-wrappers";

// Генерация пары ключей (Ed25519)
export function generateSignatureKeyPair() {
    return sodium.crypto_sign_keypair();
}

// Подпись сообщения
export function signMessage(message: string, privateKey: Uint8Array) {
    return sodium.to_base64(sodium.crypto_sign(message, privateKey));
}

// Проверка подписи
export function verifySignature(message: string, signature: string, publicKey: Uint8Array) {
    try {
        return sodium.crypto_sign_open(sodium.from_base64(signature), publicKey) !== null;
    } catch (error) {
        return false;
    }
}
