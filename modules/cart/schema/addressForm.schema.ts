import { z } from "zod";

export const addressFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required"),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits"),
    flatHouse: z
      .string()
      .min(1, "Flat/House number is required"),
    area: z
      .string()
      .min(1, "Area/Sector/Locality is required"),
    landmark: z
      .string()
      .optional(),
  });
