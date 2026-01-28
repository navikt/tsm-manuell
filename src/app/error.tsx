'use client'

import { ReactElement, useEffect } from 'react'
import { Alert, Heading } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'

export default function Error({ error }: { error: Error & { digest?: string } }): ReactElement {
    useEffect(() => {
        logger.error(error)
    }, [error])

    return (
        <div className="container mx-auto p-8">
            <div className="p-8 max-w-prose">
                <Heading size="large" spacing>
                    Noko gjekk gale
                </Heading>
                <Alert variant="error">Det oppstod diverre ein feil i baksystemet. Vær venleg å prøv attende seinare.</Alert>
            </div>
        </div>
    )
}
