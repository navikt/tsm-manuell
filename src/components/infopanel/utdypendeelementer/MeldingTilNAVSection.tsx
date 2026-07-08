import React, { ReactElement } from 'react'

import { MeldingTilNAV } from '../../../types/sykmelding'
import ElementMedTekst from '../layout/ElementMedTekst'
import EnkelCheckbox from '../layout/EnkelCheckbox'
import Margin from '../layout/Margin'
import SeksjonMedTittel from '../layout/SeksjonMedTittel'

interface MeldingTilNAVSectionProps {
    meldingTilNAV: MeldingTilNAV
}

function MeldingTilNAVSection({ meldingTilNAV }: MeldingTilNAVSectionProps): ReactElement {
    return (
        <SeksjonMedTittel tittel="8. Melding til NAV">
            <Margin>
                <EnkelCheckbox
                    tittel="8.1. Ønskes bistand fra NAV nå?"
                    bold
                    margin
                    checked={!!meldingTilNAV?.bistandUmiddelbart}
                    vis={!!meldingTilNAV?.bistandUmiddelbart}
                />
            </Margin>
            <ElementMedTekst
                vis={!!meldingTilNAV}
                margin
                tittel="8.2. Beskriv nærmere"
                tekst={meldingTilNAV?.beskrivBistand}
            />
        </SeksjonMedTittel>
    )
}

export default MeldingTilNAVSection
