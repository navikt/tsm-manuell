import * as z from 'zod'

export type BundledEnv = z.infer<typeof bundledEnvSchema>
const bundledEnvSchema = z.object({
    NEXT_PUBLIC_RUNTIME_ENV: z.union([
        z.literal('demo'),
        z.literal('dev'),
        z.literal('production'),
        z.literal('local'),
    ]),
    NEXT_PUBLIC_MODIA_URL: z.string(),
    NEXT_PUBLIC_ASSET_PREFIX: z.string().optional(),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>
export const serverEnvSchema = z.object({
    MODIA_CONTEXT_SCOPE: z.string(),
    MODIA_CONTEXT_URL: z.string(),
    // Provided my nais
    AZURE_APP_CLIENT_ID: z.string(),
    AZURE_APP_CLIENT_SECRET: z.string(),
    AZURE_OPENID_CONFIG_TOKEN_ENDPOINT: z.string(),
    AZURE_APP_WELL_KNOWN_URL: z.string(),
    AZURE_APP_PRE_AUTHORIZED_APPS: z.string(),
})

export const bundledEnv = bundledEnvSchema.parse({
    NEXT_PUBLIC_RUNTIME_ENV: process.env.NEXT_PUBLIC_RUNTIME_ENV,
    NEXT_PUBLIC_MODIA_URL: process.env.NEXT_PUBLIC_MODIA_URL,
    NEXT_PUBLIC_ASSET_PREFIX: process.env.NEXT_PUBLIC_ASSET_PREFIX,
} satisfies Record<keyof BundledEnv, string | undefined>)

const getRawServerConfig = (): Partial<unknown> =>
    ({
        MODIA_CONTEXT_SCOPE: process.env.MODIA_CONTEXT_SCOPE,
        MODIA_CONTEXT_URL: process.env.MODIA_CONTEXT_URL,
        // Provided by nais
        AZURE_APP_CLIENT_ID: process.env.AZURE_APP_CLIENT_ID,
        AZURE_APP_CLIENT_SECRET: process.env.AZURE_APP_CLIENT_SECRET,
        AZURE_OPENID_CONFIG_TOKEN_ENDPOINT: process.env.AZURE_OPENID_CONFIG_TOKEN_ENDPOINT,
        AZURE_APP_WELL_KNOWN_URL: process.env.AZURE_APP_WELL_KNOWN_URL,
        AZURE_APP_PRE_AUTHORIZED_APPS: process.env.AZURE_APP_PRE_AUTHORIZED_APPS,
    }) satisfies Record<keyof ServerEnv, string | undefined>

/**
 * Server envs are lazy loaded and verified using Zod.
 */
export function getServerEnv(): ServerEnv & BundledEnv {
    return { ...serverEnvSchema.parse(getRawServerConfig()), ...bundledEnvSchema.parse(bundledEnv) }
}

export const isLocalOrDemo = process.env.NODE_ENV !== 'production' || bundledEnv.NEXT_PUBLIC_RUNTIME_ENV === 'demo'
