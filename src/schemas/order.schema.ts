import * as z from "zod";

/**
 * Checkout Schema
 * Validates shipping and contact information during the checkout process.
 * Ensures data compatibility with Egyptian regional formats.
 */
export const checkoutSchema = z.object({
  // Detailed address (Street, Building, etc.)
  details: z.string().min(5, "Address details must be at least 5 characters"),

  /**
   * Phone Validation:
   * Specifically targets Egyptian mobile networks (010, 011, 012, 015).
   * Format: Starts with 01 followed by [0, 1, 2, or 5] and then 8 digits.
   */
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),

  // City selection/input
  city: z.string().min(2, "City is required"),

  // Postal/Zip code for delivery accuracy
  postalCode: z.string().min(2, "Postal code is required"),
});

/**
 * TypeScript Type inferred from the Zod schema.
 * Use this for typing useForm hooks in the Checkout component.
 */
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
