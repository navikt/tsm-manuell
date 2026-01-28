import { z } from 'zod'

export const SaksbehandlersVurderingStatusSchema = z.enum([
    'GODKJENT',
    'UGYLDIG_TILBAKEDATERING',
    'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER',
    'DELVIS_GODKJENT',
])

export type SaksbehandlersVurderingStatus = z.infer<typeof SaksbehandlersVurderingStatusSchema>

export const MerknadSchema = z.object({
    type: z.string(),
    beskrivelse: z.string().nullable(),
})

export const SaksbehandlersVurderingSchema = z.object({
    status: SaksbehandlersVurderingStatusSchema,
    merknad: MerknadSchema.nullable(),
})

export type SaksbehandlersVurderingType = z.infer<typeof SaksbehandlersVurderingSchema>