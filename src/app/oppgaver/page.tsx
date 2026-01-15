import { ReactElement } from 'react'
import { Heading } from '@navikt/ds-react'

import { UlosteOppgaverHenter } from '@/components/oppgave/UlosteOppgaverHenter'

function OppgaverPage(): ReactElement {
    return (
        <div>
            <Heading size="large" spacing>
                Her kan du finne uløyste oppgåver
            </Heading>
            <UlosteOppgaverHenter />
        </div>
    )
}

export default OppgaverPage
