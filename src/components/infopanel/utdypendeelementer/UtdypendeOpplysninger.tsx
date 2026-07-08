import React, { ReactElement } from 'react'

import { SporsmalSvar, UtdypendeOpplysninger as UtdypendeOpplysningerType } from '../../../types/sykmelding'
import ElementMedTekst from '../layout/ElementMedTekst'
import Margin from '../layout/Margin'
import SeksjonMedTittel from '../layout/SeksjonMedTittel'

interface OpplysningsGruppeProps {
    opplysningGruppe: Record<string, SporsmalSvar>
}

const OpplysningsGruppe = ({ opplysningGruppe }: OpplysningsGruppeProps): ReactElement => {
    const sporsmal = Object.entries(opplysningGruppe).map(([key, sporsmalSvar]) => (
        <ElementMedTekst key={key} tittel={`${key}. ${sporsmalSvar.sporsmal}`} tekst={sporsmalSvar.svar} margin />
    ))
    return <>{sporsmal}</>
}

interface UtdypendeOpplysningerProps {
    opplysninger: UtdypendeOpplysningerType
}

function UtdypendeOpplysninger({ opplysninger }: UtdypendeOpplysningerProps): ReactElement | null {
    if (Object.keys(opplysninger).length === 0) {
        return null
    }

    const opplysningGrupper = Object.entries(opplysninger).map(([key, opplysningGruppe]) => (
        <Margin key={key}>
            <OpplysningsGruppe opplysningGruppe={opplysningGruppe} />
        </Margin>
    ))

    return <SeksjonMedTittel tittel="6. Utdypende opplysninger">{opplysningGrupper}</SeksjonMedTittel>
}

export default UtdypendeOpplysninger
