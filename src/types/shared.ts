import dayjs from 'dayjs'
import * as z from 'zod'

export const DateString = z.string().refine((date) => dayjs(date).isValid(), { message: 'Invalid date string' })
