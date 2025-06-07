import { FormData } from "@/types/formData";

export type VehicleTwoDetails = Pick<
  FormData,
  | "vehicleTwoYear"
  | "vehicleTwoMake"
  | "vehicleTwoModel"
  | "vehicleTwoTrim"
  | "vehicleTwoOwnership"
  | "vehicleTwoPrimaryUsage"
  | "vehicleTwoOneWayDistance"
  | "vehicleTwoAnnualMiles"
  | "vehicleTwoStorage"
  | "vehicleTwoComprehensive"
  | "vehicleTwoCollision"
>;
