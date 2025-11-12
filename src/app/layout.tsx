import type { Metadata } from 'next'
import { ReactElement, ReactNode } from 'react'
import '@/app/globals.css'

export const metadata: Metadata = {
    title: 'TSM manuell',
    description: 'Saksbehandlerfrontend for manuell behandling av tilbakedaterte sykemeldinger. ',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>): ReactElement {
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
            <body>{children}</body>
        </html>
    )
}
