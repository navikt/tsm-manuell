'use client'

import React, { ReactElement } from 'react'
import { InternalHeader, Link } from '@navikt/ds-react'
import { Select } from '@navikt/ds-react'

import { useModiaContext } from '@/context/modiaContext'

function PageHeader(): ReactElement {
    const { modiaData, aktivEnhet, setAktivEnhet } = useModiaContext()
    return (
        <InternalHeader className="justify-between">
            <InternalHeader.Title as={Link} href="/">Tilbakedateringar</InternalHeader.Title>
            <InternalHeader.Title as={Link} href="/oppgaver">Uløyste oppgåver</InternalHeader.Title>
            <div className="flex flex-wrap items-center">
                {'errorType' in modiaData ? (
                    <InternalHeader.User name="Feil under lasting" description="Klarte ikke å laste enhet" />
                ) : (
                    <>
                        <div data-theme="dark" className="flex items-center">
                            <Select
                                label="Velg enhet"
                                hideLabel
                                size="small"
                                value={aktivEnhet ?? ''}
                                onChange={(event) => {
                                    setAktivEnhet(event.target.value)
                                }}
                            >
                                {modiaData.enheter.map((enhet: { enhetId: string; navn: string }) => (
                                    <option key={enhet.enhetId} value={enhet.enhetId}>
                                        {enhet.enhetId} {enhet.navn}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <InternalHeader.User
                            name={`${modiaData.fornavn} ${modiaData.etternavn}`}
                            description={`Enhet: ${aktivEnhet ?? 'Ingen enhet valgt'}`}
                        />
                    </>
                )}
            </div>
        </InternalHeader>
    )
}

export default PageHeader
