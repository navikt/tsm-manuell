import { UlosteOppgaverType } from '@/utils/data-layer/ulosteOppgaverSchema'
import { ReactElement } from 'react'
import { BodyShort, Label } from '@navikt/ds-react'
import { format } from 'date-fns'

type Props = {
    ulosteOppgaver: UlosteOppgaverType
}

export function UlosteOppgaver({ulosteOppgaver}: Props): ReactElement {

    return (
        <div>
            {ulosteOppgaver.map((oppgave) => (
                <div key={oppgave.oppgaveId}>
                    <Label as="p">I don´t know what im doing here</Label>

                    <Label as="p">OppgaveId: </Label>
                    <BodyShort>
                        {oppgave.oppgaveId}
                    </BodyShort>

                    <Label as="p">MottattDato: </Label>
                    <BodyShort>
                        {format(new Date(oppgave.mottattDato), 'dd.MM.yyyy HH.MM.SS')}
                    </BodyShort>

                    <Label as="p">Status: </Label>
                    <BodyShort>
                        {oppgave.status}
                    </BodyShort>
                </div>
            ))}
        </div>
    )
}