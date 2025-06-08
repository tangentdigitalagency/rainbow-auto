import { useNavigate } from "react-router-dom";
import { Button, Chip, Divider } from "@heroui/react";
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
} from "lucide-react";
import Avatar, { genConfig } from "react-nice-avatar";
import { useEffect, useState } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const { formData } = useFormData();
  const [showBottomBar, setShowBottomBar] = useState(false);

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
    };

    // Add a returnTo parameter to know where to go back to
    navigate(`${routeMap[section]}?returnTo=profile`);
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

    // Use the first character of the name to determine the color
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  };

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
        <Divider />

        {/* Primary Driver */}
        <motion.div
          className="p-8 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl bg-content1 hover:shadow-lg hover:border-primary/20"
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
              <Chip
                variant="flat"
                color="primary"
                startContent={<User className="w-4 h-4" />}
                className="cursor-pointer"
                onClick={() => handleNavigateToSection("personal")}
              >
                Personal Information
              </Chip>
              <Chip
                variant="flat"
                color="secondary"
                startContent={<CreditCard className="w-4 h-4" />}
                className="cursor-pointer"
                onClick={() => handleNavigateToSection("identity")}
              >
                Identity & History
              </Chip>
              <Chip
                variant="flat"
                color="warning"
                startContent={<AlertTriangle className="w-4 h-4" />}
                className="cursor-pointer"
                onClick={() => handleNavigateToSection("risk")}
              >
                Risk Information
              </Chip>
              <Chip
                variant="flat"
                color="success"
                startContent={<FileText className="w-4 h-4" />}
                className="cursor-pointer"
                onClick={() => handleNavigateToSection("history")}
              >
                Driving History
              </Chip>
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
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-sm text-gray-600">
                Click any section below to quickly edit your information
              </p>
              <div className="flex flex-wrap gap-3">
                <Chip
                  variant="flat"
                  color="primary"
                  startContent={<User className="w-4 h-4" />}
                  className="cursor-pointer"
                  onClick={() => handleNavigateToSection("personal")}
                >
                  Personal Information
                </Chip>
                <Chip
                  variant="flat"
                  color="secondary"
                  startContent={<CreditCard className="w-4 h-4" />}
                  className="cursor-pointer"
                  onClick={() => handleNavigateToSection("identity")}
                >
                  Identity & History
                </Chip>
                <Chip
                  variant="flat"
                  color="warning"
                  startContent={<AlertTriangle className="w-4 h-4" />}
                  className="cursor-pointer"
                  onClick={() => handleNavigateToSection("risk")}
                >
                  Risk Information
                </Chip>
                <Chip
                  variant="flat"
                  color="success"
                  startContent={<FileText className="w-4 h-4" />}
                  className="cursor-pointer"
                  onClick={() => handleNavigateToSection("history")}
                >
                  Driving History
                </Chip>
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
        <Divider />

        {/* Primary Vehicle */}
        <motion.div
          className="p-8 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl bg-content1 hover:shadow-lg hover:border-primary/20"
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
        <Divider />

        <motion.div
          className="p-8 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl bg-content1 hover:shadow-lg hover:border-primary/20"
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

        <div className="flex justify-between w-full">
          <Button
            color="primary"
            size="lg"
            variant="shadow"
            className="w-full"
            onPress={() => navigate("/submitting")}
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
    </motion.div>
  );
}
