export interface FormData {
  uuid?: string; //done
  userId?: string; //done

  firstName?: string; //done
  lastName?: string; //done
  phone?: string; //done
  email?: string; //done
  address1?: string; //done
  address2?: string; //done
  city?: string; //done
  state?: string; //done
  zipcode?: number; //done

  driverOneFirstName?: string; //done
  driverOneLastName?: string; //done
  driverOneDOB?: Date; // ISO date string
  driverOneGender?: string; //done
  driverOneResidence?: string; //done
  driverOneYearAtResidence?: string; //done
  driverOneCredit?: string; // done
  driverOneRelationship?: string; //done
  driverOneMaritalStatus?: string; //done
  driverOneOccupation?: string; //done
  driverOneAgedLicensed?: string; // done
  driverOneLicenseState?: string; //done
  driverOneLicenseStatus?: string; //done
  driverOneSuspended?: string; //done
  driverOneFilingRequired?: string; //done
  driverOneDUI?: string; //done
  driverOneDUIDate?: string; // ISO date string
  driverOneDUIState?: string;

  additionalDrivers?: boolean;

  currentlyInsured?: string;
  currentProvider?: string;
  bodily?: string;
  property?: string;
  requestedCoverageType?: string;
  vehicleOneComprehensive?: string;
  vehicleOneCollision?: string;

  vehicleOneYear?: string; //done
  vehicleOneMake?: string; //done
  vehicleOneModel?: string; //done
  vehicleOneTrim?: string;
  vehicleOneOwnership?: string; //done
  vehicleOnePrimaryUsage?: string; //done
  vehicleOneOneWayDistance?: string; //done
  vehicleOneAnnualMiles?: string; //done
  vehicleOneStorage?: string; //done
  vehicleOneSecurity?: string; //done

  ipAddress?: string;
  userAgent?: string;
  sourceUrl?: string;
  tcpa?: string;
  tcpaText?: string;
  subId?: string;

  driverTwoFirstName?: string;
  driverTwoLastName?: string;
  driverTwoDOB?: string;
  driverTwoGender?: string;
  driverTwoResidence?: string;
  driverTwoYearAtResidence?: string;
  driverTwoCredit?: string;
  driverTwoRelationship?: string;
  driverTwoMaritalStatus?: string;
  driverTwoOccupation?: string;
  driverTwoAgedLicensed?: string;
  driverTwoLicenseState?: string;
  driverTwoLicenseStatus?: string;
  driverTwoSuspended?: string;
  driverTwoFilingRequired?: string;
  driverTwoDUI?: string;
  driverTwoDUIDate?: string;
  driverTwoDUIState?: string;

  vehicleTwoYear?: string;
  vehicleTwoMake?: string;
  vehicleTwoModel?: string;
  vehicleTwoTrim?: string;
  vehicleTwoOwnership?: string;
  vehicleTwoPrimaryUsage?: string;
  vehicleTwoOneWayDistance?: string;
  vehicleTwoAnnualMiles?: string;
  vehicleTwoStorage?: string;
  vehicleTwoComprehensive?: string;
  vehicleTwoCollision?: string;

  lastCompletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  lastCompletedStep?: string;
}
