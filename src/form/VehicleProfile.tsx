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
  Calendar,
  Tag,
  Gauge,
  Building,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import useFormData from "../data/useFormData";
import { useState } from "react";

export default function VehicleProfile() {
  const navigate = useNavigate();
  const { formData, deleteVehicleTwo, isLoading } = useFormData();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Add console logs to debug form data
  console.log("Vehicle Profile Data:", {
    vehicleOne: {
      ownership: formData.vehicleOneOwnership,
      storage: formData.vehicleOneStorage,
      annualMiles: formData.vehicleOneAnnualMiles,
      oneWayDistance: formData.vehicleOneOneWayDistance,
    },
    vehicleTwo: {
      ownership: formData.vehicleTwoOwnership,
      storage: formData.vehicleTwoStorage,
      annualMiles: formData.vehicleTwoAnnualMiles,
      oneWayDistance: formData.vehicleTwoOneWayDistance,
    },
  });

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const handleAddVehicle = () => {
    navigate("/car-year-two");
  };

  const handleContinue = () => {
    navigate("/current-insurance");
  };

  const handleNavigateToSection = (section: string, vehicleNumber: number) => {
    // Map the section to the correct route path
    const routeMap: { [key: string]: string } = {
      year: vehicleNumber === 1 ? "/car-year" : "/car-year-two",
      make: vehicleNumber === 1 ? "/car-make" : "/car-make-two",
      model: vehicleNumber === 1 ? "/car-model" : "/car-model-two",
      data: vehicleNumber === 1 ? "/vehicle-data" : "/vehicle-data-two",
      usage: vehicleNumber === 1 ? "/vehicle-usage" : "/vehicle-usage-two",
    };

    // Add a returnTo parameter to know where to go back to
    navigate(`${routeMap[section]}?returnTo=vehicle-profile`);
  };

  // Add a function to generate a unique background color based on the vehicle make
  const generateBackgroundColor = (make: string = "") => {
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

    // Use the first character of the make to determine the color
    const index = make.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleDeleteVehicle = async () => {
    try {
      console.log("Starting delete operation...");
      await deleteVehicleTwo();
      console.log("Delete operation completed successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const renderVehicleCard = (vehicleNumber: number) => {
    const year =
      vehicleNumber === 1 ? formData.vehicleOneYear : formData.vehicleTwoYear;
    const make =
      vehicleNumber === 1 ? formData.vehicleOneMake : formData.vehicleTwoMake;
    const model =
      vehicleNumber === 1 ? formData.vehicleOneModel : formData.vehicleTwoModel;
    const ownership =
      vehicleNumber === 1
        ? formData.vehicleOneOwnership
        : formData.vehicleTwoOwnership;
    const storage =
      vehicleNumber === 1
        ? formData.vehicleOneStorage
        : formData.vehicleTwoStorage;
    const annualMiles =
      vehicleNumber === 1
        ? formData.vehicleOneAnnualMiles
        : formData.vehicleTwoAnnualMiles;
    const primaryUsage =
      vehicleNumber === 1
        ? formData.vehicleOnePrimaryUsage
        : formData.vehicleTwoPrimaryUsage;

    return (
      <motion.div
        key={vehicleNumber}
        className="p-8 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl bg-content1 hover:shadow-lg hover:border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: vehicleNumber === 2 ? 0.2 : 0 }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div
                className="flex items-center justify-center w-20 h-20 overflow-hidden rounded-full ring-4 ring-primary/5"
                style={{
                  backgroundColor: `${generateBackgroundColor(make)}20`,
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
                {year} {make} {model}
              </h3>
              <p className="text-sm text-default-500">
                {primaryUsage || "Primary Usage"}
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {ownership || "Ownership"}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-success/10 text-success">
                  {storage || "Storage"}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-warning/10 text-warning">
                  {annualMiles ? `${annualMiles} miles/year` : "Annual Miles"}
                </span>
              </div>
            </div>
          </div>
          {vehicleNumber === 2 && (
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
            Click any section below to quickly edit your vehicle information
          </p>
          <div className="flex flex-wrap gap-3">
            <Chip
              variant="flat"
              color="primary"
              startContent={<Calendar className="w-4 h-4" />}
              className="cursor-pointer"
              onClick={() => handleNavigateToSection("year", vehicleNumber)}
            >
              Vehicle Year
            </Chip>
            <Chip
              variant="flat"
              color="secondary"
              startContent={<Tag className="w-4 h-4" />}
              className="cursor-pointer"
              onClick={() => handleNavigateToSection("make", vehicleNumber)}
            >
              Make & Model
            </Chip>
            <Chip
              variant="flat"
              color="warning"
              startContent={<Building className="w-4 h-4" />}
              className="cursor-pointer"
              onClick={() => handleNavigateToSection("data", vehicleNumber)}
            >
              Ownership & Storage
            </Chip>
            <Chip
              variant="flat"
              color="success"
              startContent={<Gauge className="w-4 h-4" />}
              className="cursor-pointer"
              onClick={() => handleNavigateToSection("usage", vehicleNumber)}
            >
              Usage & Mileage
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
          Your Vehicle Profile
          <p className="mb-6 text-sm text-gray-600">
            Review your vehicle information and add any additional vehicles if
            needed.
          </p>
        </h2>
      </div>

      {/* Vehicle Cards */}
      <div className="space-y-6">
        {renderVehicleCard(1)}
        {formData.vehicleTwoMake && renderVehicleCard(2)}
      </div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {!formData.vehicleTwoMake && (
          <Button
            variant="bordered"
            color="primary"
            size="lg"
            className="w-full"
            onPress={handleAddVehicle}
            startContent={<Plus className="w-4 h-4" />}
          >
            Add Another Vehicle
          </Button>
        )}

        <Button
          color="primary"
          size="lg"
          className="w-full"
          onPress={handleContinue}
          endContent={<ArrowRight className="w-4 h-4" />}
        >
          Continue to Insurance Information
        </Button>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
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
              onPress={() => setIsDeleteModalOpen(false)}
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
