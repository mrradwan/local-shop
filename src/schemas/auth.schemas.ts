import * as z from "zod";

/**
 * --- Regular Expressions ---
 * nameRegex: Supports Arabic and Latin characters plus spaces.
 * passwordRegex: Enforces strong passwords (Upper, Lower, Number, Special Char).
 * phoneRegex: Validates international phone formats.
 */
const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
const phoneRegex = /^\+?[0-9]{10,15}$/;

/**
 * Register Schema
 * Comprehensive validation for user registration.
 * Includes a refinement check to ensure password confirmation matches.
 */
export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name is required." })
      .min(3, { message: "Name must be at least 3 characters." })
      .max(30, { message: "Name cannot exceed 30 characters." })
      .regex(nameRegex, {
        message: "Name can only contain letters and spaces.",
      }),

    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required." })
      .email({ message: "Please enter a valid email address." })
      .max(100, { message: "Email is too long." }),

    password: z
      .string()
      .min(1, { message: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters." })
      .max(30, { message: "Password cannot exceed 30 characters." })
      .regex(passwordRegex, {
        message:
          "Password must contain at least one uppercase, lowercase, number, and special character.",
      }),

    rePassword: z.string().min(1, { message: "Please confirm your password." }),

    phone: z
      .string()
      .trim()
      .min(1, { message: "Phone number is required." })
      .regex(phoneRegex, {
        message: "Please enter a valid phone number (e.g., +201012345678).",
      }),

    terms: z
      .boolean()
      .default(false)
      .refine((val) => val === true, {
        message: "You must agree to the terms and conditions.",
      }),
  })
  /**
   * Cross-field validation:
   * Ensures 'password' and 'rePassword' are identical.
   */
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"], // Sets the error specifically on the rePassword field
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

/**
 * Login Schema
 * Minimal validation required for authenticating existing users.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." })
    .max(100, { message: "Email is too long." }),

  password: z
    .string()
    .min(1, { message: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters." })
    .max(30, { message: "Password cannot exceed 30 characters." })
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase, lowercase, number, and special character.",
    }),

  rememberMe: z.boolean().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;
