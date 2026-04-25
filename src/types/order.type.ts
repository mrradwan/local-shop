import { Session } from "next-auth";

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}

export type CustomSession = Omit<Session, "token"> & {
  token?: string;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
};