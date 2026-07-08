import '../global.css'
import { Metadata } from 'next'
import React, { ReactElement } from 'react'

import ModiaHeader from '../components/modiaheader/ModiaHeader'
import NoEnhetError from '../components/NoEnhetError'
import { getModiaContext } from '../services/modia-service'

import Preload from './_preload'
import Providers from './_providers'

export const metadata: Metadata = {
    title: 'Manuell vurdering av tilbakedatert sykmelding',
    description: 'Intern applikasjon for digitalisering vurdering av tilbakedatert sykmelding',
}

export default async function RootLayout({ children }: LayoutProps<'/'>): Promise<ReactElement> {
    const modiaContext = await getModiaContext()

    return (
        <html lang="no">
            <Preload />
            <Providers modiaContext={modiaContext}>
                <body className="bg-ax-bg-neutral-soft">
                    <ModiaHeader modiaContext={modiaContext} />
                    <main
                        id="maincontent"
                        tabIndex={-1}
                        className="mx-auto min-h-screen max-w-3xl bg-ax-bg-default p-8"
                    >
                        {'errorType' in modiaContext ? <NoEnhetError /> : children}
                    </main>
                </body>
            </Providers>
        </html>
    )
}
