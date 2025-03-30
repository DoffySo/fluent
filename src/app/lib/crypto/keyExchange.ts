import sodium from "libsodium-wrappers";

// Генерация пары ключей для обмена
export function generateKeyExchangePair() {
    return sodium.crypto_kx_keypair();
}

// Установление общего секрета
export function deriveSharedSecret(myPrivateKey: Uint8Array, peerPublicKey: Uint8Array) {
    return sodium.crypto_kx_client_session_keys(myPrivateKey, peerPublicKey).sharedRx;
}
