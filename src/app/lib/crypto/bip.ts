import bip39 from 'bip39'

/**
 * Generates a random mnemonic
 *
 * @returns Random mnemonic
 */
function generateMnemonic() {
    return bip39.generateMnemonic()
}

/**
 * Remakes mnemonics into a seed
 *
 * @param mnemonic
 * @returns Mnemonic Seed
 */
function mnemonicToSeed(mnemonic: string) {
    return bip39.mnemonicToSeed(mnemonic)
}

/**
 * Validates mnemonic
 * @param mnemonic
 *
 * @returns {boolean} True if validated, otherwise - false
 */
function validateMnemonic(mnemonic: string): boolean {
    return bip39.validateMnemonic(mnemonic)
}

export {
    generateMnemonic,
    mnemonicToSeed,
    validateMnemonic
}