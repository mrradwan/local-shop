import * as z from "zod";

export const checkoutSchema = z.object({
  details: z.string().min(5, "Address details must be at least 5 characters"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(2, "Postal code is required"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;