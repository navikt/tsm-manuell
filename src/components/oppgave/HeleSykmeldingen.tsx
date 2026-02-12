import { ReactElement } from 'react'
import { BodyShort, Heading, Label, Tag } from '@navikt/ds-react'
import { format } from 'date-fns'

import { Sykmelding } from '@/utils/data-layer/sykmeldingSchema'

type Props = {
    sykmelding: Sykmelding
}

export function HeleSykmeldingen({ sykmelding }: Props): ReactElement {
    return (
        <div className="flex flex-col gap-6">
            <SykmeldingHeader sykmelding={sykmelding} />
            <div>
                <BodyShort>sykmeldingId: {sykmelding.id}</BodyShort>
            </div>
            <PasientSection sykmelding={sykmelding} />
            <BehandlerSection sykmelding={sykmelding} />
            <ArbeidsgiverSection sykmelding={sykmelding} />
            <MedisinskVurderingSection sykmelding={sykmelding} />
            <AktivitetSection sykmelding={sykmelding} />
            <TilbakedateringSection sykmelding={sykmelding} />
            {sykmelding.type === 'XML' && <XMLSpesifikkSection sykmelding={sykmelding} />}
            <MetadataSection sykmelding={sykmelding} />
        </div>
    )
}

function SykmeldingHeader({ sykmelding }: Props): ReactElement {
    return (
        <div className="flex items-center gap-2">
            <Heading size="small" level="3">
                Sykmelding av type
            </Heading>
            <Tag variant={sykmelding.type === 'XML' ? 'warning' : 'info'} size="small">
                {sykmelding.type}
            </Tag>
        </div>
    )
}

function PasientSection({ sykmelding }: Props): ReactElement {
    const { pasient } = sykmelding
    return (
        <Section title="Pasient">
            <Field label="Fødselsnummer" value={pasient.fnr} />
            {pasient.navn && (
                <Field
                    label="Namn"
                    value={`${pasient.navn.fornavn} ${pasient.navn.mellomnavn ?? ''} ${pasient.navn.etternavn}`.trim()}
                />
            )}
            <Field label="NAV-kontor" value={pasient.navKontor} />
            <Field label="Fastlege" value={pasient.navnFastlege} />
            {pasient.kontaktinfo.length > 0 && (
                <div>
                    <Label as="p">Kontaktinfo</Label>
                    {pasient.kontaktinfo.map((info, i) => (
                        <BodyShort key={i}>
                            {info.type}: {info.value}
                        </BodyShort>
                    ))}
                </div>
            )}
        </Section>
    )
}

function BehandlerSection({ sykmelding }: Props): ReactElement {
    const { behandler, sykmelder } = sykmelding
    return (
        <Section title="Behandlar">
            <Field
                label="Namn"
                value={`${behandler.navn.fornavn} ${behandler.navn.mellomnavn ?? ''} ${behandler.navn.etternavn}`.trim()}
            />
            <Field label="Helsepersonellkategori" value={sykmelder.helsepersonellKategori} />
            {behandler.ids.length > 0 && (
                <div>
                    <Label as="p">ID-ar</Label>
                    {behandler.ids.map((id, i) => (
                        <BodyShort key={i}>
                            {id.type}: {id.id}
                        </BodyShort>
                    ))}
                </div>
            )}
            {behandler.adresse && (
                <div>
                    <Label as="p">Adresse</Label>
                    <BodyShort>
                        {[
                            behandler.adresse.gateadresse,
                            behandler.adresse.postboks,
                            behandler.adresse.postnummer,
                            behandler.adresse.poststed,
                            behandler.adresse.kommune,
                            behandler.adresse.land,
                        ]
                            .filter(Boolean)
                            .join(', ')}
                    </BodyShort>
                </div>
            )}
            {behandler.kontaktinfo.length > 0 && (
                <div>
                    <Label as="p">Kontaktinfo</Label>
                    {behandler.kontaktinfo.map((info, i) => (
                        <BodyShort key={i}>
                            {info.type}: {info.value}
                        </BodyShort>
                    ))}
                </div>
            )}
        </Section>
    )
}

function ArbeidsgiverSection({ sykmelding }: Props): ReactElement {
    const { arbeidsgiver } = sykmelding
    return (
        <Section title="Arbeidsgjevar">
            <Field label="Namn" value={arbeidsgiver.navn} />
            <Field label="Yrkesbetegnelse" value={arbeidsgiver.yrkesbetegnelse} />
            <Field label="Stillingsprosent" value={arbeidsgiver.stillingsprosent?.toString()} />
            <Field label="Melding til arbeidsgjevar" value={arbeidsgiver.meldingTilArbeidsgiver} />
            <Field label="Tiltak på arbeidsplassen" value={arbeidsgiver.tiltakArbeidsplassen} />
        </Section>
    )
}

function MedisinskVurderingSection({ sykmelding }: Props): ReactElement {
    const { medisinskVurdering } = sykmelding
    return (
        <Section title="Medisinsk vurdering">
            {medisinskVurdering.hovedDiagnose && (
                <div>
                    <Label as="p">Hovuddiagnose</Label>
                    <BodyShort>
                        {medisinskVurdering.hovedDiagnose.kode} - {medisinskVurdering.hovedDiagnose.tekst}
                    </BodyShort>
                    <BodyShort className="text-gray-600">{medisinskVurdering.hovedDiagnose.system}</BodyShort>
                </div>
            )}
            {medisinskVurdering.biDiagnoser && medisinskVurdering.biDiagnoser.length > 0 && (
                <div>
                    <Label as="p">Bidiagnosar</Label>
                    {medisinskVurdering.biDiagnoser.map((diagnose, i) => (
                        <div key={i}>
                            <BodyShort>
                                {diagnose.kode} - {diagnose.tekst}
                            </BodyShort>
                            <BodyShort className="text-gray-600">{diagnose.system}</BodyShort>
                        </div>
                    ))}
                </div>
            )}
            <Field label="Svangerskap" value={medisinskVurdering.svangerskap ? 'Ja' : 'Nei'} />
            <Field label="Skjerma for pasient" value={medisinskVurdering.skjermetForPasient ? 'Ja' : 'Nei'} />
            <Field label="Sjuketilfellet startdato" value={formatDate(medisinskVurdering.syketilfelletStartDato)} />
            {medisinskVurdering.yrkesskade && (
                <Field label="Yrkesskadedato" value={formatDate(medisinskVurdering.yrkesskade.yrkesskadeDato)} />
            )}
            {medisinskVurdering.annenFraversArsak && (
                <div>
                    <Label as="p">Anna fråversårsak</Label>
                    <BodyShort>{medisinskVurdering.annenFraversArsak.beskrivelse}</BodyShort>
                    {medisinskVurdering.annenFraversArsak.arsak && (
                        <BodyShort>{medisinskVurdering.annenFraversArsak.arsak.join(', ')}</BodyShort>
                    )}
                </div>
            )}
        </Section>
    )
}

function AktivitetSection({ sykmelding }: Props): ReactElement {
    return (
        <Section title="Aktivitet/Periodar">
            {sykmelding.aktivitet.map((aktivitet, i) => (
                <div key={i} className="border-l-2 border-gray-300 pl-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Tag variant="neutral" size="small">
                            {aktivitet.type}
                        </Tag>
                        <BodyShort>
                            {formatDate(aktivitet.fom)} - {formatDate(aktivitet.tom)}
                        </BodyShort>
                    </div>
                    {aktivitet.type === 'GRADERT' && (
                        <>
                            <Field label="Grad" value={`${aktivitet.grad}%`} />
                            <Field label="Reisetilskot" value={aktivitet.reisetilskudd ? 'Ja' : 'Nei'} />
                        </>
                    )}
                    {aktivitet.type === 'BEHANDLINGSDAGER' && (
                        <Field label="Antal behandlingsdagar" value={aktivitet.antallBehandlingsdager.toString()} />
                    )}
                    {aktivitet.type === 'AVVENTENDE' && (
                        <Field label="Innspel til arbeidsgjevar" value={aktivitet.innspillTilArbeidsgiver} />
                    )}
                    {aktivitet.type === 'AKTIVITET_IKKE_MULIG' && (
                        <>
                            {aktivitet.medisinskArsak && (
                                <div>
                                    <Label as="p">Medisinsk årsak</Label>
                                    <BodyShort>{aktivitet.medisinskArsak.arsak.join(', ')}</BodyShort>
                                    {aktivitet.medisinskArsak.beskrivelse && (
                                        <BodyShort>{aktivitet.medisinskArsak.beskrivelse}</BodyShort>
                                    )}
                                </div>
                            )}
                            {aktivitet.arbeidsrelatertArsak && (
                                <div>
                                    <Label as="p">Arbeidsrelatert årsak</Label>
                                    <BodyShort>{aktivitet.arbeidsrelatertArsak.arsak.join(', ')}</BodyShort>
                                    {aktivitet.arbeidsrelatertArsak.beskrivelse && (
                                        <BodyShort>{aktivitet.arbeidsrelatertArsak.beskrivelse}</BodyShort>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            ))}
        </Section>
    )
}

function TilbakedateringSection({ sykmelding }: Props): ReactElement {
    const { tilbakedatering, bistandNav } = sykmelding
    return (
        <Section title="Tilbakedatering og bistand">
            <Field label="Kontaktdato" value={formatDate(tilbakedatering?.kontaktDato)} />
            <Field label="Begrunnelse for tilbakedatering" value={tilbakedatering?.begrunnelse} />
            {bistandNav && (
                <>
                    <Field label="Bistand umiddelbart" value={bistandNav.bistandUmiddelbart ? 'Ja' : 'Nei'} />
                    <Field label="Beskriv bistand" value={bistandNav.beskrivBistand} />
                </>
            )}
        </Section>
    )
}

function XMLSpesifikkSection({ sykmelding }: { sykmelding: Extract<Sykmelding, { type: 'XML' }> }): ReactElement {
    const { prognose, tiltak, utdypendeOpplysninger } = sykmelding
    return (
        <Section title="XML-spesifikk informasjon">
            {prognose && (
                <div>
                    <Label as="p">Prognose</Label>
                    <Field
                        label="Arbeidsfor etter periode"
                        value={prognose.arbeidsforEtterPeriode ? 'Ja' : 'Nei'}
                    />
                    <Field label="Omsyn på arbeidsplassen" value={prognose.hensynArbeidsplassen} />
                    {prognose.arbeid && (
                        <div className="ml-4">
                            {prognose.arbeid.type === 'ER_I_ARBEID' && (
                                <>
                                    <Field
                                        label="Eige arbeid på sikt"
                                        value={prognose.arbeid.egetArbeidPaSikt ? 'Ja' : 'Nei'}
                                    />
                                    <Field
                                        label="Anna arbeid på sikt"
                                        value={prognose.arbeid.annetArbeidPaSikt ? 'Ja' : 'Nei'}
                                    />
                                    <Field label="Arbeid FOM" value={formatDate(prognose.arbeid.arbeidFOM)} />
                                </>
                            )}
                            {prognose.arbeid.type === 'ER_IKKE_I_ARBEID' && (
                                <>
                                    <Field
                                        label="Arbeidsfor på sikt"
                                        value={prognose.arbeid.arbeidsforPaSikt ? 'Ja' : 'Nei'}
                                    />
                                    <Field label="Arbeidsfor FOM" value={formatDate(prognose.arbeid.arbeidsforFOM)} />
                                </>
                            )}
                            <Field label="Vurderingsdato" value={formatDate(prognose.arbeid.vurderingsdato)} />
                        </div>
                    )}
                </div>
            )}
            {tiltak && (
                <div>
                    <Label as="p">Tiltak</Label>
                    <Field label="Tiltak NAV" value={tiltak.tiltakNav} />
                    <Field label="Andre tiltak" value={tiltak.andreTiltak} />
                </div>
            )}
            {utdypendeOpplysninger && Object.keys(utdypendeOpplysninger).length > 0 && (
                <div>
                    <Label as="p">Utdjupande opplysningar</Label>
                    {Object.entries(utdypendeOpplysninger).map(([groupKey, group]) => (
                        <div key={groupKey} className="ml-4 mb-2">
                            <BodyShort className="font-semibold">{groupKey}</BodyShort>
                            {Object.entries(group).map(([questionKey, qa]) => (
                                <div key={questionKey} className="ml-4">
                                    <BodyShort className="text-gray-600">{qa.sporsmal ?? questionKey}</BodyShort>
                                    <BodyShort>{qa.svar}</BodyShort>
                                    {qa.restriksjoner.length > 0 && (
                                        <BodyShort className="text-sm text-gray-500">
                                            Restriksjonar: {qa.restriksjoner.join(', ')}
                                        </BodyShort>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </Section>
    )
}

function MetadataSection({ sykmelding }: Props): ReactElement {
    const { metadata } = sykmelding
    return (
        <Section title="Metadata">
            <Field label="Sykmelding-ID" value={sykmelding.id} />
            <Field label="Mottatt dato" value={formatDate(metadata.mottattDato)} />
            <Field label="Generert dato" value={formatDate(metadata.genDate)} />
            <Field label="Avsendarsystem" value={`${metadata.avsenderSystem.navn} v${metadata.avsenderSystem.versjon}`} />
            {sykmelding.type === 'XML' && (
                <>
                    <Field label="Behandla tidspunkt" value={formatDate(sykmelding.metadata.behandletTidspunkt)} />
                    <Field label="Regelsettversjon" value={sykmelding.metadata.regelsettVersjon} />
                    <Field label="Strekkode" value={sykmelding.metadata.strekkode} />
                </>
            )}
        </Section>
    )
}

// Helper components

function Section({ title, children }: { title: string; children: React.ReactNode }): ReactElement {
    return (
        <div className="border rounded-lg p-4 bg-white">
            <Heading size="xsmall" level="4" className="mb-3">
                {title}
            </Heading>
            <div className="flex flex-col gap-2">{children}</div>
        </div>
    )
}

function Field({ label, value }: { label: string; value: string | null | undefined }): ReactElement | null {
    if (value === null || value === undefined || value === '') return null
    return (
        <div>
            <Label as="p" size="small">
                {label}
            </Label>
            <BodyShort>{value}</BodyShort>
        </div>
    )
}

function formatDate(dateString: string | null | undefined): string | null {
    if (!dateString) return null
    try {
        return format(new Date(dateString), 'dd.MM.yyyy HH:mm')
    } catch {
        return dateString
    }
}
