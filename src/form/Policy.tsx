import { useForm, Controller, Control } from "react-hook-form";
import { Select, SelectItem, Button } from "@heroui/react";
import useFormData from "@/data/useFormData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  vehicleComprehensiveOptions,
  vehicleCollisionOptions,
} from "../lib/insuranceTypes";

type PolicyData = {
  vehicleOneComprehensive: string;
  vehicleOneCollision: string;
  vehicleTwoComprehensive?: string;
  vehicleTwoCollision?: string;
};

type Option = {
  label: string;
  value: string;
};

type DeductibleSelectProps = {
  control: Control<PolicyData>;
  options: Option[];
  name: keyof PolicyData;
  label: string;
  placeholder: string;
};

const DeductibleSelect = ({
  control,
  options,
  name,
  label,
  placeholder,
}: DeductibleSelectProps) => {
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
            <SelectItem key={option.value}>{option.label}</SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default function Policy() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();

  const hasCurrentInsurance = formData.currentlyInsured === "Yes";
  const hasSecondVehicle = !!formData.vehicleTwoMake;

  const wordingPrefix = hasCurrentInsurance ? "current" : "desired";
  const titlePrefix = hasCurrentInsurance
    ? "What are your current"
    : "What is your desired";

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PolicyData>({
    defaultValues: {
      vehicleOneComprehensive: formData.vehicleOneComprehensive || "",
      vehicleOneCollision: formData.vehicleOneCollision || "",
      vehicleTwoComprehensive: formData.vehicleTwoComprehensive || "",
      vehicleTwoCollision: formData.vehicleTwoCollision || "",
    },
  });

  const onSubmit = (data: PolicyData) => {
    updateFormData({
      ...data,
      lastCompletedStep: "policy",
    });
    navigate("/profile");
  };

  const handleBack = () => {
    navigate("/insurance-details");
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
      <div>
        <h2 className="text-xl font-semibold">
          {titlePrefix} deductible preferences?
        </h2>
        <p className="text-sm text-gray-600">
          Please select your {wordingPrefix} comprehensive and collision
          deductible amounts.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Vehicle One Deductibles */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {formData.vehicleOneYear} {formData.vehicleOneMake}{" "}
            {formData.vehicleOneModel}
          </h3>

          <DeductibleSelect
            control={control}
            options={vehicleComprehensiveOptions}
            name="vehicleOneComprehensive"
            label="Vehicle Comprehensive Deductible"
            placeholder="Select comprehensive deductible"
          />

          <DeductibleSelect
            control={control}
            options={vehicleCollisionOptions}
            name="vehicleOneCollision"
            label="Vehicle Collision Deductible"
            placeholder="Select collision deductible"
          />
        </div>

        {/* Vehicle Two Deductibles - Only show if user has second vehicle */}
        {hasSecondVehicle && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-medium">
              {formData.vehicleTwoYear} {formData.vehicleTwoMake}{" "}
              {formData.vehicleTwoModel}
            </h3>

            <DeductibleSelect
              control={control}
              options={vehicleComprehensiveOptions}
              name="vehicleTwoComprehensive"
              label="Vehicle Comprehensive Deductible"
              placeholder="Select comprehensive deductible"
            />

            <DeductibleSelect
              control={control}
              options={vehicleCollisionOptions}
              name="vehicleTwoCollision"
              label="Vehicle Collision Deductible"
              placeholder="Select collision deductible"
            />
          </motion.div>
        )}

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
