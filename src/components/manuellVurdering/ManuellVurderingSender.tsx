'use client'
import { ReactElement, useState } from 'react'
import { BodyShort, Button, ExpansionCard, Heading, Radio, RadioGroup } from '@navikt/ds-react'
import { useRouter } from 'next/navigation'

import { useModiaContext } from '@/context/modiaContext'
import { sendManuellVurdering } from '@/services/oppgaveService'
import { bundledEnv } from '@/utils/env'
import { SaksbehandlersVurderingStatus } from '@/utils/data-layer/saksbehandlersVurderingSchema'

type Props = {
    oppgaveId: string
}

export function ManuellVurderingSender({ oppgaveId }: Props): ReactElement {
    const { aktivEnhet } = useModiaContext()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [vurdering, setVurdering] = useState<SaksbehandlersVurderingStatus | null>(null)
    const [formError, setFormError] = useState<string | null>(null)

    const handleSendVurdering = async (): Promise<void> => {
        setLoading(true)
        setError(null)
        setFormError(null)

        if (!vurdering) {
            setFormError('Oppgåva manglar ei vurdering')
            setLoading(false)
            return
        }

        if (!aktivEnhet) {
            setError('Manglar valgt eining')
            setLoading(false)
            return
        }

        try {
            await sendManuellVurdering(oppgaveId, { status: vurdering}, aktivEnhet)
            router.push('/kvittering')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Noko gjekk gale')
        } finally {
            setLoading(false)
        }
    }
    return (
        <form>
            <RadioGroup
                legend="Velg ei vurdering"
                value={vurdering}
                onChange={(val: SaksbehandlersVurderingStatus) => {
                    setVurdering(val)
                    setFormError(null)
                }}
                required
                error={formError}
            >
                <Radio value="GODKJENT">Godkjenn heile sjukmeldinga</Radio>
                <Radio value="DELVIS_GODKJENT">Godkjenn delar av sjukmeldinga</Radio>
                {vurdering === 'DELVIS_GODKJENT' && (
                    <InfoTilBehandlerOgPasient>
                        <BodyShort>
                            Vanligvis starter sykmeldingen den datoen du er hos behandleren. I enkelte tilfeller kan
                            datoen i sykmeldingen settes tilbake i tid, det vi kaller tilbakedatering. NAV vurderer om
                            det er en gyldig grunn for tilbakedateringen. Sykmeldingen din startet før du oppsøkte
                            behandleren, og det er ikke oppgitt noen gyldig grunn. Derfor vil du ikke få sykepenger for
                            disse dagene. Du kan likevel sende inn sykmeldingen. Når perioden er over, sender du
                            søknaden om sykepenger. Når søknaden er behandlet, vil du få en begrunnelse for hvorfor du
                            ikke kan få sykepenger for de tilbakedaterte dagene, og du får samtidig mulighet til å
                            klage.
                        </BodyShort>
                    </InfoTilBehandlerOgPasient>
                )}
                <Radio value="TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER">Naudsynt med fleire opplysningar</Radio>
                {vurdering === 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER' && (
                    <InfoTilBehandlerOgPasient>
                        <BodyShort>
                            Sykmeldingen din starter tidligere enn den dagen du var hos behandleren. Vi innhenter
                            opplysninger om hvorfor sykmeldingen er tilbakedatert. Du kan likevel sende inn søknaden om
                            sykepenger.
                        </BodyShort>
                    </InfoTilBehandlerOgPasient>
                )}
                <Radio value="UGYLDIG_TILBAKEDATERING">Avslå heile sjukmeldinga som ugyldig</Radio>
                {vurdering === 'UGYLDIG_TILBAKEDATERING' && (
                    <InfoTilBehandlerOgPasient>
                        <BodyShort>
                            Sykmeldingen din starter før du oppsøkte lege. Perioden før du oppsøkte lege er
                            tilbakedatert, og det er ikke oppgitt noen gyldig grunn til dette. Du vil derfor ikke få
                            sykepenger for denne perioden. Sykmeldingen er godkjent fra tidspunktet du oppsøkte lege. Du
                            kan sende inn sykmeldingen nederst på siden, og deretter søknad om sykepenger. Når du har
                            sendt inn søknaden, vil vi vurdere om du har rett til sykepenger for den delen av
                            sykmeldingen som er godkjent. Du vil da få et skriftlig vedtak med nærmere begrunnelse og
                            informasjon om klagemuligheter.
                        </BodyShort>
                    </InfoTilBehandlerOgPasient>
                )}
            </RadioGroup>

            <div className="flex gap-4">
                <Button onClick={handleSendVurdering} loading={loading}>
                    Registrer
                </Button>
                <Button as="a" variant="secondary" href={bundledEnv.NEXT_PUBLIC_GOSYS_URL}>
                    Avbryt
                </Button>
            </div>
            {error && <p style={{ color: 'red', marginTop: '1rem' }}>Feil: {error}</p>}
        </form>
    ) //return type er egentlig berre status, kva skal ein bruke
}

export function InfoTilBehandlerOgPasient({ children }: { children: ReactElement }): ReactElement {
    return (
        <ExpansionCard aria-labelledby="hva-vi-sier-til-pasienten" size="small">
            <ExpansionCard.Header>
                <ExpansionCard.Title id="hva-vi-sier-til-pasienten">Sjå kva vi seie til pasienten</ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Heading size="small" level="4" spacing>
                    Beskjed til pasienten
                </Heading>
                {children}
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}
