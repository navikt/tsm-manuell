import { NextRequest, NextResponse } from 'next/server'
import { apiFetch } from '@/utils/fetch'
import { SaksbehandlersVurderingType } from '@/utils/data-layer/saksbehandlersVurderingSchema'
import { NAV_EINING } from '@/schema/ModiaSchema'

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ oppgaveId: string }> },
): Promise<Response> {
    const { oppgaveId } = await context.params
    const aktivEining = { NAV_EINING: request.headers.get(NAV_EINING) ?? '' }
    const requestBody = await request.json() as SaksbehandlersVurderingType
    const res = await apiFetch(`api/vurderingmanuelloppgave/${oppgaveId}`, 'POST', requestBody, aktivEining)
    return NextResponse.json({ res })
}