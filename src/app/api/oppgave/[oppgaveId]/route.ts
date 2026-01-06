import { NextRequest, NextResponse } from 'next/server'

import { apiFetch } from '@/utils/fetch'

export async function GET(_: NextRequest, context: { params: Promise<{ oppgaveId: string }> }): Promise<Response> {
    const { oppgaveId } = await context.params
    const res = await apiFetch(`api/oppgave/${oppgaveId}`, 'GET')
    return NextResponse.json(res, { status: res?.status })
}
