import { useNavigate } from "react-router-dom";
import { Button, Chip } from "@heroui/react";
import {
  Plus,
  Car,
  User,
  CreditCard,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import useFormData from "../data/useFormData";
import Avatar, { genConfig } from "react-nice-avatar";

export default function Drivers() {
  const navigate = useNavigate();
  const { formData } = useFormData();

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const handleAddDriver = () => {
    // TODO: Implement add driver logic
    console.log("Add driver clicked");
  };

  const handleContinue = () => {
    navigate("/car-year");
  };

  const handleNavigateToSection = (section: string) => {
    // Map the section to the correct route path
    const routeMap: { [key: string]: string } = {
      personal: "/personal-information",
      identity: "/identity",
      history: "/history",
      risk: "/risk",
    };

    // Add a returnTo parameter to know where to go back to
    navigate(`${routeMap[section]}?returnTo=drivers`);
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

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div>
        <h2 className="mb-2 text-2xl font-semibold">
          Your Driver Profile
          <p className="mb-6 text-sm text-gray-600">
            Review your information and add any additional drivers if needed.
          </p>
        </h2>
      </div>

      {/* Driver Profile Card */}
      <motion.div
        className="p-8 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl bg-content1 hover:shadow-lg hover:border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div
                className="flex items-center justify-center w-20 h-20 overflow-hidden rounded-full ring-4 ring-primary/5"
                style={{
                  backgroundColor: `${generateBackgroundColor(
                    formData.firstName
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
                {formData.firstName} {formData.lastName}
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

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="bordered"
          color="primary"
          size="lg"
          className="w-full"
          onPress={handleAddDriver}
          startContent={<Plus className="w-4 h-4" />}
        >
          Add Another Driver
        </Button>

        <Button
          color="primary"
          size="lg"
          className="w-full"
          onPress={handleContinue}
          endContent={<Car className="w-4 h-4" />}
        >
          Continue to Vehicle Information
        </Button>
      </motion.div>
    </motion.div>
  );
}
