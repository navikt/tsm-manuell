'use client'

import { ReactElement } from 'react'
import { ExpansionCard } from '@navikt/ds-react'

import { Sykmelding } from '@/utils/data-layer/sykmeldingSchema'
import { HeleSykmeldingen } from '@/components/oppgave/HeleSykmeldingen'

type Props = {
    sykmelding: Sykmelding
}

export function SykmeldingDetaljer({ sykmelding }: Props): ReactElement {
    return (
        <ExpansionCard aria-labelledby="vis-heile-sjukmeldinga" size="small">
            <ExpansionCard.Header>
                <ExpansionCard.Title id="vis-heile-sjukmeldinga">
                    Klikk her for å sjå heile sjukmeldinga
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <HeleSykmeldingen sykmelding={sykmelding} />
                <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-gray-600">Vis rå JSON for samanlikning</summary>
                    <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto', fontSize: '0.75rem' }}>
                        {JSON.stringify(sykmelding, null, 2)}
                    </pre>
                </details>
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}
