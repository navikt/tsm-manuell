import { ManuellOppgaveType } from '@/utils/data-layer/manuellOppgaveSchema'
import { UlosteOppgaverType, UlosteOppgaveType } from '@/utils/data-layer/ulosteOppgaverSchema'

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
        throw new Error(`Kunne ikkje hente oppgåva: ${response.status}`)
    }

    return response.json()
}

/**
 * Fetches all unprocessed oppgaver from the backend
 */
export async function hentUlosteOppgaver(): Promise<UlosteOppgaverType> {
    const response = await fetch(`/api/oppgaver`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if(!response.ok) {
        throw new Error(`Kunne ikkje hente oppgåvene: ${response.status}`)
    }

    return response.json()
}
