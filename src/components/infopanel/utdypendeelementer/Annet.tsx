import React, { ReactElement } from 'react'

import ElementMedTekst from '../layout/ElementMedTekst'
import SeksjonMedTittel from '../layout/SeksjonMedTittel'

interface AnnetProps {
    behandlerTelefon: string | null
}

const Annet = ({ behandlerTelefon }: AnnetProps): ReactElement | null => {
    if (!behandlerTelefon) {
        return null
    }

    return (
        <SeksjonMedTittel tittel="Annet">
            <ElementMedTekst
                vis={!!behandlerTelefon}
                margin
                tittel="Telefon til lege/sykmelder"
                tekst={behandlerTelefon}
            />
        </SeksjonMedTittel>
    )
}

export default Annet
