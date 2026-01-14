'use client'

import { ReactElement, useState } from 'react'
import { Button, TextField } from '@navikt/ds-react'

import { hentOppgave } from '@/services/oppgaveService'
import { ManuellOppgaveType } from '@/utils/data-layer/manuellOppgaveSchema'
import { Oppgave } from '@/components/oppgave/Oppgave'

/**
 * A component that lets the user input an oppgaveId and fetch it from the backend.
 *
 * This component handles:
 * - User input (oppgaveId)
 * - Loading state
 * - Error handling
 * - Displaying the result
 */
function OppgaveHenter(): ReactElement {
    // State for the input field - updates as user types
    const [oppgaveId, setOppgaveId] = useState<string>('')

    const [oppgaveData, setOppgaveData] = useState<ManuellOppgaveType | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    // Handler for the button click
    const handleHentOppgave = async (): Promise<void> => {
        if (!oppgaveId.trim()) {
            setError('Vennligst skriv inn en oppgave-ID')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const data = await hentOppgave(oppgaveId)
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
            <TextField
                label="Oppgave-ID"
                value={oppgaveId}
                onChange={(e) => setOppgaveId(e.target.value)}
                style={{ marginBottom: '1rem', maxWidth: '300px' }}
            />

            <Button onClick={handleHentOppgave} loading={loading}>
                Hent oppgave
            </Button>

            {/* Show error message if there is one */}
            {error && <p style={{ color: 'red', marginTop: '1rem' }}>Feil: {error}</p>}

            {/* Show the API response if we have data */}
            {oppgaveData && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>Resultat:</h3>
                    <Oppgave oppgaveData={oppgaveData} />
                    {/*<pre style={{ background: '#f5f5f5', padding: '1rem' }}>{JSON.stringify(oppgaveData, null, 2)}</pre>*/}
                </div>
            )}
        </div>
    )
}

export default OppgaveHenter
