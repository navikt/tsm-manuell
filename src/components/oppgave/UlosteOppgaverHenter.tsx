'use client'

import { ReactElement, useState } from 'react'
import { Button } from '@navikt/ds-react'

import { UlosteOppgaverType } from '@/utils/data-layer/ulosteOppgaverSchema'
import { hentUlosteOppgaver } from '@/services/oppgaveService'

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
            <Button onClick={handleHentUlosteOppgaver} loading={loading}>Hent uløste oppgaver</Button>
        </div>
    )
}
