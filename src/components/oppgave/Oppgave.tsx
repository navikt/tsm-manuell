import { ReactElement } from 'react'
import { BodyShort, Label } from '@navikt/ds-react'
import { format } from 'date-fns'

import { ManuellOppgaveType } from '@/utils/data-layer/manuellOppgaveSchema'
import { SykmeldingSammendrag } from '@/components/oppgave/SykmeldingSammendrag'

type Props = {
    oppgaveData: ManuellOppgaveType
}

export function Oppgave({ oppgaveData }: Props): ReactElement {
    return (
        <div>
            <div>
                <Label as="p">Fødselsnummer</Label>
                <BodyShort>{oppgaveData.ident}</BodyShort>
            </div>
            <div>
                <Label as="p">Arbeidsgiver</Label>
                <BodyShort>{oppgaveData.sykmelding.arbeidsgiver.navn}</BodyShort>
            </div>
            <div>
                <Label as="p">Sykmelder</Label>
                <BodyShort>
                    {oppgaveData.sykmelding.behandler.navn.fornavn} {oppgaveData.sykmelding.behandler.navn.mellomnavn}{' '}
                    {oppgaveData.sykmelding.behandler.navn.etternavn}
                </BodyShort>
            </div>
            <div>
                <Label as="p">Datoen Nav mottok sykmeldingen:</Label>
                <BodyShort>{format(new Date(oppgaveData.mottattDato), 'dd.MM.yyyy hh:mm:ss')}</BodyShort>
            </div>
            <SykmeldingSammendrag sykmelding={oppgaveData.sykmelding} />
            <pre style={{ background: '#f5f5f5', padding: '1rem' }}>{JSON.stringify(oppgaveData, null, 2)}</pre>
        </div>
    )
}
