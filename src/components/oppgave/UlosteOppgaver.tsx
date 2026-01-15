import { UlosteOppgaverType } from '@/utils/data-layer/ulosteOppgaverSchema'
import { ReactElement } from 'react'
import { BodyShort, Label } from '@navikt/ds-react'
import { format } from 'date-fns'

import styles from '@/components/oppgave/UlosteOppgaver.module.css'

type Props = {
    ulosteOppgaver: UlosteOppgaverType
}

export function UlosteOppgaver({ulosteOppgaver}: Props): ReactElement {

    return (
        <div>
            {ulosteOppgaver.map((oppgave) => (
                <div key={oppgave.oppgaveId}>
                    <div className={styles.oppgaveCard}>
                        <Label as="p">OppgaveId: </Label>
                        <BodyShort>{oppgave.oppgaveId}</BodyShort>

                        <Label as="p">MottattDato: </Label>
                        <BodyShort>{format(new Date(oppgave.mottattDato), 'dd.MM.yyyy HH.MM.SS')}</BodyShort>

                        <Label as="p">Status: </Label>
                        <BodyShort>{oppgave.status}</BodyShort>
                    </div>
                </div>
            ))}
        </div>
    )
}