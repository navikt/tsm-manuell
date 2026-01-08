import { ManuellOppgaveType } from '@/utils/data-layer/manuellOppgaveSchema'

/**
 * Fetches a single oppgave by ID from the backend
 */
export async function hentOppgave(oppgaveId: string): Promise<ManuellOppgaveType> {
    const response = await fetch(`/api/oppgave/${oppgaveId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error(`Kunne ikke hente oppgave: ${response.status}`)
    }

    return response.json()
}
