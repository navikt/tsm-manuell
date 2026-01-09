import { z } from 'zod'

import { SykmeldingBaseSchema } from '@/utils/data-layer/sykmeldingSchema'

export const ManuellOppgaveSchema = z.object({
    oppgaveId: z.number(),
    ident: z.string(),
    sykmelding: SykmeldingBaseSchema,
    ferdigstilt: z.boolean(),
    mottattDato: z.string(),
    status: z.string().nullable(),
    statusTimestamp: z.string().nullable(),
})

export type ManuellOppgaveType = z.infer<typeof ManuellOppgaveSchema>

//TODO i sykmeldingschema så blir vi nødt til å fortsette å utvide basen ved å lage discriminating unions så vi har en endelig
// sykmelding schema med union av XML og digital sykmelding. Samt må lage object av digital og xml som extender base. Sjå AKtivitet.
//  Så skal denne her bruke det endelig sykmeldingSchemaet til slutt også.
