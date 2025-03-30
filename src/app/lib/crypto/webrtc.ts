import { deriveSharedSecret, generateKeyExchangePair } from "./key-exchange";

export async function initiateCall() {
    const myKeys = generateKeyExchangePair();
    const peerPublicKey = await getPeerPublicKey();

    const sharedSecret = deriveSharedSecret(myKeys.privateKey, peerPublicKey);
    console.log("🔐 Общий секрет для звонка:", sharedSecret);
}

// Получение публичного ключа собеседника (например, через WebRTC сигналинг-сервер)
async function getPeerPublicKey(): Promise<Uint8Array> {
    // Здесь должен быть запрос на ваш сервер
    return new Uint8Array();
}
