import { z } from 'zod'

import { ManuellOppgaveSchema } from '@/utils/data-layer/manuellOppgaveSchema'

export const ArbeidsgiverInfoSchema = z.object({
    navn: z.string().nullable(),
    yrkesbetegnelse: z.string().nullable(),
    stillingsprosent: z.number().nullable(),
    meldingTilArbeidsgiver: z.string().nullable(),
    tiltakArbeidsplassen: z.string().nullable(),
})

export const NavnSchema = z.object({
    fornavn: z.string(),
    mellomnavn: z.string().nullable(),
    etternavn: z.string(),
})

export const AdresseTypeSchema = z.enum([
    'BOSTEDSADRESSE',
    'FOLKEREGISTERADRESSE',
    'FERIEADRESSE',
    'FAKTURERINGSADRESSE',
    'POSTADRESSE',
    'BESOKSADRESSE',
    'MIDLERTIDIG_ADRESSE',
    'ARBEIDSADRESSE',
    'UBRUKELIG_ADRESSE',
    'UKJENT',
    'UGYLDIG',
])

export const AdresseSchema = z.object({
    type: AdresseTypeSchema,
    gateadresse: z.string().nullable(),
    postnummer: z.string().nullable(),
    poststed: z.string().nullable(),
    postboks: z.string().nullable(),
    kommune: z.string().nullable(),
    land: z.string().nullable(),
})

export const KontaktinfoTypeSchema = z.enum([
    'TELEFONSVARER',
    'NODNUMMER',
    'FAX_TELEFAKS',
    'HJEMME_ELLER_UKJENT',
    'HOVEDTELEFON',
    'FERIETELEFON',
    'MOBILTELEFON',
    'PERSONSOKER',
    'ARBEIDSPLASS_SENTRALBORD',
    'ARBEIDSPLASS_DIREKTENUMMER',
    'ARBEIDSPLASS',
    'TLF',
    'IKKE_OPPGITT',
    'UGYLDIG',
])

export const KontaktinfoSchema = z.object({
    type: KontaktinfoTypeSchema,
    value: z.string(),
})

export const PersonIdTypeSchema = z.enum([
    'FNR',
    'DNR',
    'HNR',
    'HPR',
    'HER',
    'PNR',
    'SEF',
    'DKF',
    'SSN',
    'FPN',
    'XXX',
    'DUF',
    'IKKE_OPPGITT',
    'UGYLDIG',
])

export const PersonIdSchema = z.object({
    id: z.string(),
    type: PersonIdTypeSchema,
})

export const KjonnSchema = z.enum(['MANN', 'KVINNE', 'USPESIFISERT', 'IKKE_OPPGITT', 'UGYLDIG'])

export const PasientSchema = z.object({
    navn: NavnSchema.nullable(),
    navKontor: z.string().nullable(),
    navnFastlege: z.string().nullable(),
    fnr: z.string(),
    kontaktinfo: z.array(KontaktinfoSchema),
})

export const BehandlerSchema = z.object({
    navn: NavnSchema,
    adresse: AdresseSchema.nullable(),
    ids: z.array(PersonIdSchema),
    kontaktinfo: z.array(KontaktinfoSchema),
})

export const HelsepersonellKategoriSchema = z.enum([
    'HELSESEKRETAR',
    'KIROPRAKTOR',
    'LEGE',
    'MANUELLTERAPEUT',
    'TANNLEGE',
    'FYSIOTERAPEUT',
    'SYKEPLEIER',
    'HJELPEPLEIER',
    'HELSEFAGARBEIDER',
    'USPESIFISERT',
    'JORDMOR',
    'AUDIOGRAF',
    'NAPRAPAT',
    'AMBULANSEARBEIDER',
    'PSYKOLOG',
    'FOTTERAPEUT',
    'TANNHELSESEKRETAR',
    'UGYLDIG',
    'IKKE_OPPGITT',
])

export const SykmelderSchema = z.object({
    ids: z.array(PersonIdSchema),
    helsepersonellKategori: HelsepersonellKategoriSchema,
})

export const DiagnoseSystemSchema = z.enum(['ICPC2', 'ICD10', 'ICPC2B', 'PHBU', 'UGYLDIG'])

export const DiagnoseInfoSchema = z.object({
    system: DiagnoseSystemSchema,
    kode: z.string(),
    tekst: z.string().nullable(),
})

export const MedisinskArsakTypeSchema = z.enum([
    'TILSTAND_HINDRER_AKTIVITET',
    'AKTIVITET_FORVERRER_TILSTAND',
    'AKTIVITET_FORHINDRER_BEDRING',
    'ANNET',
])

export const ArbeidsrelatertArsakTypeSchema = z.enum(['MANGLENDE_TILRETTELEGGING', 'ANNET'])

export const AnnenFravarArsakTypeSchema = z.enum([
    'GODKJENT_HELSEINSTITUSJON',
    'BEHANDLING_FORHINDRER_ARBEID',
    'ARBEIDSRETTET_TILTAK',
    'MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND',
    'NODVENDIG_KONTROLLUNDENRSOKELSE',
    'SMITTEFARE',
    'ABORT',
    'UFOR_GRUNNET_BARNLOSHET',
    'DONOR',
    'BEHANDLING_STERILISERING',
])

export const AnnenFraverArsakSchema = z.object({
    beskrivelse: z.string().nullable(),
    arsak: z.array(AnnenFravarArsakTypeSchema).nullable(),
})

export const MedisinskArsakSchema = z.object({
    beskrivelse: z.string().nullable(),
    arsak: z.array(MedisinskArsakTypeSchema),
})

export const ArbeidsrelatertArsakSchema = z.object({
    beskrivelse: z.string().nullable(),
    arsak: z.array(ArbeidsrelatertArsakTypeSchema),
})

export const YrkesskadeSchema = z.object({
    yrkesskadeDato: z.string().nullable(),
})

export const MedisinskVurderingSchema = z.object({
    hovedDiagnose: DiagnoseInfoSchema.nullable(),
    biDiagnoser: z.array(DiagnoseInfoSchema).nullable(),
    svangerskap: z.boolean(),
    yrkesskade: YrkesskadeSchema.nullable(),
    skjermetForPasient: z.boolean(),
    syketilfelletStartDato: z.string().nullable(),
    annenFraversArsak: AnnenFraverArsakSchema.nullable(),
})

export const AktivitetstypeSchema = z.enum([
    'AKTIVITET_IKKE_MULIG',
    'AVVENTENDE',
    'BEHANDLINGSDAGER',
    'GRADERT',
    'REISETILSKUDD',
])

const AktivitetBaseSchema = z.object({
    fom: z.string(),
    tom: z.string(),
})

export const BehandlingsdagerSchema = AktivitetBaseSchema.extend({
    type: z.literal('BEHANDLINGSDAGER'),
    antallBehandlingsdager: z.number(),
})

export const GradertSchema = AktivitetBaseSchema.extend({
    type: z.literal('GRADERT'),
    grad: z.number(),
    reisetilskudd: z.boolean(),
})

export const ReisetilskuddSchema = AktivitetBaseSchema.extend({
    type: z.literal('REISETILSKUDD'),
})

export const AvventendeSchema = AktivitetBaseSchema.extend({
    type: z.literal('AVVENTENDE'),
    innspillTilArbeidsgiver: z.string(),
})

export const AktivitetIkkeMuligSchema = AktivitetBaseSchema.extend({
    type: z.literal('AKTIVITET_IKKE_MULIG'),
    medisinskArsak: MedisinskArsakSchema.nullable(),
    arbeidsrelatertArsak: ArbeidsrelatertArsakSchema.nullable(),
})

export const AktivitetSchema = z.discriminatedUnion('type', [
    BehandlingsdagerSchema,
    GradertSchema,
    ReisetilskuddSchema,
    AvventendeSchema,
    AktivitetIkkeMuligSchema,
])

export const AvsenderSystemSchema = z.object({
    navn: z.string(),
    versjon: z.string(),
})

export const SykmeldingMetaSchema = z.object({
    mottattDato: z.string(),
    genDate: z.string(),
    avsenderSystem: AvsenderSystemSchema,
})

export const SykmeldingBaseSchema = z.object({
    id: z.string(),
    metadata: SykmeldingMetaSchema,
    pasient: PasientSchema,
    medisinskVurdering: MedisinskVurderingSchema,
    aktivitet: z.array(AktivitetSchema),
})

export type SykmeldingBaseType = z.infer<typeof SykmeldingBaseSchema>
