import { Skeleton } from '@navikt/ds-react'
import { ReactElement, Suspense } from 'react'

import ManuellOppgaveErrors from '../../components/ManuellOppgaveErrors'
import Oppgaver from '../../components/oppgaver/Oppgaver'
import { getUlosteOppgaver } from '../../services/syfosmmanuell-backend-service'

function Page(): ReactElement {
    return (
        <Suspense
            fallback={
                <div className="flex flex-col gap-4">
                    {Array.from(Array(10).keys()).map((i) => (
                        <Skeleton key={i} variant="rounded" height="200px" />
                    ))}
                </div>
            }
        >
            <UlosteOppgaver />
        </Suspense>
    )
}

async function UlosteOppgaver(): Promise<ReactElement> {
    const ulosteOppgaver = await getUlosteOppgaver()

    if ('errorType' in ulosteOppgaver) {
        return <ManuellOppgaveErrors errors={ulosteOppgaver} />
    }

    return <Oppgaver oppgaver={ulosteOppgaver} />
}

export default Page
