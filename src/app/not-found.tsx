import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

function NotFound(): ReactElement {
    return (
        <Alert variant="warning">
            <Heading size="medium" level="3" spacing>
                Vi klarte ikke å finne denne oppgaven.
            </Heading>
            <BodyShort>Dersom problemet vedvarer, ta kontakt.</BodyShort>
        </Alert>
    )
}

export default NotFound
