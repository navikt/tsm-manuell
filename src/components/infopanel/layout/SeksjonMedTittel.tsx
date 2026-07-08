import { Heading } from '@navikt/ds-react'
import React, { ReactElement, ReactNode } from 'react'

interface SeksjonMedTittelProps {
    tittel?: string
    children: ReactNode
}

function SeksjonMedTittel({ tittel, children }: SeksjonMedTittelProps): ReactElement {
    return (
        <div className="border-b border-ax-border-neutral-subtle">
            {tittel && (
                <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <Heading size="medium" level="3">
                        {tittel}
                    </Heading>
                </div>
            )}

            {children}
        </div>
    )
}

export default SeksjonMedTittel
