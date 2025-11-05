import { ReactElement } from 'react'
import { Heading } from '@navikt/ds-react'

function Page(): ReactElement {
    return (
        <div>
            <Heading size="large" spacing>
                Manuell vurdering av tilbakedatert sykmelding
            </Heading>
        </div>
    )
}

export default Page
