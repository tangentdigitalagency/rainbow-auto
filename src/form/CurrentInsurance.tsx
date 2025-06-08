import { useForm, Controller, Control } from "react-hook-form";
import {
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
  Button,
} from "@heroui/react";
import useFormData from "@/data/useFormData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  currentlyInsuredOptions,
  insuranceCompanies,
} from "../lib/insuranceTypes";

type CurrentInsuranceData = {
  currentlyInsured: string;
  currentProvider?: string;
};

type Option = {
  label: string;
  value: string;
};

type InsuranceSelectProps = {
  control: Control<CurrentInsuranceData>;
  options: Option[];
  name: keyof CurrentInsuranceData;
  label: string;
  placeholder: string;
};

const InsuranceSelect = ({
  control,
  options,
  name,
  label,
  placeholder,
}: InsuranceSelectProps) => {
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

type ProviderAutocompleteProps = {
  control: Control<CurrentInsuranceData>;
  options: Option[];
};

const ProviderAutocomplete = ({
  control,
  options,
}: ProviderAutocompleteProps) => {
  return (
    <Controller
      control={control}
      name="currentProvider"
      rules={{ required: "Current provider is required" }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          label="Current Insurance Provider"
          placeholder="Search for your insurance provider"
          onSelectionChange={(value) => field.onChange(value)}
          selectedKey={field.value}
        >
          {options.map((provider) => (
            <AutocompleteItem key={provider.value} textValue={provider.label}>
              {provider.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      )}
    />
  );
};

export default function CurrentInsurance() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<CurrentInsuranceData>({
    defaultValues: {
      currentlyInsured: formData.currentlyInsured || "",
      currentProvider: formData.currentProvider || "",
    },
  });

  const currentlyInsured = watch("currentlyInsured");

  const onSubmit = (data: CurrentInsuranceData) => {
    updateFormData({
      ...data,
      lastCompletedStep: "current-insurance",
    });
    navigate("/insurance-details");
  };

  const handleBack = () => {
    navigate("/vehicle-profile");
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
      <h2 className="text-xl font-semibold">Are you currently insured?</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InsuranceSelect
          control={control}
          options={currentlyInsuredOptions}
          name="currentlyInsured"
          label="Current Insurance Status"
          placeholder="Select your insurance status"
        />

        {currentlyInsured === "Yes" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProviderAutocomplete
              control={control}
              options={insuranceCompanies}
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
