import { FormData } from "@/types/formData";

export type DriverOneDetails = Pick<
  FormData,
  | "driverOneFirstName"
  | "driverOneLastName"
  | "driverOneDOB"
  | "driverOneGender"
  | "driverOneResidence"
  | "driverOneYearAtResidence"
  | "driverOneCredit"
  | "driverOneRelationship"
  | "driverOneMaritalStatus"
  | "driverOneOccupation"
  | "driverOneAgedLicensed"
  | "driverOneLicenseState"
  | "driverOneLicenseStatus"
  | "driverOneSuspended"
  | "driverOneFilingRequired"
  | "driverOneDUI"
  | "driverOneDUIDate"
  | "driverOneDUIState"
>;
