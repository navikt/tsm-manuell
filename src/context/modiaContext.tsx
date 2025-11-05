import { createContext, PropsWithChildren, ReactElement, useCallback, useContext, useState } from 'react'

import { ModiaData, ModiaDataError } from '@/services/modiaService'

interface ModiaContext {
    modiaData: ModiaData | ModiaDataError
    aktivEnhet: string | null
    setAktivEnhet: (aktivEnhet: string) => void
}

type ModiaProviderProps = {
    modiaContext: ModiaData | ModiaDataError
}

const InternalModiaContext = createContext<ModiaContext | null>(null)

export const ModiaProvider = ({ children, modiaContext }: PropsWithChildren<ModiaProviderProps>): ReactElement => {
    const defaultAktivSelectValue = getDefaultSelectValue(modiaContext)
    const [aktivEnhet, setAktivEnhet] = useState<string | null>(defaultAktivSelectValue)

    const handleAktivEnhetChange = useCallback((aktivEnhet: string) => {
        setAktivEnhet(aktivEnhet)
    }, [])

    return (
        <InternalModiaContext.Provider
            value={{
                modiaData: modiaContext,
                aktivEnhet,
                setAktivEnhet: handleAktivEnhetChange,
            }}
        >
            {children}
        </InternalModiaContext.Provider>
    )
}

export function useModiaContext(): ModiaContext {
    const context = useContext(InternalModiaContext)

    if (context == null) {
        throw new Error('Illegal state: Modia context used without ModiaProvider in tree')
    }

    return context
}

function getDefaultSelectValue(modiaContext?: ModiaData | ModiaDataError): string | null {
    if (!modiaContext || 'errorType' in modiaContext) {
        return null
    }

    const { aktivEnhet, enheter } = modiaContext
    if (aktivEnhet == null && enheter.length > 0) {
        return enheter[0].enhetId
    }
    if (!aktivEnhet || !enheter || enheter.length === 0) return null

    return enheter.some((it) => it.enhetId === aktivEnhet) ? aktivEnhet : enheter[0].enhetId
}

export default ModiaProvider
