import { z } from "zod";

const allowedCharsRegex = /^[!-~]+$/;

const getSchema = (mode: "login" | "register") =>
  z
    .object({
      email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email format"),
      password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(
          allowedCharsRegex,
          "Only letters, numbers, and symbols are allowed"
        ),
      stayLoggedIn: z.boolean().optional(),
      ...(mode === "register" && {
        username: z.string().nonempty("Username is required"),
        confirmPassword: z.string().nonempty("Confirm your password"),
      }),
    })
    .refine(
      (data) => {
        if (mode === "register") {
          return data.password === data.confirmPassword;
        }
        return true;
      },
      {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      }
    );

export default getSchema;
