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
