import { useNavigate } from "react-router-dom";
import { Button, Chip } from "@heroui/react";
import {
  Plus,
  Car,
  Calendar,
  Tag,
  Gauge,
  Building,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import useFormData from "../data/useFormData";

export default function VehicleProfile() {
  const navigate = useNavigate();
  const { formData } = useFormData();

  // Add console logs to debug form data
  console.log("Vehicle Profile Data:", {
    ownership: formData.vehicleOneOwnership,
    storage: formData.vehicleOneStorage,
    annualMiles: formData.vehicleOneAnnualMiles,
    oneWayDistance: formData.vehicleOneOneWayDistance,
  });

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const handleAddVehicle = () => {
    // TODO: Implement add vehicle logic
    console.log("Add vehicle clicked");
  };

  const handleContinue = () => {
    navigate("/vehicle-mileage");
  };

  const handleNavigateToSection = (section: string) => {
    // Map the section to the correct route path
    const routeMap: { [key: string]: string } = {
      year: "/car-year",
      make: "/car-make",
      model: "/car-model",
      data: "/vehicle-data",
      usage: "/vehicle-usage",
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

      {/* Vehicle Profile Card */}
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
          onPress={handleAddVehicle}
          startContent={<Plus className="w-4 h-4" />}
        >
          Add Another Vehicle
        </Button>

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
    </motion.div>
  );
}
