import { useRef } from "react";
import { useForm, Controller, Control } from "react-hook-form";
import { Button, Select, SelectItem, Input } from "@heroui/react";
import useFormData from "@/data/useFormData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

type VehicleUsageData = {
  vehicleTwoPrimaryUsage: string;
  vehicleTwoOneWayDistance: string;
};

const vehicleUsageOptions = ["Pleasure", "School", "Business", "Work", "Farm"];

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

export default function VehicleUsage() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<VehicleUsageData>({
    defaultValues: {
      vehicleTwoPrimaryUsage: formData.vehicleTwoPrimaryUsage || "",
      vehicleTwoOneWayDistance: formData.vehicleTwoOneWayDistance || "",
    },
  });

  const onSubmit = (data: VehicleUsageData) => {
    // Calculate annual miles (one-way distance * 2 * 365)
    const annualMiles = data.vehicleTwoOneWayDistance
      ? (parseInt(data.vehicleTwoOneWayDistance) * 2 * 365).toString()
      : "";

    updateFormData({
      ...data,
      vehicleOneAnnualMiles: annualMiles,
      lastCompletedStep: "vehicle-usage",
    });
    navigate("/vehicle-profile");
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
      <h2 className="text-xl font-semibold">
        {formData.firstName
          ? `${formData.firstName}, how do you use your vehicle?`
          : "How do you use your vehicle?"}
        <p className="mb-6 text-sm text-gray-600">
          This information will help us find the best insurance options for you.
        </p>
      </h2>

      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <SelectField
          control={control}
          name="vehicleTwoPrimaryUsage"
          label="Primary Usage"
          options={vehicleUsageOptions}
          placeholder="Select primary usage"
        />

        <Controller
          control={control}
          name="vehicleTwoOneWayDistance"
          rules={{ required: "One-way distance is required" }}
          render={({ field }) => (
            <div className="relative">
              <Input
                {...field}
                type="number"
                label="One-way Distance (miles)"
                placeholder="Enter average one-way distance"
                description="Don't worry about being exact - an estimate is fine!"
              />
            </div>
          )}
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
