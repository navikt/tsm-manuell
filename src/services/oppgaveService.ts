import { ManuellOppgaveType } from '@/utils/data-layer/manuellOppgaveSchema'
import { UlosteOppgaverType } from '@/utils/data-layer/ulosteOppgaverSchema'
import { SaksbehandlersVurderingType } from '@/utils/data-layer/saksbehandlersVurderingSchema'

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

    if (!response.ok) {
        throw new Error(`Kunne ikkje hente oppgåvene: ${response.status}`)
    }

    return response.json()
}

export async function sendManuellVurdering(
    oppgaveId: string,
    vurdering: SaksbehandlersVurderingType,
    aktivEnhet: string,
): Promise<void> {
    const response = await fetch(`/api/oppgave/${oppgaveId}/manuellVurdering`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Nav-Enhet': aktivEnhet ?? '',
        },
        body: JSON.stringify(vurdering),
    })
    if (!response.ok) {
        throw new Error(`Kunne ikke sende vurdering: ${response.status}`)
    }
    return response.json()
}
