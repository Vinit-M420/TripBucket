import { z } from "zod";

export const TripContentSchema = z.object({
    type: z.string(),
    title: z.string().optional(),
    value: z.string()
})