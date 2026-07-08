import { Heading } from '@navikt/ds-react'
import Image from 'next/image'
import React, { ReactElement } from 'react'

import plaster from '../../../svg/plaster.svg'
import { Sykmelding } from '../../../types/sykmelding'
import DiagnoseSeksjon from '../../infopanel/panelelementer/diagnose/DiagnoseSeksjon'
import SykmeldingPerioder from '../../infopanel/panelelementer/periode/SykmeldingPerioder'
import Tilbakedateringsinfo from '../../infopanel/utdypendeelementer/Tilbakedateringsinfo'

interface TilbakedatertForlengelseProps {
    sykmelding: Sykmelding
}

const TilbakedatertForlengelse = ({ sykmelding }: TilbakedatertForlengelseProps): ReactElement => {
    return (
        <div className="p-4 border border-ax-border-neutral relative">
            <div className="absolute left-0 top-0 flex h-12 w-full items-center gap-3 border-b border-ax-border-neutral bg-ax-bg-warning-moderate p-4">
                <Image src={plaster} alt="" />
                <Heading size="medium" level="2">
                    Utdrag fra sykmeldingen
                </Heading>
            </div>
            <div className="mt-12 flex flex-col gap-8 p-4">
                <SykmeldingPerioder perioder={sykmelding.perioder} />
                <div>
                    {sykmelding.medisinskVurdering.hovedDiagnose && (
                        <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
                    )}
                    {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose) => (
                        <DiagnoseSeksjon key={diagnose.kode} diagnose={diagnose} bidiagnose />
                    ))}
                </div>
                <Tilbakedateringsinfo
                    perioder={sykmelding.perioder}
                    kontaktDato={sykmelding.kontaktMedPasient.kontaktDato}
                    behandletTidspunkt={sykmelding.behandletTidspunkt}
                    begrunnelseIkkeKontakt={sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt}
                    genereringsDato={sykmelding.signaturDato}
                />
            </div>
        </div>
    )
}

export default TilbakedatertForlengelse
