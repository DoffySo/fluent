import sodium from "libsodium-wrappers";

let ready: boolean = false;


/**
 * Inits libsodium
*/
async function initSodium() {
    if(!ready) {
        await sodium.ready;
        ready = true;
    }
}

/**
 * Encrypts a message using the recipient's public key and sender's private key.
 *
 * @param {string} message - The message to encrypt
 * @param {Uint8Array} receiverPublicKey - The public key of the message recipient
 * @param {Uint8Array} senderPrivateKey - The private key of the message sender
 * @returns {{nonce: string, ciphertext: string}} An object containing the nonce and encrypted message in Base64 format.
 *
 * @throws {Error} If any required parameter is missing or invalid.
 */
function encryptMessage(
    message: string,
    receiverPublicKey: Uint8Array,
    senderPrivateKey: Uint8Array
) : {nonce: string, ciphertext: string} {
    if(!message) throw new Error("A `message` is required")
    if(!receiverPublicKey) throw new Error("A `receiverPublicKey` is required")
    if(!senderPrivateKey) throw new Error("A `senderPrivateKey` is required")

    // Generate random nonce
    const nonce: Uint8Array = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

    // Encrypting the message
    const ciphertext: Uint8Array = sodium.crypto_box_easy(
        message,
        nonce,
        receiverPublicKey,
        senderPrivateKey
    );

    return {
        nonce: sodium.to_base64(nonce),
        ciphertext: sodium.to_base64(ciphertext),
    }
}

/**
 * Decrypts a message using the sender's public key and the receiver's private key.
 *
 * @param {string} nonceBase64 - The nonce used during encryption (Base64 encoded).
 * @param {string} ciphertextBase64 - The encrypted message (Base64 encoded).
 * @param {Uint8Array} senderPublicKey - The sender's public key.
 * @param {Uint8Array} receiverPrivateKey - The receiver's private key.
 * @returns {string} The decrypted message in plain text.
 *
 * @throws {Error} If any required parameter is missing or invalid.
 * @throws {Error} If message decryption fails (e.g., due to invalid keys or data corruption).
 */
function decryptMessage(
    nonceBase64: string,
    ciphertextBase64: string,
    senderPublicKey: Uint8Array,
    receiverPrivateKey: Uint8Array
): string {
    if (!nonceBase64) throw new Error("Parameter `nonceBase64` is required and must be a valid Base64-encoded string.");
    if (!ciphertextBase64) throw new Error("Parameter `ciphertextBase64` is required and must be a valid Base64-encoded string.");
    if (!senderPublicKey) throw new Error("Parameter `senderPublicKey` is required");
    if (!receiverPrivateKey) throw new Error("Parameter `receiverPrivateKey` is required");

    // Decode nonce and encrypted message from Base64 to Uint8Array
    const nonce: Uint8Array = sodium.from_base64(nonceBase64);
    const ciphertext: Uint8Array = sodium.from_base64(ciphertextBase64);

    // Decoding ciphertext
    const decrypted = sodium.crypto_box_open_easy(
        ciphertext,
        nonce,
        senderPublicKey,
        receiverPrivateKey
    );

    if (!decrypted) throw new Error("Failed to decrypt the message. Ensure that the provided keys and data are correct.")


    return sodium.to_string(decrypted);
}


/**
 * Generates keys (public and private) based on a custom phrase.
 *
 * @param {string} passphrase - Custom phrase (e.g., from BIP-39).
 * @returns {{ publicKey: Uint8Array, privateKey: Uint8Array }} { publicKey: Uint8Array, privateKey: Uint8Array } - Key pair.
 */
function generateKeyPairFromPassphrase(passphrase: string) {
    // Create a 32-byte seed from a custom phrase (use hashing)
    const seed = sodium.crypto_generichash(32, sodium.from_string(passphrase));

    // Generate a key pair
    return sodium.crypto_box_seed_keypair(seed);
}

/**
 *
 * @param value - Uint8Array value
 * @returns String - String value
 */
function UintToBase64(value: Uint8Array) {
    return sodium.to_base64(value) || '';
}

/**
 *
 * @param value - String value
 * @returns String - Uint8Array value
 */
function Base64ToUint(value: string) {
    return sodium.from_base64(value) || '';
}

export {
    initSodium,
    encryptMessage,
    decryptMessage,
    generateKeyPairFromPassphrase,
    UintToBase64,
    Base64ToUint
}