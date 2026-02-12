import { ReactElement } from 'react'

import { apiFetch } from '@/utils/fetch'
import { ManuellVurderingSender } from '@/components/manuellVurdering/ManuellVurderingSender'
import { Oppgave } from '@/components/oppgave/Oppgave'
import { SykmeldingDetaljer } from '@/components/oppgave/SykmeldingDetaljer'
import { ManuellOppgaveType } from '@/utils/data-layer/manuellOppgaveSchema'

async function Page({ params }: { params: Promise<{ oppgaveId: string }> }): Promise<ReactElement> {
    const { oppgaveId } = await params
    const res = await apiFetch(`api/oppgave/${oppgaveId}`, 'GET')

    const data: ManuellOppgaveType = await res.json()
    return (
        <div style={{ marginTop: '1rem' }}>
            <h3>Resultat:</h3>
            <div className="flex gap-4 flex-col">
                <Oppgave oppgaveData={data} />
                <SykmeldingDetaljer sykmelding={data.sykmelding} />
                <ManuellVurderingSender oppgaveId={data.oppgaveId.toString()} />

            </div>
        </div>
    )
}
export default Page
