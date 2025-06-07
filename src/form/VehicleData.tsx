import { useRef } from "react";
import { useForm, Controller, Control } from "react-hook-form";
import { Button, Select, SelectItem } from "@heroui/react";
import useFormData from "@/data/useFormData";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

type VehicleUsageData = {
  vehicleOneOwnership: string;
  vehicleOneSecurity: string;
  vehicleOneStorage: string;
};

const vehicleOwnershipOptions = ["Financed", "Leased", "Owned"];

const vehicleSecurityOptions = [
  "Audible Alarm",
  "LojackOrGPS",
  "Tracking",
  "No Alarm",
  "OnStar",
];

const vehicleStorageOptions = [
  "Private Garage",
  "Parking Garage",
  "Driveway",
  "Parking Lot",
  "Street",
];

type SelectFieldProps = {
  control: Control<VehicleUsageData>;
  name: keyof VehicleUsageData;
  label: string;
  options: string[];
  placeholder: string;
};

const SelectField = ({
  control,
  name,
  label,
  options,
  placeholder,
}: SelectFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: `${label} is required` }}
      render={({ field }) => (
        <Select
          {...field}
          label={label}
          placeholder={placeholder}
          selectedKeys={field.value ? [field.value] : []}
          onChange={(e) => field.onChange(e.target.value)}
        >
          {options.map((option) => (
            <SelectItem key={option}>{option}</SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default function VehicleData() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, updateFormData } = useFormData();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<VehicleUsageData>({
    defaultValues: {
      vehicleOneOwnership: formData.vehicleOneOwnership || "",
      vehicleOneSecurity: formData.vehicleOneSecurity || "",
      vehicleOneStorage: formData.vehicleOneStorage || "",
    },
  });

  const onSubmit = (data: VehicleUsageData) => {
    console.log("VehicleData onSubmit:", data);
    updateFormData({
      ...data,
      lastCompletedStep: "vehicle-data",
    });

    // Check for returnTo parameter
    const searchParams = new URLSearchParams(location.search);
    const returnTo = searchParams.get("returnTo");

    if (returnTo) {
      navigate(`/${returnTo}`);
    } else {
      navigate("/vehicle-usage");
    }
  };

  const handleBack = () => {
    navigate("/car-model");
  };

  const fadeIn = {
    initial: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2 className="mb-2 text-2xl font-semibold">
        How do you use and store your {formData.vehicleOneMake}{" "}
        {formData.vehicleOneModel}?
        <p className="mb-6 text-sm text-gray-600">
          A few quick questions about ownership, security, and where your car
          sleeps at night.
        </p>
      </h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <SelectField
          control={control}
          name="vehicleOneOwnership"
          label="Vehicle Ownership"
          options={vehicleOwnershipOptions}
          placeholder="Select ownership type"
        />

        <SelectField
          control={control}
          name="vehicleOneSecurity"
          label="Vehicle Security"
          options={vehicleSecurityOptions}
          placeholder="Select security features"
        />

        <SelectField
          control={control}
          name="vehicleOneStorage"
          label="Vehicle Storage"
          options={vehicleStorageOptions}
          placeholder="Select storage location"
        />

        <motion.div
          className="flex justify-between space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Button
            type="button"
            variant="ghost"
            color="default"
            size="lg"
            onPress={handleBack}
            startContent={<ChevronLeft className="w-4 h-4" />}
          >
            Back
          </Button>
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="flex-grow"
            endContent={<ChevronRight className="ml-2" />}
            isLoading={isSubmitting}
          >
            Continue
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
