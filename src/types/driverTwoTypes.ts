import { FormData } from "@/types/formData";

export type DriverTwoDetails = Pick<
  FormData,
  | "driverTwoFirstName"
  | "driverTwoLastName"
  | "driverTwoDOB"
  | "driverTwoGender"
  | "driverTwoResidence"
  | "driverTwoYearAtResidence"
  | "driverTwoCredit"
  | "driverTwoRelationship"
  | "driverTwoMaritalStatus"
  | "driverTwoOccupation"
  | "driverTwoAgedLicensed"
  | "driverTwoLicenseState"
  | "driverTwoLicenseStatus"
  | "driverTwoSuspended"
  | "driverTwoFilingRequired"
  | "driverTwoDUI"
  | "driverTwoDUIDate"
  | "driverTwoDUIState"
>;
