import { getToken, requestOboToken, validateToken } from '@navikt/oasis'
import { headers } from 'next/headers'

import { createAccessToken } from '@/utils/jwt'

export async function apiFetch(path: string, method: 'GET' | 'POST', requestBody?: object, additionalHeaders?: Record<string,string>): Promise<Response> {
    if (process.env.NODE_ENV !== 'production') {
        try {
            return fetch(`http://localhost:8080/${path}`, {
                method,
                body: requestBody ? JSON.stringify(requestBody) : undefined,
                headers: {
                    Authorization: `Bearer ${await createAccessToken('local-dev', '1234567890')}`,
                    ...additionalHeaders,
                },
            })
        } catch (e) {
            console.log('Klarte ikkje å få kontakt med bakenden, har du hugsa å skru han på?', e)
            throw e
        }
    }
    const audience = process.env.TSM_MANUELL_AUDIENCE
    if (!audience)
        throw new Error(
            'TSM_MANUELL_AUDIENCE is not set. Please set it to the audience of the token you want to request OBO tokens for.',
        )
    const requestToken = getToken(await headers())
    if (!requestToken) {
        throw new Error('No access token found in request header')
    }
    const validation = await validateToken(requestToken)
    if (!validation.ok) {
        throw new Error('Invalid access token found in request header')
    }
    const oboToken = await requestOboToken(requestToken, audience)
    if (!oboToken.ok) {
        throw new Error('Unable to get OBO token')
    }

    return fetch(`http://tsm-manuell-api/${path}`, {
        method,
        body: requestBody ? JSON.stringify(requestBody) : undefined,
        headers: { Authorization: `Bearer ${oboToken.token}` },
    })
}
