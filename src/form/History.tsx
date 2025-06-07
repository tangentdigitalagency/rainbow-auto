import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Select,
  SelectItem,
  Button,
  Input,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import useFormData from "../data/useFormData";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { creditOptions } from "@/lib/creditOptions";
import { stateOptions } from "@/lib/stateOptions";
import { useNavigation } from "@/App";

type HistoryData = {
  driverOneCredit: string;
  driverOneAgedLicensed: string;
  driverOneLicenseState: string;
  driverOneLicenseStatus: string;
};

export default function History() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateFormData, formData } = useFormData();
  const { handleFormNavigation } = useNavigation();
  const userId = localStorage.getItem("userId");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HistoryData>({
    defaultValues: {
      driverOneCredit: formData.driverOneCredit || "",
      driverOneAgedLicensed: formData.driverOneAgedLicensed || "",
      driverOneLicenseState: formData.driverOneLicenseState || "",
      driverOneLicenseStatus: formData.driverOneLicenseStatus || "",
    },
  });

  const onSubmit: SubmitHandler<HistoryData> = async (data) => {
    setIsSubmitting(true);
    if (userId) {
      updateFormData({
        ...data,
        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep: location.pathname,
      });
    }
    handleFormNavigation("/risk");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const fadeIn = {
    hidden: { opacity: 0 },
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
        Let's talk about your driving history, {formData.firstName}!
        <p className="mb-6 text-sm text-gray-600">
          This information helps us understand your driving experience and find
          the best rates for you.
        </p>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Controller
              name="driverOneCredit"
              control={control}
              rules={{ required: "Credit rating is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Credit Rating"
                  placeholder="Select rating"
                  isInvalid={!!errors.driverOneCredit}
                  errorMessage={errors.driverOneCredit?.message}
                  selectedKeys={field.value ? [field.value] : []}
                >
                  {creditOptions.map((option) => (
                    <SelectItem key={option.value} textValue={option.label}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Controller
              name="driverOneAgedLicensed"
              control={control}
              rules={{
                required: "Age when licensed is required",
                min: {
                  value: 14,
                  message: "Must be at least 14 years old",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  label="Age When Licensed"
                  placeholder="Enter age"
                  isInvalid={!!errors.driverOneAgedLicensed}
                  errorMessage={errors.driverOneAgedLicensed?.message}
                  min={14}
                />
              )}
            />
          </motion.div>
        </div>

        <div className="my-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-sm font-semibold text-white rounded-full bg-primary">
                License Information
              </span>
            </div>
          </div>
        </div>

        <h2>
          Tell us about your driver's license
          <p className="mb-6 text-sm text-gray-600">
            This helps us verify your driving status and eligibility.
          </p>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Controller
              name="driverOneLicenseState"
              control={control}
              rules={{ required: "License state is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  label="License State"
                  placeholder="Search or select state"
                  isInvalid={!!errors.driverOneLicenseState}
                  errorMessage={errors.driverOneLicenseState?.message}
                  defaultItems={stateOptions}
                  selectedKey={field.value}
                  onSelectionChange={(key) => field.onChange(key)}
                >
                  {(state) => (
                    <AutocompleteItem key={state.value} textValue={state.label}>
                      {state.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Controller
              name="driverOneLicenseStatus"
              control={control}
              rules={{ required: "License status is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="License Status"
                  placeholder="Select status"
                  isInvalid={!!errors.driverOneLicenseStatus}
                  errorMessage={errors.driverOneLicenseStatus?.message}
                  selectedKeys={field.value ? [field.value] : []}
                >
                  <SelectItem key="Active">Active</SelectItem>
                  <SelectItem key="Expired">Expired</SelectItem>
                  <SelectItem key="Restricted">Restricted</SelectItem>
                  <SelectItem key="Suspended">Suspended</SelectItem>
                  <SelectItem key="Temporary">Temporary</SelectItem>
                </Select>
              )}
            />
          </motion.div>
        </div>

        <motion.div
          className="flex justify-between space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Button
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
