import * as z from 'zod'

import { DateString } from './shared'
import { Sykmelding } from './sykmelding'
import { ValidationResult } from './validationResult'

export const ManuellOppgave = z.object({
    oppgaveid: z.number(),
    sykmelding: Sykmelding,
    mottattDato: DateString,
    personNrPasient: z.string(),
    validationResult: ValidationResult,
    tildeltEnhetsnr: z.string().nullable(),
})

export type ManuellOppgave = z.infer<typeof ManuellOppgave>
