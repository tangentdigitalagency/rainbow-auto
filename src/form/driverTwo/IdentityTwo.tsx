import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Select,
  SelectItem,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import useFormData from "../../data/useFormData";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { occupationOptions } from "@/lib/occupationOptions";
import { useNavigation } from "@/App";

type IdentityFormData = {
  driverTwoGender: string;
  driverTwoMaritalStatus: string;
  driverTwoResidence: string;
  driverTwoYearAtResidence: string;
  driverTwoOccupation: string;
};

export default function Identity() {
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
  } = useForm<IdentityFormData>({
    defaultValues: {
      driverTwoGender: formData.driverTwoGender || "",
      driverTwoMaritalStatus: formData.driverTwoMaritalStatus || "",
      driverTwoResidence: formData.driverTwoResidence || "",
      driverTwoYearAtResidence: formData.driverTwoYearAtResidence || "",
      driverTwoOccupation: formData.driverTwoOccupation || "",
    },
  });

  const onSubmit: SubmitHandler<IdentityFormData> = async (data) => {
    setIsSubmitting(true);
    if (userId) {
      updateFormData({
        ...data,
        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep: location.pathname,
      });
    }
    handleFormNavigation("/history-two");
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
        Can you tell us a little about {formData.driverTwoFirstName}?
        <p className="mb-6 text-sm text-gray-600">
          This information will help us find the best insurance options for you.
        </p>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Controller
              name="driverTwoGender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Gender"
                  placeholder="Select gender"
                  isInvalid={!!errors.driverTwoGender}
                  errorMessage={errors.driverTwoGender?.message}
                  selectedKeys={field.value ? [field.value] : []}
                >
                  <SelectItem key="M">Male</SelectItem>
                  <SelectItem key="F">Female</SelectItem>
                  <SelectItem key="O">Non-Binary</SelectItem>
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
              name="driverTwoMaritalStatus"
              control={control}
              rules={{ required: "Marital status is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Marital Status"
                  placeholder="Select status"
                  isInvalid={!!errors.driverTwoMaritalStatus}
                  errorMessage={errors.driverTwoMaritalStatus?.message}
                  selectedKeys={field.value ? [field.value] : []}
                >
                  <SelectItem key="Single">Single</SelectItem>
                  <SelectItem key="Married">Married</SelectItem>
                  <SelectItem key="Divorced">Divorced</SelectItem>
                  <SelectItem key="Widowed">Widowed</SelectItem>
                </Select>
              )}
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="w-full"
        >
          <Controller
            name="driverTwoOccupation"
            control={control}
            rules={{ required: "Occupation is required" }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                label="Occupation"
                placeholder="Search or select your occupation"
                isInvalid={!!errors.driverTwoOccupation}
                errorMessage={errors.driverTwoOccupation?.message}
                defaultItems={Object.entries(occupationOptions)}
                inputValue={
                  field.value
                    ? occupationOptions[
                        field.value as keyof typeof occupationOptions
                      ]
                    : ""
                }
                onInputChange={field.onChange}
                onSelectionChange={(key) => field.onChange(key)}
                selectedKey={field.value}
              >
                {(item) => (
                  <AutocompleteItem key={item[0]} textValue={item[1]}>
                    {item[1]}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />
        </motion.div>
        <div className="my-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-sm font-semibold text-white rounded-full bg-primary">
                Residence Information
              </span>
            </div>
          </div>
        </div>
        <h2>
          Tell us about your home at{" "}
          <span className="font-semibold text-primary">
            {formData.driverTwoAddress1}
          </span>
          <p className="mb-6 text-sm text-gray-600">
            This helps us understand your living situation better.
          </p>
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Controller
              name="driverTwoResidence"
              control={control}
              rules={{ required: "Residence type is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Residence Type"
                  placeholder="Select type"
                  isInvalid={!!errors.driverTwoResidence}
                  errorMessage={errors.driverTwoResidence?.message}
                  selectedKeys={field.value ? [field.value] : []}
                >
                  <SelectItem key="Own">Own</SelectItem>
                  <SelectItem key="Rent">Rent</SelectItem>
                  <SelectItem key="Other">Other</SelectItem>
                </Select>
              )}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Controller
              name="driverTwoYearAtResidence"
              control={control}
              rules={{ required: "Years at residence is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Years at Residence"
                  placeholder="Select years"
                  isInvalid={!!errors.driverTwoYearAtResidence}
                  errorMessage={errors.driverTwoYearAtResidence?.message}
                  selectedKeys={field.value ? [field.value] : []}
                >
                  <SelectItem key="0-1">Less than 1 year</SelectItem>
                  <SelectItem key="1-3">1-3 years</SelectItem>
                  <SelectItem key="3-5">3-5 years</SelectItem>
                  <SelectItem key="5+">More than 5 years</SelectItem>
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
