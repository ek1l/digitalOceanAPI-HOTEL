import { z } from "zod";


export const HotelSchema = z.object({
  name: z.string(),
  description: z.string().nonempty("Description is require"),
  ratingId: z.string().nonempty("RatingId is require"),
  cityId: z.string().nonempty("CityId is require"),
  facilitiesIds: z.array(z.string()),
  conditionIds: z.array(z.string()),
  travelTimeIds: z.array(z.string()),
  sportsIds: z.array(z.string()),
  comment: z.string().nonempty("Comment is require")
});