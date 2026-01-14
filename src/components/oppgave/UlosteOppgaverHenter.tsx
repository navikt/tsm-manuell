'use client'

import { ReactElement, useState } from 'react'
import { Button } from '@navikt/ds-react'

import { UlosteOppgaverType } from '@/utils/data-layer/ulosteOppgaverSchema'
import { hentUlosteOppgaver } from '@/services/oppgaveService'
import { UlosteOppgaver } from './UlosteOppgaver'

export function UlosteOppgaverHenter(): ReactElement {
    const [oppgaveData, setOppgaveData] = useState<UlosteOppgaverType | null>(null) //enkelt eller lista?? whiiich? emptyList i staden for null?
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handleHentUlosteOppgaver = async (): Promise<void> => {
        setLoading(true)
        setError(null)

        try {
            const data = await hentUlosteOppgaver()
            setOppgaveData(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Noko gjekk gale')
            setOppgaveData(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Button onClick={handleHentUlosteOppgaver} loading={loading}>
                Hent uløste oppgaver
            </Button>

            {/* Show error message if there is one */}
            {error && <p style={{ color: 'red', marginTop: '1rem' }}>Feil: {error}</p>}

            {/* Show the API response if we have data */}
            {oppgaveData && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>Resultat:</h3>
                    <UlosteOppgaver ulosteOppgaver={oppgaveData} />
                    {/*<pre style={{ background: '#f5f5f5', padding: '1rem' }}>{JSON.stringify(oppgaveData, null, 2)}</pre>*/}
                </div>
            )}
        </div>
    )
}
