import { NextRequest, NextResponse } from 'next/server'

import { apiFetch } from '@/utils/fetch'
import { ManuellOppgaveSchema } from '@/utils/data-layer/manuellOppgaveSchema'

export async function GET(_: NextRequest, context: { params: Promise<{ oppgaveId: string }> }): Promise<Response> {
    const { oppgaveId } = await context.params
    const res = await apiFetch(`api/oppgave/${oppgaveId}`, 'GET')
    const body = await res.json()
    const manuellOppgave = ManuellOppgaveSchema.parse(body)
    return NextResponse.json(manuellOppgave, { status: res?.status })
}
