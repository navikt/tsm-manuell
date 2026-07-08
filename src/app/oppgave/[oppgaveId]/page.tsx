import { Skeleton } from '@navikt/ds-react'
import { notFound } from 'next/navigation'
import { ReactElement, Suspense } from 'react'

import MainContent from '../../../components/MainContent'
import ManuellOppgaveErrors from '../../../components/ManuellOppgaveErrors'
import { getOppgave } from '../../../services/syfosmmanuell-backend-service'

async function Page({ params }: PageProps<'/oppgave/[oppgaveId]'>): Promise<ReactElement> {
    const oppgaveId = (await params).oppgaveId

    return (
        <Suspense
            fallback={
                <div>
                    <Skeleton width="70%" height={48} />
                    <div className="mt-8">
                        <Skeleton width="20%" height={24} />
                        <Skeleton width="15%" height={24} />
                    </div>
                    <div className="mt-8">
                        <Skeleton width="20%" height={24} />
                        <Skeleton width="15%" height={24} />
                    </div>
                    <div className="mt-8">
                        <Skeleton width="20%" height={24} />
                        <Skeleton width="15%" height={24} />
                    </div>
                    <div className="mt-8">
                        <Skeleton variant="rectangle" height="600px" />
                    </div>
                </div>
            }
        >
            <Oppgave oppgaveId={oppgaveId} />
        </Suspense>
    )
}

async function Oppgave({ oppgaveId }: { oppgaveId: string }): Promise<ReactElement> {
    const oppgave = await getOppgave(oppgaveId)

    if ('errorType' in oppgave && oppgave.errorType === 'OPPGAVE_NOT_FOUND') {
        notFound()
    }

    if ('errorType' in oppgave) {
        return <ManuellOppgaveErrors errors={oppgave} />
    }

    return <MainContent manuellOppgave={oppgave} />
}

export default Page
