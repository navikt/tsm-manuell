'use client'

import { ReactElement, useEffect } from 'react'
import { logger } from '@navikt/next-logger'
import { Alert, BodyShort } from '@navikt/ds-react'

import { isLocalOrDemo } from '@/utils/env'
import { bundledEnv } from '@/utils/env'

function KvitteringPage(): ReactElement {
    useEffect(() => {
        if (isLocalOrDemo) {
            logger.warn('In demo, redirecting back to dummy oppgave')
            setTimeout(() => {
                window.location.href = '/oppgave/1001'
            }, 2000)
            return
        }

        logger.info('On kvittering page, user will be redirected to GOSYS')
        setTimeout(() => {
            window.location.href = bundledEnv.NEXT_PUBLIC_GOSYS_URL
        }, 2000)
    }, [])

    return (
        <div>
            <Alert variant="info">
                <BodyShort>Oppgåva er registrert. Du vert vidaresendt automatisk til GOSYS.</BodyShort>
                {isLocalOrDemo && (
                    <BodyShort>
                        Dette er berre ein demo, du blir sendt tilbake til oppgåva. Ingenting har vorte lagra.
                    </BodyShort>
                )}
            </Alert>
        </div>
    )
}

export default KvitteringPage
