import { z } from "zod";

export const signUpSchema = z.object({
  fname: z.string().trim().min(2, "First name must be at least 2 characters."),

  lname: z.string().trim().min(2, "Last name must be at least 2 characters."),

  email: z.string().trim().email("Please enter a valid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),

  terms: z.boolean().refine((value) => value === true, {
    message: "You must accept the Terms and Conditions.",
  }),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
