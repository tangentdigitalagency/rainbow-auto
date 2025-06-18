import { useForm, Controller, Control } from "react-hook-form";
import {
  Select,
  SelectItem,
  Button,
  Card,
  CardBody,
  Tooltip,
  Chip,
} from "@heroui/react";
import useFormData from "@/data/useFormData";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Car,
  TrendingDown,
  TrendingUp,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import {
  vehicleComprehensiveOptions,
  vehicleCollisionOptions,
} from "../lib/insuranceTypes";
import { useState } from "react";

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
  coverageType: "comprehensive" | "collision";
  vehicleNumber: 1 | 2;
};

// Popularity data for smart defaults
const popularityData = {
  "500": { percentage: 42, label: "Most Popular", isPopular: true },
  "1000": { percentage: 28, label: "Common", isPopular: true },
  "250": { percentage: 18, label: "Lower Risk", isPopular: false },
  "100": { percentage: 8, label: "", isPopular: false },
  "0": { percentage: 3, label: "", isPopular: false },
  "50": { percentage: 1, label: "", isPopular: false },
  "2500": { percentage: 1, label: "Budget", isPopular: false },
};

// Quick coverage explanations (minimal)
const quickExplanations = {
  comprehensive: "Theft, weather, vandalism",
  collision: "Accident damage",
};

const DeductibleSelect = ({
  control,
  options,
  name,
  label,
  placeholder,
  coverageType,
  vehicleNumber,
}: DeductibleSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const explanation = quickExplanations[coverageType];

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <Tooltip
          content={explanation}
          placement="top"
          size="sm"
          className="text-xs"
        >
          <HelpCircle className="w-3 h-3 cursor-help text-default-400" />
        </Tooltip>
      </div>

      <Controller
        control={control}
        name={name}
        rules={{ required: `${label} is required` }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <Select
              {...field}
              placeholder={placeholder}
              selectedKeys={field.value ? [field.value] : []}
              onChange={(e) => {
                field.onChange(e.target.value);
                setSelectedValue(e.target.value);
              }}
              errorMessage={error?.message}
              size="lg"
              aria-label={`${label} for vehicle ${vehicleNumber}`}
            >
              {options.map((option) => {
                const popularity =
                  popularityData[option.value as keyof typeof popularityData];
                return (
                  <SelectItem key={option.value} textValue={option.label}>
                    <div className="flex justify-between items-center w-full">
                      <span>{option.label}</span>
                      {popularity?.isPopular && (
                        <Chip
                          size="sm"
                          variant="solid"
                          color={
                            popularity.percentage > 35 ? "success" : "warning"
                          }
                          className="ml-2"
                        >
                          {popularity.label}
                        </Chip>
                      )}
                    </div>
                  </SelectItem>
                );
              })}
            </Select>

            {/* Quick premium hint */}
            {selectedValue && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-1 items-center mt-1 text-xs text-default-500"
              >
                {parseInt(selectedValue) <= 250 ? (
                  <TrendingUp className="w-3 h-3 text-orange-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-green-500" />
                )}
                <span>
                  {parseInt(selectedValue) <= 250
                    ? "Higher premium"
                    : "Lower premium"}
                </span>
              </motion.div>
            )}
          </div>
        )}
      />
    </div>
  );
};

const VehicleSection = ({
  vehicleNumber,
  year,
  make,
  model,
  control,
  isComplete,
}: {
  vehicleNumber: 1 | 2;
  year?: string;
  make?: string;
  model?: string;
  control: Control<PolicyData>;
  isComplete: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: vehicleNumber * 0.05 }}
    >
      <Card className="border transition-colors hover:border-primary/30">
        <CardBody className="space-y-4">
          {/* Quick vehicle header */}
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-primary/10">
                <Car className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  {year && make && model
                    ? `${year} ${make} ${model}`
                    : `Vehicle ${vehicleNumber}`}
                </h3>
              </div>
            </div>
            {isComplete && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.3 }}
              >
                <CheckCircle className="w-5 h-5 text-success" />
              </motion.div>
            )}
          </div>

          {/* Quick deductible selection */}
          <div className="grid grid-cols-2 gap-4">
            <DeductibleSelect
              control={control}
              options={vehicleComprehensiveOptions}
              name={
                vehicleNumber === 1
                  ? "vehicleOneComprehensive"
                  : "vehicleTwoComprehensive"
              }
              label="Comprehensive"
              placeholder="Select amount"
              coverageType="comprehensive"
              vehicleNumber={vehicleNumber}
            />

            <DeductibleSelect
              control={control}
              options={vehicleCollisionOptions}
              name={
                vehicleNumber === 1
                  ? "vehicleOneCollision"
                  : "vehicleTwoCollision"
              }
              label="Collision"
              placeholder="Select amount"
              coverageType="collision"
              vehicleNumber={vehicleNumber}
            />
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default function Policy() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasCurrentInsurance = formData.currentlyInsured === "Yes";
  const hasSecondVehicle = !!formData.vehicleTwoMake;

  const titlePrefix = hasCurrentInsurance ? "Current" : "Desired";

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PolicyData>({
    defaultValues: {
      vehicleOneComprehensive: formData.vehicleOneComprehensive || "",
      vehicleOneCollision: formData.vehicleOneCollision || "",
      vehicleTwoComprehensive: hasSecondVehicle
        ? formData.vehicleTwoComprehensive || ""
        : undefined,
      vehicleTwoCollision: hasSecondVehicle
        ? formData.vehicleTwoCollision || ""
        : undefined,
    },
  });

  // Watch form values for completion tracking
  const watchedValues = watch();

  // Debug logging
  console.log("Policy form values:", watchedValues);
  console.log("Has second vehicle:", hasSecondVehicle);

  // Check vehicle completion
  const vehicle1Complete = !!(
    watchedValues.vehicleOneComprehensive && watchedValues.vehicleOneCollision
  );
  const vehicle2Complete = hasSecondVehicle
    ? !!(
        watchedValues.vehicleTwoComprehensive &&
        watchedValues.vehicleTwoCollision
      )
    : true;

  console.log("Vehicle 1 complete:", vehicle1Complete, {
    comp: watchedValues.vehicleOneComprehensive,
    coll: watchedValues.vehicleOneCollision,
  });
  console.log("Vehicle 2 complete:", vehicle2Complete, {
    comp: watchedValues.vehicleTwoComprehensive,
    coll: watchedValues.vehicleTwoCollision,
  });

  const onSubmit = async (data: PolicyData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    updateFormData({
      ...data,
      lastCompletedStep: "policy",
    });

    navigate("/profile");
  };

  const handleBack = () => {
    navigate("/insurance-details");
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Streamlined header */}
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">
          {titlePrefix} deductible amounts?
        </h2>
        <p className="text-sm text-default-600">
          {hasCurrentInsurance
            ? "Enter your current deductible amounts"
            : "Choose your preferred deductible amounts"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Vehicle sections */}
        <div className="space-y-4">
          <VehicleSection
            vehicleNumber={1}
            year={formData.vehicleOneYear}
            make={formData.vehicleOneMake}
            model={formData.vehicleOneModel}
            control={control}
            isComplete={vehicle1Complete}
          />

          {hasSecondVehicle && (
            <VehicleSection
              vehicleNumber={2}
              year={formData.vehicleTwoYear}
              make={formData.vehicleTwoMake}
              model={formData.vehicleTwoModel}
              control={control}
              isComplete={vehicle2Complete}
            />
          )}
        </div>

        {/* Form actions */}
        <div className="flex justify-between pt-4 space-x-4">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onPress={handleBack}
            startContent={<ChevronLeft className="w-4 h-4" />}
            isDisabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="flex-grow max-w-md"
            endContent={<ChevronRight className="w-4 h-4" />}
            isLoading={isSubmitting}
            isDisabled={!(vehicle1Complete && vehicle2Complete)}
          >
            {isSubmitting ? "Saving..." : "Continue"}
          </Button>
        </div>

        {/* Minimal error feedback */}
        <AnimatePresence>
          {Object.keys(errors).length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-center text-danger"
            >
              Please select all deductible amounts
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}
