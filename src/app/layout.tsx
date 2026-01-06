import { ReactElement, ReactNode } from 'react'
import type { Metadata } from 'next'

import { getModiaContext } from '@/services/modiaService'
import '@/app/globals.css'
import PageHeader from '@/components/header/PageHeader'
import EnhetError from '@/components/header/EnhetError'

import Providers from '../Providers'

export const metadata: Metadata = {
    title: 'TSM manuell',
    description: 'Saksbehandlerfrontend for manuell behandling av tilbakedaterte sykemeldinger.',
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>): Promise<ReactElement> {
    const modiaContext = await getModiaContext()

    return (
        <html lang="no">
            <head>
                <link
                    rel="preload"
                    href="https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <title>TSM manuell</title>
            </head>
            <body className="bg-bg-subtle">
                <Providers modiaContext={modiaContext}>
                    <PageHeader />
                    <main className="mx-auto min-h-screen max-w-3xl bg-white p-8">
                        {'errorType' in modiaContext ? <EnhetError error={modiaContext} /> : children}
                    </main>
                </Providers>
            </body>
        </html>
    )
}
