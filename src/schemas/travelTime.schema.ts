import { z } from "zod";

export const travelTimeCreateSchema = z.object({
    travelTime: z.string()
})