import { z } from 'zod'

export const StatusSchema = z.enum([
    'GODKJENT',
    'UGYLDIG_TILBAKEDATERING',
    'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER',
    'DELVIS_GODKJENT',
])

export type SaksbehandlersVurderingStatus = z.infer<typeof StatusSchema>

export const SaksbehandlersVurderingSchema = z.object({
    status: StatusSchema,
})

export type SaksbehandlersVurderingType = z.infer<typeof SaksbehandlersVurderingSchema>
