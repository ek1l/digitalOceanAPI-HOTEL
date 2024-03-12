import { z } from "zod";

export const conditionCreateSchema = z.object({
    condition: z.string()
})