import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must not be more than 20 characters")
  .regex(
    /^[a-zA-Z0-9._]+$/,
    "Username must contain only letters, numbers, . and _"
  );

export const signUpSchema = z.object({
  username: usernameValidation,

  email: z.email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters"),
});