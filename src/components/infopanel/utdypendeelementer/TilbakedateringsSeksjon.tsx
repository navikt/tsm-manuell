import React, { ReactElement } from 'react'

import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils'
import ElementMedTekst from '../layout/ElementMedTekst'
import SeksjonMedTittel from '../layout/SeksjonMedTittel'

interface TilbakedateringsSeksjonProps {
    kontaktDato: string | null
    begrunnelseIkkeKontakt: string | null
}

function TilbakedateringsSeksjon({ kontaktDato, begrunnelseIkkeKontakt }: TilbakedateringsSeksjonProps): ReactElement {
    return (
        <SeksjonMedTittel tittel="11. Tilbakedatering">
            <ElementMedTekst
                vis={!!kontaktDato}
                tittel="11.1. Datoen for dokumenterbar kontakt med pasienten"
                tekst={tilLesbarDatoMedArstall(kontaktDato)}
                margin
            />
            <ElementMedTekst
                vis={!!begrunnelseIkkeKontakt}
                tittel="11.2. Begrunnelsen for tilbakedateringen"
                tekst={begrunnelseIkkeKontakt}
                margin
            />
        </SeksjonMedTittel>
    )
}

export default TilbakedateringsSeksjon
