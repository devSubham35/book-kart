import { z } from "zod";

export const profileSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^\d+$/, "Phone must contain only numbers"),
    address: z.string().min(5, "Address must be at least 5 characters"),
  });
  