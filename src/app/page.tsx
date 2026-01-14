import { ReactElement } from 'react'
import { Heading } from '@navikt/ds-react'

import OppgaveHenter from '@/components/oppgave/OppgaveHenter'
import { UlosteOppgaverHenter } from '@/components/oppgave/UlosteOppgaverHenter'

function Page(): ReactElement {
    return (
        <div>
            <div>
                <Heading size="large" spacing>
                    Manuell vurdering av tilbakedatert sykmelding
                </Heading>
            </div>

            <div>
                <OppgaveHenter />
            </div>

            <div>
                <UlosteOppgaverHenter />
            </div>
        </div>
    )
}

export default Page
