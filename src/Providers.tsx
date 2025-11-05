'use client'

import { PropsWithChildren, ReactElement } from 'react'

import { ModiaData, ModiaDataError } from '@/services/modiaService'
import ModiaProvider from '@/context/modiaContext'

type Props = {
    modiaContext: ModiaData | ModiaDataError
}

function Providers({ children, modiaContext }: PropsWithChildren<Props>): ReactElement {
    return <ModiaProvider modiaContext={modiaContext}>{children}</ModiaProvider>
}

export default Providers
