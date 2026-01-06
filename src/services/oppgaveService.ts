/**
 * This file contains all API calls related to "oppgave" (tasks).
 * Keeping API logic separate from components makes code:
 * - Easier to test
 * - Reusable across multiple components
 * - Easier to maintain and modify
 */

// Define the shape of the API response (you can update this based on actual response)
export interface ManuellOppgaveResponse {
    // Add the actual fields from your backend response here
    id: string
    // ... other fields
}

/**
 * Fetches a single oppgave by ID from the backend
 */
export async function hentOppgave(oppgaveId: string): Promise<ManuellOppgaveResponse> {
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
