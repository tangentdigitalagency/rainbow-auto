import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  Chip,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
} from "@heroui/react";
import useFormData from "@/data/useFormData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  User,
  Shield,
  Calendar,
  Tag,
  Building,
  Gauge,
  CreditCard,
  AlertTriangle,
  FileText,
  Plus,
  Phone,
  Trash2,
  AlertCircle,
} from "lucide-react";
import Avatar, { genConfig } from "react-nice-avatar";
import { useEffect, useState } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get("userId");
  const { formData, deleteDriverTwo, deleteVehicleTwo, isLoading, refetch } =
    useFormData();
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [isDeleteDriverModalOpen, setIsDeleteDriverModalOpen] = useState(false);
  const [isDeleteVehicleModalOpen, setIsDeleteVehicleModalOpen] =
    useState(false);

  useEffect(() => {
    if (uuid) {
      console.log("Profile: UUID detected, refetching data");
      refetch();
    }
  }, [uuid, refetch]);

  // Function to check if a section has missing required fields
  const getMissingFields = (section: string) => {
    if (isLoading) {
      console.log("Profile: Still loading, skipping missing fields check");
      return [];
    }

    console.log("Profile: Checking missing fields for section:", section);
    const missingFields: string[] = [];

    switch (section) {
      case "personal":
        if (!formData.firstName) missingFields.push("First Name");
        if (!formData.lastName) missingFields.push("Last Name");
        if (!formData.phone) missingFields.push("Phone");
        if (!formData.email) missingFields.push("Email");
        if (!formData.address1) missingFields.push("Address");
        if (!formData.city) missingFields.push("City");
        if (!formData.state) missingFields.push("State");
        if (!formData.zipcode) missingFields.push("ZIP Code");
        break;
      case "driver":
        if (!formData.driverOneFirstName) missingFields.push("First Name");
        if (!formData.driverOneLastName) missingFields.push("Last Name");
        if (!formData.driverOneDOB) missingFields.push("Date of Birth");
        if (!formData.driverOneGender) missingFields.push("Gender");
        if (!formData.driverOneLicenseState)
          missingFields.push("License State");
        if (!formData.driverOneLicenseStatus)
          missingFields.push("License Status");
        if (!formData.driverOneResidence) missingFields.push("Residence");
        if (!formData.driverOneYearAtResidence)
          missingFields.push("Years at Residence");
        break;
      case "vehicle":
        if (!formData.vehicleOneYear) missingFields.push("Year");
        if (!formData.vehicleOneMake) missingFields.push("Make");
        if (!formData.vehicleOneModel) missingFields.push("Model");
        if (!formData.vehicleOneOwnership) missingFields.push("Ownership");
        if (!formData.vehicleOnePrimaryUsage)
          missingFields.push("Primary Usage");
        if (!formData.vehicleOneAnnualMiles) missingFields.push("Annual Miles");
        if (!formData.vehicleOneStorage) missingFields.push("Storage");
        break;
      case "insurance":
        if (!formData.currentlyInsured) missingFields.push("Insurance Status");
        if (formData.currentlyInsured === "Yes" && !formData.currentProvider) {
          missingFields.push("Current Provider");
        }
        if (!formData.requestedCoverageType)
          missingFields.push("Coverage Type");
        break;
      case "policy":
        if (!formData.vehicleOneComprehensive)
          missingFields.push("Vehicle 1 Comprehensive");
        if (!formData.vehicleOneCollision)
          missingFields.push("Vehicle 1 Collision");
        if (formData.vehicleTwoMake) {
          if (!formData.vehicleTwoComprehensive)
            missingFields.push("Vehicle 2 Comprehensive");
          if (!formData.vehicleTwoCollision)
            missingFields.push("Vehicle 2 Collision");
        }
        break;
    }

    console.log("Profile: Missing fields for section:", section, missingFields);
    return missingFields;
  };

  // Function to check if a section is complete
  const isSectionComplete = (section: string) => {
    return getMissingFields(section).length === 0;
  };

  // Function to render warning badge for incomplete sections
  const renderWarningBadge = (section: string) => {
    if (isLoading) {
      console.log("Profile: Still loading, skipping warning badge");
      return null;
    }

    const missingFields = getMissingFields(section);
    if (missingFields.length === 0) return null;

    return (
      <div className="flex flex-col gap-2">
        <div className="relative inline-flex ml-2">
          <Badge
            content={<AlertCircle className="w-3 h-3" />}
            color="warning"
            placement="top-right"
            shape="circle"
            size="sm"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-warning/10">
              <AlertCircle className="w-4 h-4 text-warning" />
            </div>
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2 ml-2">
          {missingFields.map((field, index) => (
            <Badge key={index} color="warning" variant="flat" size="sm">
              {field}
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show bar when scrolled past 10% of the page (changed from 20%)
      setShowBottomBar(scrollPosition > (documentHeight - windowHeight) * 0.1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigateToSection = (section: string) => {
    // Map the section to the correct route path
    const routeMap: { [key: string]: string } = {
      personal: "/personal-information",
      identity: "/identity",
      history: "/history",
      risk: "/risk",
      year: "/car-year",
      make: "/car-make",
      model: "/car-model",
      data: "/vehicle-data",
      usage: "/vehicle-usage",
      insurance: "/current-insurance",
      coverage: "/insurance-details",
      policy: "/policy",
      // Secondary driver routes
      "personal-two": "/personal-information-two",
      "identity-two": "/identity-two",
      "history-two": "/history-two",
      "risk-two": "/risk-two",
      // Secondary vehicle routes
      "year-two": "/car-year-two",
      "make-two": "/car-make-two",
      "model-two": "/car-model-two",
      "data-two": "/vehicle-data-two",
      "usage-two": "/vehicle-usage-two",
    };

    // Get the current userId from URL params
    const currentUserId = searchParams.get("userId");

    // Add both returnTo and userId parameters
    const params = new URLSearchParams();
    params.set("returnTo", "profile");
    if (currentUserId) {
      params.set("userId", currentUserId);
    }

    navigate(`${routeMap[section]}?${params.toString()}`);
  };

  const handleDeleteDriver = async () => {
    try {
      console.log("Starting delete driver operation...");
      await deleteDriverTwo();
      console.log("Delete driver operation completed successfully");
      setIsDeleteDriverModalOpen(false);
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const handleDeleteVehicle = async () => {
    try {
      console.log("Starting delete vehicle operation...");
      await deleteVehicleTwo();
      console.log("Delete vehicle operation completed successfully");
      setIsDeleteVehicleModalOpen(false);
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  // Generate avatar config based on user's name and gender
  const avatarConfig = genConfig({
    sex: formData.driverOneGender?.toLowerCase() === "female" ? "woman" : "man",
    hairStyle:
      formData.driverOneGender?.toLowerCase() === "female"
        ? "womanLong"
        : "normal",
    eyeStyle: "smile",
    mouthStyle: "laugh",
    shirtStyle: "hoody",
    bgColor: "#4f46e5",
    faceColor:
      formData.driverOneGender?.toLowerCase() === "female"
        ? "#f9d5bb"
        : "#f8d25c",
    hairColor:
      formData.driverOneGender?.toLowerCase() === "female"
        ? "#6a4e35"
        : "#2c1810",
  });

  // Add a function to generate a unique background color based on the user's name
  const generateBackgroundColor = (name: string = "") => {
    const colors = [
      "#4f46e5", // Indigo
      "#7c3aed", // Violet
      "#2563eb", // Blue
      "#0891b2", // Cyan
      "#059669", // Emerald
      "#65a30d", // Lime
      "#ca8a04", // Yellow
      "#ea580c", // Orange
      "#dc2626", // Red
      "#db2777", // Pink
    ];

    // Handle null/undefined by using a default value
    const safeName = name || "default";
    // Use the first character of the name to determine the color
    const index = safeName.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  };

  if (isLoading) {
    console.log("Profile: Loading state active, showing spinner");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">
            Loading your information...
          </p>
        </div>
      </div>
    );
  }

  console.log("Profile: Rendering with form data:", formData);

  return (
    <motion.div
      className="space-y-8"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <div className="flex items-center justify-between pb-10">
        <h1 className="text-2xl font-semibold">
          Review Your Information
          <p className="text-sm text-gray-500">
            Please review your information and make any necessary changes.
          </p>
        </h1>
        <Button
          color="primary"
          size="lg"
          variant="shadow"
          onPress={() => navigate("/submitting")}
          isDisabled={
            !isSectionComplete("driver") ||
            !isSectionComplete("vehicle") ||
            !isSectionComplete("insurance")
          }
        >
          Get My Quote!
        </Button>
      </div>

      {/* Drivers Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Drivers</h2>
          </div>
          {!formData.driverTwoFirstName && (
            <Button
              variant="bordered"
              color="primary"
              size="sm"
              startContent={<Plus className="w-4 h-4" />}
            >
              Add Driver
            </Button>
          )}
        </div>
        {renderWarningBadge("driver")}
        <Divider />

        {/* Primary Driver */}
        <motion.div
          className={`p-8 transition-all duration-200 border shadow-sm rounded-xl bg-content1 hover:shadow-lg hover:border-primary/20 ${
            !isSectionComplete("driver") ? "border-warning" : "border-gray-200"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div
                  className="flex items-center justify-center w-20 h-20 overflow-hidden rounded-full ring-4 ring-primary/5"
                  style={{
                    backgroundColor: `${generateBackgroundColor(
                      formData.driverOneFirstName
                    )}20`,
                  }}
                >
                  <Avatar className="w-full h-full" {...avatarConfig} />
                </div>
                <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-success/10 ring-2 ring-content1">
                  <div className="w-3 h-3 rounded-full bg-success" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground">
                  {formData.driverOneFirstName} {formData.driverOneLastName}
                </h3>
                <p className="text-sm text-default-500">{formData.email}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    Primary Driver
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-success/10 text-success">
                    {formData.driverOneLicenseStatus || "Active"} License
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-sm text-gray-600">
              Click any section below to quickly edit your information
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="relative inline-block">
                <Chip
                  variant="flat"
                  color="primary"
                  startContent={<User className="w-4 h-4" />}
                  className="cursor-pointer"
                  onClick={() => handleNavigateToSection("personal")}
                >
                  Personal Information
                </Chip>
                {getMissingFields("personal").length > 0 && (
                  <span className="absolute z-10 flex items-center justify-center p-1 rounded-full -top-1 -right-1 bg-warning">
                    <AlertTriangle className="w-3 h-3 text-black" />
                  </span>
                )}
              </div>
              <div className="relative inline-block">
                <Chip
                  variant="flat"
                  color="secondary"
                  startContent={<CreditCard className="w-4 h-4" />}
                  className="cursor-pointer"
                  onClick={() => handleNavigateToSection("identity")}
                >
                  Identity & History
                </Chip>
                {getMissingFields("identity").length > 0 && (
                  <span className="absolute z-10 flex items-center justify-center p-1 rounded-full -top-1 -right-1 bg-warning">
                    <AlertTriangle className="w-3 h-3 text-black" />
                  </span>
                )}
              </div>
              <div className="relative inline-block">
                <Chip
                  variant="flat"
                  color="warning"
                  startContent={<AlertTriangle className="w-4 h-4" />}
                  className="cursor-pointer"
                  onClick={() => handleNavigateToSection("risk")}
                >
                  Risk Information
                </Chip>
                {getMissingFields("risk").length > 0 && (
                  <span className="absolute z-10 flex items-center justify-center p-1 rounded-full -top-1 -right-1 bg-warning">
                    <AlertTriangle className="w-3 h-3 text-black" />
                  </span>
                )}
              </div>
              <div className="relative inline-block">
                <Chip
                  variant="flat"
                  color="success"
                  startContent={<FileText className="w-4 h-4" />}
                  className="cursor-pointer"
                  onClick={() => handleNavigateToSection("history")}
                >
                  Driving History
                </Chip>
                {getMissingFields("history").length > 0 && (
                  <span className="absolute z-10 flex items-center justify-center p-1 rounded-full -top-1 -right-1 bg-warning">
                    <AlertTriangle className="w-3 h-3 text-black" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary Driver */}
        {formData.driverTwoFirstName && (
          <motion.div
            className="p-8 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl bg-content1 hover:shadow-lg hover:border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div
                    className="flex items-center justify-center w-20 h-20 overflow-hidden rounded-full ring-4 ring-primary/5"
                    style={{
                      backgroundColor: `${generateBackgroundColor(
                        formData.driverTwoFirstName
                      )}20`,
                    }}
                  >
                    <Avatar
                      className="w-full h-full"
                      {...genConfig({
                        sex:
                          formData.driverTwoGender?.toLowerCase() === "female"
                            ? "woman"
                            : "man",
                        hairStyle:
                          formData.driverTwoGender?.toLowerCase() === "female"
                            ? "womanLong"
                            : "normal",
                        eyeStyle: "smile",
                        mouthStyle: "laugh",
                        shirtStyle: "hoody",
                        bgColor: "#4f46e5",
                        faceColor:
                          formData.driverTwoGender?.toLowerCase() === "female"
                            ? "#f9d5bb"
                            : "#f8d25c",
                        hairColor:
                          formData.driverTwoGender?.toLowerCase() === "female"
                            ? "#6a4e35"
                            : "#2c1810",
                      })}
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-success/10 ring-2 ring-content1">
                    <div className="w-3 h-3 rounded-full bg-success" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {formData.driverTwoFirstName} {formData.driverTwoLastName}
                  </h3>
                  <p className="text-sm text-default-500">{formData.email}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      Secondary Driver
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-success/10 text-success">
                      {formData.driverTwoLicenseStatus || "Active"} License
                    </span>
                  </div>
                </div>
              </div>
              <Button
                isIconOnly
                color="danger"
                variant="light"
                onPress={() => setIsDeleteDriverModalOpen(true)}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-sm text-gray-600">
                Click any section below to quickly edit your information
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="relative inline-block">
                  <Chip
                    variant="flat"
                    color="primary"
                    startContent={<User className="w-4 h-4" />}
                    className="cursor-pointer"
                    onClick={() => handleNavigateToSection("personal-two")}
                  >
                    Personal Information
                  </Chip>
                  {getMissingFields("personal-two").length > 0 && (
                    <span className="absolute z-10 flex items-center justify-center p-1 rounded-full -top-1 -right-1 bg-warning">
                      <AlertTriangle className="w-3 h-3 text-black" />
                    </span>
                  )}
                </div>
                <div className="relative inline-block">
                  <Chip
                    variant="flat"
                    color="secondary"
                    startContent={<CreditCard className="w-4 h-4" />}
                    className="cursor-pointer"
                    onClick={() => handleNavigateToSection("identity-two")}
                  >
                    Identity & History
                  </Chip>
                  {getMissingFields("identity-two").length > 0 && (
                    <span className="absolute z-10 flex items-center justify-center p-1 rounded-full -top-1 -right-1 bg-warning">
                      <AlertTriangle className="w-3 h-3 text-black" />
                    </span>
                  )}
                </div>
                <div className="relative inline-block">
                  <Chip
                    variant="flat"
                    color="warning"
                    startContent={<AlertTriangle className="w-4 h-4" />}
                    className="cursor-pointer"
                    onClick={() => handleNavigateToSection("risk-two")}
                  >
                    Risk Information
                  </Chip>
                  {getMissingFields("risk-two").length > 0 && (
                    <span className="absolute z-10 flex items-center justify-center p-1 rounded-full -top-1 -right-1 bg-warning">
                      <AlertTriangle className="w-3 h-3 text-black" />
                    </span>
                  )}
                </div>
                <div className="relative inline-block">
                  <Chip
                    variant="flat"
                    color="success"
                    startContent={<FileText className="w-4 h-4" />}
                    className="cursor-pointer"
                    onClick={() => handleNavigateToSection("history-two")}
                  >
                    Driving History
                  </Chip>
                  {getMissingFields("history-two").length > 0 && (
                    <span className="absolute z-10 flex items-center justify-center p-1 rounded-full -top-1 -right-1 bg-warning">
                      <AlertTriangle className="w-3 h-3 text-black" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Vehicles Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Car className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Vehicles</h2>
          </div>
          {!formData.vehicleTwoMake && (
            <Button
              variant="bordered"
              color="primary"
              size="sm"
              startContent={<Plus className="w-4 h-4" />}
            >
              Add Vehicle
            </Button>
          )}
        </div>
        {renderWarningBadge("vehicle")}
        <Divider />

        {/* Primary Vehicle */}
        <motion.div
          className={`p-8 transition-all duration-200 border shadow-sm rounded-xl bg-content1 hover:shadow-lg hover:border-primary/20 ${
            !isSectionComplete("vehicle") ? "border-warning" : "border-gray-200"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div
                  className="flex items-center justify-center w-20 h-20 overflow-hidden rounded-full ring-4 ring-primary/5"
                  style={{
                    backgroundColor: `${generateBackgroundColor(
                      formData.vehicleOneMake
                    )}20`,
                  }}
                >
                  <Car className="w-12 h-12 text-primary" />
                </div>
                <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-success/10 ring-2 ring-content1">
                  <div className="w-3 h-3 rounded-full bg-success" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground">
                  {formData.vehicleOneYear} {formData.vehicleOneMake}{" "}
                  {formData.vehicleOneModel}
                </h3>
                <p className="text-sm text-default-500">
                  {formData.vehicleOnePrimaryUsage || "Primary Usage"}
                </p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {formData.vehicleOneOwnership || "Ownership"}
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-success/10 text-success">
                    {formData.vehicleOneStorage || "Storage"}
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-warning/10 text-warning">
                    {formData.vehicleOneAnnualMiles
                      ? `${formData.vehicleOneAnnualMiles} miles/year`
                      : "Annual Miles"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-sm text-gray-600">
              Click any section below to quickly edit your vehicle information
            </p>
            <div className="flex flex-wrap gap-3">
              <Chip
                variant="flat"
                color="primary"
                startContent={<Calendar className="w-4 h-4" />}
                className="cursor-pointer"
                onClick={() => handleNavigateToSection("year")}
              >
                Vehicle Year
              </Chip>
              <Chip
                variant="flat"
                color="secondary"
                startContent={<Tag className="w-4 h-4" />}
                className="cursor-pointer"
                onClick={() => handleNavigateToSection("make")}
              >
                Make & Model
              </Chip>
              <Chip
                variant="flat"
                color="warning"
                startContent={<Building className="w-4 h-4" />}
                className="cursor-pointer"
                onClick={() => handleNavigateToSection("data")}
              >
                Ownership & Storage
              </Chip>
              <Chip
                variant="flat"
                color="success"
                startContent={<Gauge className="w-4 h-4" />}
                className="cursor-pointer"
                onClick={() => handleNavigateToSection("usage")}
              >
                Usage & Mileage
              </Chip>
            </div>
          </div>
        </motion.div>

        {/* Secondary Vehicle */}
        {formData.vehicleTwoMake && (
          <motion.div
            className="p-8 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl bg-content1 hover:shadow-lg hover:border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div
                    className="flex items-center justify-center w-20 h-20 overflow-hidden rounded-full ring-4 ring-primary/5"
                    style={{
                      backgroundColor: `${generateBackgroundColor(
                        formData.vehicleTwoMake
                      )}20`,
                    }}
                  >
                    <Car className="w-12 h-12 text-primary" />
                  </div>
                  <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-success/10 ring-2 ring-content1">
                    <div className="w-3 h-3 rounded-full bg-success" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {formData.vehicleTwoYear} {formData.vehicleTwoMake}{" "}
                    {formData.vehicleTwoModel}
                  </h3>
                  <p className="text-sm text-default-500">
                    {formData.vehicleTwoPrimaryUsage || "Primary Usage"}
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {formData.vehicleTwoOwnership || "Ownership"}
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-success/10 text-success">
                      {formData.vehicleTwoStorage || "Storage"}
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-warning/10 text-warning">
                      {formData.vehicleTwoAnnualMiles
                        ? `${formData.vehicleTwoAnnualMiles} miles/year`
                        : "Annual Miles"}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                isIconOnly
                color="danger"
                variant="light"
                onPress={() => setIsDeleteVehicleModalOpen(true)}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-sm text-gray-600">
                Click any section below to quickly edit your vehicle information
              </p>
              <div className="flex flex-wrap gap-3">
                <Chip
                  variant="flat"
                  color="primary"
                  startContent={<Calendar className="w-4 h-4" />}
                  className="cursor-pointer"
                  onClick={() => handleNavigateToSection("year")}
                >
                  Vehicle Year
                </Chip>
                <Chip
                  variant="flat"
                  color="secondary"
                  startContent={<Tag className="w-4 h-4" />}
                  className="cursor-pointer"
                  onClick={() => handleNavigateToSection("make-two")}
                >
                  Make & Model
                </Chip>
                <Chip
                  variant="flat"
                  color="warning"
                  startContent={<Building className="w-4 h-4" />}
                  className="cursor-pointer"
                  onClick={() => handleNavigateToSection("data-two")}
                >
                  Ownership & Storage
                </Chip>
                <Chip
                  variant="flat"
                  color="success"
                  startContent={<Gauge className="w-4 h-4" />}
                  className="cursor-pointer"
                  onClick={() => handleNavigateToSection("usage-two")}
                >
                  Usage & Mileage
                </Chip>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Insurance Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Insurance</h2>
          </div>
        </div>
        {renderWarningBadge("insurance")}
        <Divider />

        <motion.div
          className={`p-8 transition-all duration-200 border shadow-sm rounded-xl bg-content1 hover:shadow-lg hover:border-primary/20 ${
            !isSectionComplete("insurance")
              ? "border-warning"
              : "border-gray-200"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div
                  className="flex items-center justify-center w-20 h-20 overflow-hidden rounded-full ring-4 ring-primary/5"
                  style={{
                    backgroundColor: `${generateBackgroundColor(
                      "insurance"
                    )}20`,
                  }}
                >
                  <Shield className="w-12 h-12 text-primary" />
                </div>
                <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-success/10 ring-2 ring-content1">
                  <div className="w-3 h-3 rounded-full bg-success" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Insurance Coverage
                </h3>
                <p className="text-sm text-default-500">
                  {formData.requestedCoverageType || "Coverage Type"}
                </p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {formData.currentlyInsured === "Yes"
                      ? "Currently Insured"
                      : "Not Insured"}
                  </span>
                  {formData.currentlyInsured === "Yes" && (
                    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-success/10 text-success">
                      {formData.currentProvider}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-sm text-gray-600">
              Click any section below to quickly edit your insurance information
            </p>
            <div className="flex flex-wrap gap-3">
              <Chip
                variant="flat"
                color="primary"
                startContent={<Shield className="w-4 h-4" />}
                className="cursor-pointer"
                onClick={() => handleNavigateToSection("insurance")}
              >
                Current Insurance
              </Chip>
              <Chip
                variant="flat"
                color="secondary"
                startContent={<Shield className="w-4 h-4" />}
                className="cursor-pointer"
                onClick={() => handleNavigateToSection("coverage")}
              >
                Coverage Details
              </Chip>
            </div>
          </div>
        </motion.div>

        <Divider />

        {/* Policy Section */}
        <motion.div
          className={`p-8 transition-all duration-200 border shadow-sm rounded-xl bg-content1 hover:shadow-lg hover:border-primary/20 ${
            !isSectionComplete("policy") ? "border-warning" : "border-gray-200"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div
                  className="flex items-center justify-center w-20 h-20 overflow-hidden rounded-full ring-4 ring-primary/5"
                  style={{
                    backgroundColor: `${generateBackgroundColor("policy")}20`,
                  }}
                >
                  <Shield className="w-12 h-12 text-primary" />
                </div>
                <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-success/10 ring-2 ring-content1">
                  <div className="w-3 h-3 rounded-full bg-success" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Policy Deductibles
                </h3>
                <p className="text-sm text-default-500">
                  {formData.currentlyInsured === "Yes" ? "Current" : "Desired"}{" "}
                  coverage deductibles
                </p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    Vehicle 1: ${formData.vehicleOneComprehensive || "Not Set"}
                    /${formData.vehicleOneCollision || "Not Set"}
                  </span>
                  {formData.vehicleTwoMake && (
                    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-secondary/10 text-secondary">
                      Vehicle 2: $
                      {formData.vehicleTwoComprehensive || "Not Set"}/$
                      {formData.vehicleTwoCollision || "Not Set"}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {renderWarningBadge("policy")}
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-sm text-gray-600">
              {formData.currentlyInsured === "Yes"
                ? "Your current comprehensive and collision deductible amounts"
                : "Select your desired comprehensive and collision deductible amounts"}
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="relative inline-block">
                <Chip
                  variant="flat"
                  color="primary"
                  startContent={<Shield className="w-4 h-4" />}
                  className="cursor-pointer"
                  onClick={() => handleNavigateToSection("policy")}
                >
                  Deductible Preferences
                </Chip>
                {getMissingFields("policy").length > 0 && (
                  <span className="absolute z-10 flex items-center justify-center p-1 rounded-full -top-1 -right-1 bg-warning">
                    <AlertTriangle className="w-3 h-3 text-black" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-between w-full">
          {}
          <Button
            color="primary"
            size="lg"
            variant="shadow"
            className="w-full"
            onPress={() => navigate("/submitting")}
            isDisabled={
              !isSectionComplete("driver") ||
              !isSectionComplete("vehicle") ||
              !isSectionComplete("insurance") ||
              !isSectionComplete("policy")
            }
          >
            Get My Quote!
          </Button>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <AnimatePresence>
        {showBottomBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 border-t border-gray-200 shadow-lg bg-content1"
          >
            <div className="flex items-center justify-between mx-auto max-w-7xl">
              <div>
                <h3 className="text-lg font-semibold">
                  Review Your Information
                </h3>
                <p className="text-sm text-gray-500">
                  Make sure everything looks correct before getting your quote
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="bordered"
                  color="primary"
                  size="lg"
                  startContent={<Phone className="w-4 h-4" />}
                  onPress={() => (window.location.href = "tel:+18005551234")}
                >
                  Call Us
                </Button>
                <Button
                  color="primary"
                  size="lg"
                  variant="shadow"
                  onPress={() => navigate("/submitting")}
                  isDisabled={
                    !isSectionComplete("driver") ||
                    !isSectionComplete("vehicle") ||
                    !isSectionComplete("insurance") ||
                    !isSectionComplete("policy")
                  }
                >
                  Get My Quote!
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add padding to prevent content from being hidden behind the sticky bar */}
      <div className="h-24" />

      {/* Delete Driver Confirmation Modal */}
      <Modal
        isOpen={isDeleteDriverModalOpen}
        onClose={() => setIsDeleteDriverModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Remove Additional Driver</ModalHeader>
          <ModalBody>
            Are you sure you want to remove {formData.driverTwoFirstName}{" "}
            {formData.driverTwoLastName}? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onPress={() => setIsDeleteDriverModalOpen(false)}
              isDisabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={handleDeleteDriver}
              isLoading={isLoading}
            >
              Remove Driver
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Vehicle Confirmation Modal */}
      <Modal
        isOpen={isDeleteVehicleModalOpen}
        onClose={() => setIsDeleteVehicleModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Remove Vehicle</ModalHeader>
          <ModalBody>
            Are you sure you want to remove your {formData.vehicleTwoYear}{" "}
            {formData.vehicleTwoMake} {formData.vehicleTwoModel}? This action
            cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onPress={() => setIsDeleteVehicleModalOpen(false)}
              isDisabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={handleDeleteVehicle}
              isLoading={isLoading}
            >
              Remove Vehicle
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </motion.div>
  );
}
