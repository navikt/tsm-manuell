import React, { ReactElement } from 'react'

import ElementMedTekst from '../layout/ElementMedTekst'
import SeksjonMedTittel from '../layout/SeksjonMedTittel'

interface ArbeidsevneProps {
    tiltakArbeidsplassen: string | null
    tiltakNAV: string | null
    andreTiltak: string | null
}

const Arbeidsevne = ({ tiltakArbeidsplassen, tiltakNAV, andreTiltak }: ArbeidsevneProps): ReactElement | null => {
    if (!tiltakArbeidsplassen && !tiltakNAV && !andreTiltak) {
        return null
    }

    return (
        <SeksjonMedTittel tittel="7. Hva skal til for å bedre arbeidsevnen?">
            <ElementMedTekst
                vis={!!tiltakArbeidsplassen}
                tittel="7.1. Tilrettelegging/hensyn som bør tas på arbeidsplassen"
                tekst={tiltakArbeidsplassen}
                margin
            />
            <ElementMedTekst vis={!!tiltakNAV} tittel="7.2. Tiltak i regi av NAV" tekst={tiltakNAV} margin />
            <ElementMedTekst
                vis={!!andreTiltak}
                tittel="7.3. Beskriv eventuelle andre innspill til NAV"
                tekst={andreTiltak}
                margin
            />
        </SeksjonMedTittel>
    )
}

export default Arbeidsevne
