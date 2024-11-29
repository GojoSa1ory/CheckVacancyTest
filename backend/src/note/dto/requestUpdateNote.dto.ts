import z from "zod"

export const RequestUpdateNoteDto = z.object({
    id: z.string(),
    company: z.string(),
    vacancy: z.string(),
    zp: z.number(),
    status: z.boolean(),
    description: z.string()
})

export type RequestUpdateNoteDtoType = z.infer<typeof RequestUpdateNoteDto>