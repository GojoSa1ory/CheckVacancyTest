import z from "zod";

export const ResponseNoteDto = z.object({
    id: z.string(),
    company: z.string(),
    vacancy: z.string(),
    zp: z.number(),
    status: z.boolean(),
    description: z.string()
})

export type ResponseNoteDtoType = z.infer<typeof ResponseNoteDto>