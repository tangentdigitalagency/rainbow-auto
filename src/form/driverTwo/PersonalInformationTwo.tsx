import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, Button, DateInput } from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import useFormData from "@/data/useFormData";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigation } from "@/App";

type PersonalInfo = {
  driverTwoFirstName: string;
  driverTwoLastName: string;
  driverTwoPhone: string;
  driverTwoEmail: string;
  driverTwoGender: string;
  driverTwoDOB: string;
};

export default function PersonalTwo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateFormData, formData } = useFormData();
  const { handleFormNavigation } = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = localStorage.getItem("userId");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfo>({
    defaultValues: {
      driverTwoFirstName: formData.driverTwoFirstName || "",
      driverTwoLastName: formData.driverTwoLastName || "",

      driverTwoDOB: formData.driverTwoDOB?.toString() || "",
    },
  });

  const onSubmit: SubmitHandler<PersonalInfo> = async (data) => {
    setIsSubmitting(true);

    if (userId) {
      updateFormData({
        ...data,
        driverTwoDOB: new Date(data.driverTwoDOB),
        driverTwoFirstName: data.driverTwoFirstName,
        driverTwoLastName: data.driverTwoLastName,
        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep: location.pathname,
      });

      console.log(data);
    }

    handleFormNavigation("/address-two");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      <motion.div
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h2 className="text-xl font-semibold">
          Can you tell us a little about {formData.driverTwoFirstName}?
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          This information will help us find the best insurance options for you.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Controller
                name="driverTwoFirstName"
                control={control}
                rules={{
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters long",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="First Name"
                    placeholder="Enter your first name"
                    isInvalid={!!errors.driverTwoFirstName}
                    errorMessage={errors.driverTwoFirstName?.message}
                    type="text"
                  />
                )}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Controller
                name="driverTwoLastName"
                control={control}
                rules={{
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters long",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Last Name"
                    placeholder="Enter your last name"
                    isInvalid={!!errors.driverTwoLastName}
                    errorMessage={errors.driverTwoLastName?.message}
                    type="text"
                  />
                )}
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Controller
                name="driverTwoDOB"
                control={control}
                rules={{
                  required: "Date of birth is required",
                  validate: (value) => {
                    if (!value) return true;
                    const birthDate = new Date(value);
                    const today = new Date();
                    const age = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();
                    if (
                      monthDiff < 0 ||
                      (monthDiff === 0 && today.getDate() < birthDate.getDate())
                    ) {
                      return (
                        age - 1 >= 18 || "You must be at least 18 years old"
                      );
                    }
                    return age >= 18 || "You must be at least 18 years old";
                  },
                }}
                render={({ field }) => (
                  <DateInput
                    label="Date of Birth"
                    onChange={(date) => field.onChange(date?.toString())}
                    isInvalid={!!errors.driverTwoDOB}
                    errorMessage={errors.driverTwoDOB?.message}
                  />
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
    </>
  );
}
