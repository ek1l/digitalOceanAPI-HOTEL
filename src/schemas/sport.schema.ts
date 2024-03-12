import { z } from "zod";

export const sportCreateSchema = z.object({
    sport: z.string()
})