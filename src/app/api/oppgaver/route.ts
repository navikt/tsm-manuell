import { NextRequest, NextResponse } from 'next/server'

import { apiFetch } from '@/utils/fetch'
import { UlosteOppgaverSchema } from '@/utils/data-layer/ulosteOppgaverSchema'

export async function GET(_: NextRequest): Promise<Response> {
    const res = await apiFetch(`api/oppgaver`, 'GET')
    const body = await res.json()
    const ulosteOppgaver = UlosteOppgaverSchema.parse(body)
    return NextResponse.json(ulosteOppgaver, { status: res?.status })
}
