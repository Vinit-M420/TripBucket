import { z } from "zod";

export const UserTripSchema = z.object({
    destination: z.string().min(5).max(20, {message: "Destination is necessary"}),
    to_date: z.string().optional(), // This might expect ISO format
    from_date: z.string().optional(),
    bannerURL: z.string().optional(),
    isPublic: z.boolean().default(false),
}) 

