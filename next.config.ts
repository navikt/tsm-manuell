import { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    serverExternalPackages: ['@navikt/next-logger', 'next-logger', 'pino'],
    experimental: {
        optimizePackageImports: ['@navikt/ds-react'],
    },
    redirects: async () => [
        {
            source: '/',
            destination: '/oppgave/:oppgaveId',
            has: [{ type: 'query', key: 'oppgaveid', value: '(?<oppgaveId>.*)' }],
            permanent: true,
        },
    ],
}

export default nextConfig
