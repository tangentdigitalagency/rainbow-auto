import { FormData } from "@/types/formData";
export type VehicleOneDetails = Pick<
  FormData,
  | "vehicleOneYear"
  | "vehicleOneMake"
  | "vehicleOneModel"
  | "vehicleOneTrim"
  | "vehicleOneOwnership"
  | "vehicleOnePrimaryUsage"
  | "vehicleOneOneWayDistance"
  | "vehicleOneAnnualMiles"
  | "vehicleOneStorage"
  | "vehicleOneComprehensive"
  | "vehicleOneCollision"
>;
