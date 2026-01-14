import { z } from 'zod'


export const UlostOppgaveSchema = z.object({
    oppgaveId: z.number(),
    mottattDato: z.string(),
    status: z.string(),
})

export const UlosteOppgaverSchema = z.array(UlostOppgaveSchema)

export type UlosteOppgaveType = z.infer<typeof UlostOppgaveSchema>
export type UlosteOppgaverType = z.infer<typeof UlosteOppgaverSchema>
