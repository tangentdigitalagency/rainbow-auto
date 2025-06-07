import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Select, SelectItem, Button } from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import useFormData from "../data/useFormData";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigation } from "@/App";

type RiskFormData = {
  driverOneSuspended: string;
  driverOneFilingRequired: string;
  driverOneDUI: string;
};

const driverOneFilingRequiredOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];
const driverOneDUIOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];
const driverOneSuspendedOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

export default function Risk() {
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
  } = useForm<RiskFormData>({
    defaultValues: {
      driverOneSuspended: formData.driverOneSuspended || "",
      driverOneFilingRequired: formData.driverOneFilingRequired || "",
      driverOneDUI: formData.driverOneDUI || "",
    },
  });

  const onSubmit: SubmitHandler<RiskFormData> = async (data) => {
    setIsSubmitting(true);
    if (userId) {
      updateFormData({
        ...data,
        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep: location.pathname,
      });
    }
    handleFormNavigation("/drivers");
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
        Any bumps in the road, {formData.firstName}?
        <p className="mb-6 text-sm text-gray-600">
          Just a quick check on driving history like suspensions or DUIs. No
          stress — we've seen it all.
        </p>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Controller
              name="driverOneSuspended"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Has your license ever been suspended?"
                  placeholder="Select an option"
                  isInvalid={!!errors.driverOneSuspended}
                  errorMessage={errors.driverOneSuspended?.message}
                  selectedKeys={field.value ? [field.value] : []}
                >
                  {driverOneSuspendedOptions.map((option) => (
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
              name="driverOneFilingRequired"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Are you required to file an SR-22?"
                  placeholder="Select an option"
                  isInvalid={!!errors.driverOneFilingRequired}
                  errorMessage={errors.driverOneFilingRequired?.message}
                  selectedKeys={field.value ? [field.value] : []}
                >
                  {driverOneFilingRequiredOptions.map((option) => (
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
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Controller
              name="driverOneDUI"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Have you had any DUI convictions in the past 5 years?"
                  placeholder="Select an option"
                  isInvalid={!!errors.driverOneDUI}
                  errorMessage={errors.driverOneDUI?.message}
                  selectedKeys={field.value ? [field.value] : []}
                >
                  {driverOneDUIOptions.map((option) => (
                    <SelectItem key={option.value} textValue={option.label}>
                      {option.label}
                    </SelectItem>
                  ))}
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
