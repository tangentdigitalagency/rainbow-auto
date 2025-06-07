import { FormData } from "@/types/formData";
export type PersonalInfo = Pick<
  FormData,
  | "firstName"
  | "lastName"
  | "phone"
  | "email"
  | "address1"
  | "address2"
  | "city"
  | "state"
  | "zipcode"
>;
