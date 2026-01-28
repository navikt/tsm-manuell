import React, { ReactElement } from 'react'
import { Alert, Heading } from '@navikt/ds-react'

function NotFound(): ReactElement {
    return (
        <div className="container mx-auto p-8">
            <div className="p-8 max-w-prose">
                <Heading size="large" spacing>
                    Vi fann ikkje denne sida
                </Heading>
                <Alert variant="warning">
                    Om du har fulgt ei lenke her, må du gjerne rapportere til oss kvar du fann den lenken så vi kan
                    løyse problemet.
                </Alert>
            </div>
        </div>
    )
}

export default NotFound
