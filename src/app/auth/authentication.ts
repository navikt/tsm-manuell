import { headers } from 'next/headers'
import { getToken, validateToken } from '@navikt/oasis'
import { logger } from '@navikt/next-logger'

import { isLocalOrDemo } from '@/utils/env'

//TODO: continue this
export async function isValidToken(): Promise<boolean> {
    if (isLocalOrDemo) {
        logger.warn('Is running locally, skipping RSC auth')
        return true
    }

    const requestHeaders = await headers()
    const token = getToken(requestHeaders)
    if (!token) {
        return false
    }

    const validationResult = await validateToken(token)
    return validationResult.ok
}
