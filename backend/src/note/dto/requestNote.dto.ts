import z from "zod"

export const RequestNoteDto = z.object({
    company: z.string(),
    vacancy: z.string(),
    zp: z.number(),
    status: z.boolean(),
    description: z.string()
})

export type TypeRequestNoteDto = z.infer<typeof RequestNoteDto>