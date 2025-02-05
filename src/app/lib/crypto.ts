export async function generateRSAKeys(): Promise<{ publicKey: string; privateKey: string }> {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );

    const publicKey = await exportPublicKeyToBase64(keyPair.publicKey);
    const privateKey = await exportPrivateKeyToBase64(keyPair.privateKey);

    return { publicKey, privateKey };
}

// Экспорт публичного ключа
async function exportPublicKeyToBase64(publicKey: CryptoKey): Promise<string> {
    const exported = await window.crypto.subtle.exportKey("spki", publicKey);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
}

// Экспорт приватного ключа
async function exportPrivateKeyToBase64(privateKey: CryptoKey): Promise<string> {
    const exported = await window.crypto.subtle.exportKey("pkcs8", privateKey);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
}

// Импорт публичного ключа
async function importPublicKey(publicKeyBase64: string): Promise<CryptoKey> {
    const binaryKey = Uint8Array.from(atob(publicKeyBase64), c => c.charCodeAt(0));
    return window.crypto.subtle.importKey(
        "spki",
        binaryKey,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["encrypt"]
    );
}

// Импорт приватного ключа
async function importPrivateKey(privateKeyBase64: string): Promise<CryptoKey> {
    const binaryKey = Uint8Array.from(atob(privateKeyBase64), c => c.charCodeAt(0));
    return window.crypto.subtle.importKey(
        "pkcs8",
        binaryKey,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["decrypt"]
    );
}


// Шифрование сообщения публичным ключом
export async function encryptMessage(message: string, publicKeyBase64: string): Promise<string> {
    const publicKey = await importPublicKey(publicKeyBase64);
    const encodedMessage = new TextEncoder().encode(message);
    const encrypted = await window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, encodedMessage);
    return btoa(String.fromCharCode(...new Uint8Array(encrypted))); // Конвертация в Base64
}

// Расшифровка сообщения приватным ключом
export async function decryptMessage(encryptedMessage: string, privateKeyBase64: string): Promise<string> {
    const privateKey = await importPrivateKey(privateKeyBase64);
    const encryptedBytes = Uint8Array.from(atob(encryptedMessage), c => c.charCodeAt(0));
    const decrypted = await window.crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, encryptedBytes);
    return new TextDecoder().decode(decrypted);
}

// Генерация случайного Recovery Code (16 символов)
export function generateRecoveryCode(): string {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 16);
}

// Шифрование приватного ключа с помощью Recovery Code (AES-GCM)
export async function encryptPrivateKey(privateKey: string, recoveryCode: string): Promise<string> {
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(recoveryCode),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const derivedKey = await window.crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt"]
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        derivedKey,
        new TextEncoder().encode(privateKey)
    );

    return JSON.stringify({ salt: Array.from(salt), iv: Array.from(iv), encrypted: Array.from(new Uint8Array(encrypted)) });
}

// Расшифровка приватного ключа по Recovery Code
export async function decryptPrivateKey(encryptedData: string, recoveryCode: string): Promise<string> {
    const { salt, iv, encrypted } = JSON.parse(encryptedData);

    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(recoveryCode),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    const derivedKey = await window.crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: new Uint8Array(salt), iterations: 100000, hash: "SHA-256" },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
    );

    const decrypted = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: new Uint8Array(iv) },
        derivedKey,
        new Uint8Array(encrypted)
    );

    return new TextDecoder().decode(decrypted);
}
