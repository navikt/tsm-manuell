import { importPKCS8, importSPKI, SignJWT } from 'jose'
import { lazyNextleton } from 'nextleton'

import { testOnlyPrivateKey, testOnlyPublicKey } from '@/utils/test-only-keys'

export async function createAccessToken(audience: string, code: string): Promise<string> {
    return await new SignJWT({ jti: code, preferred_username: 'local.user@nav.no' })
        .setProtectedHeader({ alg: 'RS256', kid: 'very-cool-kid' }) // Use the same 'kid' as in /keys
        .setIssuedAt()
        .setIssuer('local-dev')
        .setAudience(audience)
        .sign(await privateKey())
}

async function privateKey(): Promise<CryptoKey> {
    const { privateKey } = await keyPair()

    return privateKey
}

const keyPair = lazyNextleton('tsm-manuell-key-pair', async () => {
    const privateKey = await importPKCS8(testOnlyPrivateKey, 'RS256')
    const publicKey = await importSPKI(testOnlyPublicKey, 'RS256')

    return { publicKey, privateKey }
})
