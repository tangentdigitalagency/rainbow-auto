import { useNavigate } from "react-router-dom";
import {
  Button,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import {
  Plus,
  Car,
  User,
  CreditCard,
  AlertTriangle,
  FileText,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import useFormData from "../data/useFormData";
import Avatar, { genConfig } from "react-nice-avatar";
import { useState } from "react";

export default function Drivers() {
  const navigate = useNavigate();
  const { formData, deleteDriverTwo, isLoading } = useFormData();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const handleAddDriver = () => {
    navigate("/personal-information-two");
  };

  const handleContinue = () => {
    navigate("/car-year");
  };

  const handleDeleteDriver = async () => {
    try {
      console.log("Starting delete operation...");
      await deleteDriverTwo();
      console.log("Delete operation completed successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const handleNavigateToSection = (section: string, driverNumber: number) => {
    // Map the section to the correct route path
    const routeMap: { [key: string]: string } = {
      personal:
        driverNumber === 1
          ? "/personal-information"
          : "/personal-information-two",
      identity: driverNumber === 1 ? "/identity" : "/identity-two",
      history: driverNumber === 1 ? "/history" : "/history-two",
      risk: driverNumber === 1 ? "/risk" : "/risk-two",
    };

    // Add a returnTo parameter to know where to go back to
    navigate(`${routeMap[section]}?returnTo=drivers`);
  };

  // Generate avatar config based on user's name and gender
  const generateAvatarConfig = (driverNumber: number) => {
    const gender =
      driverNumber === 1 ? formData.driverOneGender : formData.driverTwoGender;

    return genConfig({
      sex: gender?.toLowerCase() === "female" ? "woman" : "man",
      hairStyle: gender?.toLowerCase() === "female" ? "womanLong" : "normal",
      eyeStyle: "smile",
      mouthStyle: "laugh",
      shirtStyle: "hoody",
      bgColor: "#4f46e5",
      faceColor: gender?.toLowerCase() === "female" ? "#f9d5bb" : "#f8d25c",
      hairColor: gender?.toLowerCase() === "female" ? "#6a4e35" : "#2c1810",
    });
  };

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

  const renderDriverCard = (driverNumber: number) => {
    const firstName =
      driverNumber === 1
        ? formData.driverOneFirstName
        : formData.driverTwoFirstName;
    const lastName =
      driverNumber === 1
        ? formData.driverOneLastName
        : formData.driverTwoLastName;
    const email = driverNumber === 1 ? formData.email : formData.driverTwoEmail;
    const licenseStatus =
      driverNumber === 1
        ? formData.driverOneLicenseStatus
        : formData.driverTwoLicenseStatus;

    return (
      <motion.div
        key={driverNumber}
        className="p-8 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl bg-content1 hover:shadow-lg hover:border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: driverNumber === 2 ? 0.2 : 0 }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div
                className="flex items-center justify-center w-20 h-20 overflow-hidden rounded-full ring-4 ring-primary/5"
                style={{
                  backgroundColor: `${generateBackgroundColor(firstName)}20`,
                }}
              >
                <Avatar
                  className="w-full h-full"
                  {...generateAvatarConfig(driverNumber)}
                />
              </div>
              <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-success/10 ring-2 ring-content1">
                <div className="w-3 h-3 rounded-full bg-success" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground">
                {firstName} {lastName}
              </h3>
              <p className="text-sm text-default-500">{email}</p>
              <div className="flex items-center mt-2 space-x-2">
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {driverNumber === 1 ? "Primary Driver" : "Additional Driver"}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-success/10 text-success">
                  {licenseStatus || "Active"} License
                </span>
              </div>
            </div>
          </div>
          {driverNumber === 2 && (
            <Button
              isIconOnly
              color="danger"
              variant="light"
              onPress={() => setIsDeleteModalOpen(true)}
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          )}
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
              onClick={() => handleNavigateToSection("personal", driverNumber)}
            >
              Personal Information
            </Chip>
            <Chip
              variant="flat"
              color="secondary"
              startContent={<CreditCard className="w-4 h-4" />}
              className="cursor-pointer"
              onClick={() => handleNavigateToSection("identity", driverNumber)}
            >
              Identity & History
            </Chip>
            <Chip
              variant="flat"
              color="warning"
              startContent={<AlertTriangle className="w-4 h-4" />}
              className="cursor-pointer"
              onClick={() => handleNavigateToSection("risk", driverNumber)}
            >
              Risk Information
            </Chip>
            <Chip
              variant="flat"
              color="success"
              startContent={<FileText className="w-4 h-4" />}
              className="cursor-pointer"
              onClick={() => handleNavigateToSection("history", driverNumber)}
            >
              Driving History
            </Chip>
          </div>
        </div>
      </motion.div>
    );
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

      {/* Driver Cards */}
      <div className="space-y-6">
        {renderDriverCard(1)}
        {formData.driverTwoFirstName && renderDriverCard(2)}
      </div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {!formData.driverTwoFirstName && (
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
        )}

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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
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
              onPress={() => setIsDeleteModalOpen(false)}
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
    </motion.div>
  );
}
