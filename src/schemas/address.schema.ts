import { z } from "zod";

export const countrySchema = z.object({
    name: z.string().min(3, "Name is require.")
})

export const stateSchema = countrySchema.extend({
    countryId: z.number().min(1)
})