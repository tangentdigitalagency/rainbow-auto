import { useForm, Controller, Control } from "react-hook-form";
import { Select, SelectItem, Button } from "@heroui/react";
import useFormData from "@/data/useFormData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  bodilyInjuryOptions,
  propertyDamageOptions,
  coverageTypes,
} from "../lib/insuranceTypes";

type InsuranceDetailsData = {
  bodily: string;
  property: string;
  requestedCoverageType: string;
};

type Option = {
  label: string;
  value: string;
};

type CoverageSelectProps = {
  control: Control<InsuranceDetailsData>;
  options: Option[];
  name: keyof InsuranceDetailsData;
  label: string;
  placeholder: string;
};

const CoverageSelect = ({
  control,
  options,
  name,
  label,
  placeholder,
}: CoverageSelectProps) => {
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

export default function InsuranceDetails() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<InsuranceDetailsData>({
    defaultValues: {
      bodily: formData.bodily || "",
      property: formData.property || "",
      requestedCoverageType: formData.requestedCoverageType || "",
    },
  });

  const onSubmit = (data: InsuranceDetailsData) => {
    updateFormData({
      ...data,
      lastCompletedStep: "insurance-details",
    });
    navigate("/profile");
  };

  const handleBack = () => {
    navigate("/current-insurance");
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
        What are your current coverage limits?
      </h2>
      <p className="text-sm text-gray-600">
        Please select your current bodily injury and property damage coverage
        limits.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CoverageSelect
          control={control}
          options={coverageTypes}
          name="requestedCoverageType"
          label="Coverage Type"
          placeholder="Select coverage type"
        />

        <CoverageSelect
          control={control}
          options={bodilyInjuryOptions}
          name="bodily"
          label="Bodily Injury Coverage"
          placeholder="Select bodily injury coverage"
        />

        <CoverageSelect
          control={control}
          options={propertyDamageOptions}
          name="property"
          label="Property Damage Coverage"
          placeholder="Select property damage coverage"
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
