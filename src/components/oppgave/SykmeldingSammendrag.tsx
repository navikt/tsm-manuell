import { ReactElement } from 'react'
import { BandageIcon } from '@navikt/aksel-icons'
import { BodyShort, Detail, HelpText, InfoCard, Label } from '@navikt/ds-react'
import { differenceInDays, format } from 'date-fns'

import { SykmeldingBaseType } from '@/utils/data-layer/sykmeldingSchema'

export function SykmeldingSammendrag({ sykmelding }: { sykmelding: SykmeldingBaseType }): ReactElement {
    const { medisinskVurdering } = sykmelding
    return (
        <InfoCard data-color="info">
            <InfoCard.Header icon={<BandageIcon aria-hidden />}>
                <InfoCard.Title>Utdrag fra sykmeldingen</InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>
                {sykmelding.aktivitet.map((aktivitet, index) => (
                    <div key={index}>
                        <Label as="p">Sykmeldingsperiode</Label>
                        <BodyShort>
                            {format(new Date(aktivitet.fom), 'dd.MM.yyyy')}-
                            {format(new Date(aktivitet.tom), 'dd.MM.yyyy')}
                        </BodyShort>
                        <BodyShort>
                            {differenceInDays(new Date(aktivitet.tom), new Date(aktivitet.fom))} dager
                        </BodyShort>
                        <BodyShort>{aktivitet.type}</BodyShort>
                        {aktivitet.type === 'GRADERT' && <BodyShort>{aktivitet.grad}%</BodyShort>}
                    </div>
                ))}

                {/*Diagnose og bidiagnsose*/}
                {medisinskVurdering.hovedDiagnose && (
                    <div>
                        <Label as="p">Diagnose</Label>
                        <BodyShort>{medisinskVurdering.hovedDiagnose.tekst}</BodyShort>
                        <Detail>Diagnosa visast ikkje til arbeidsgjevar</Detail>
                        <Label as="p">
                            Diagnosekode{' '}
                            <HelpText title="">
                                Diagnosekoden henviser til de internasjonale kodeverkene som klassifiserer sykdom og
                                symptomer. De ulike diagnosekodene brukes for å gi en mest mulig presis diagnose.
                            </HelpText>
                        </Label>
                        <BodyShort>{medisinskVurdering.hovedDiagnose.kode}</BodyShort>
                        <Detail>{medisinskVurdering.hovedDiagnose.system}</Detail>
                    </div>
                )}

                {medisinskVurdering.biDiagnoser?.map((diagnose) => (
                    <div key={diagnose.kode}>
                        <Label as="p">Bidiagnose</Label>
                        <BodyShort>{diagnose.tekst}</BodyShort>
                        <Detail>Diagnosa visast ikkje til arbeidsgjevar</Detail>
                        <Label as="p">Diagnosekode</Label>
                        <BodyShort>{diagnose.kode}</BodyShort>
                        <Detail>{diagnose.system}</Detail>
                    </div>
                ))}

                {/*gul infoboks greie*/}
                <div>
                    <Label as="p">11.1 Dato for dokumenterbar kontakt med pasienten</Label>
                    <BodyShort>PLACEHOLDER</BodyShort>

                    <Label as="p">11.2 Begrunnelse for tilbakedateringen</Label>
                    <BodyShort>PLACEHOLDER</BodyShort>

                    <Label as="p">12.1 Dato pasienten oppsøkte behandleren</Label>
                    <BodyShort>PLACEHOLDER</BodyShort>

                    <Label as="p">Startdato for sykmeldingen (første fom. i perioden)</Label>
                    <BodyShort>PLACEHOLDER</BodyShort>

                    <Label as="p">Dato sykmeldingen ble generert</Label>
                    <BodyShort> {format(new Date(sykmelding.metadata.genDate), 'dd.MM.yyyy')}</BodyShort>

                    <Label as="p">Antall dager tilbakedatert</Label>
                    <BodyShort>PLACEHOLDER</BodyShort>
                </div>
            </InfoCard.Content>
        </InfoCard>
    )
}
