import { ReactElement } from 'react'
import { Heading } from '@navikt/ds-react'

import OppgaveHenter from '@/components/oppgave/OppgaveHenter'

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
        </div>
    )
}

export default Page
