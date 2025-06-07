import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, Button, DateInput } from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import useFormData from "@/data/useFormData";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

type PersonalInfo = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  driverOneDOB: string;
};

export default function PersonalInfo() {
  const location = useLocation();
  const { updateFormData, formData } = useFormData();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = localStorage.getItem("userId");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfo>({
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      phone: formData.phone || "",
      email: formData.email || "",
      driverOneDOB: formData.driverOneDOB?.toString() || "",
    },
  });

  const onSubmit: SubmitHandler<PersonalInfo> = async (data) => {
    setIsSubmitting(true);

    if (userId) {
      updateFormData({
        ...data,
        driverOneDOB: new Date(data.driverOneDOB),
        driverOneFirstName: data.firstName,
        driverOneLastName: data.lastName,
        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep: location.pathname,
      });

      console.log(data);
    }

    navigate("/address");
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
        <h2 className="text-xl font-semibold">First, Lets Get to Know You!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Controller
                name="firstName"
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
                    isInvalid={!!errors.firstName}
                    errorMessage={errors.firstName?.message}
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
                name="lastName"
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
                    isInvalid={!!errors.lastName}
                    errorMessage={errors.lastName?.message}
                    type="text"
                  />
                )}
              />
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email"
                    placeholder="Enter your email address"
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    type="email"
                  />
                )}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^\(\d{3}\)\s\d{3}-\d{4}$/,
                    message: "Invalid phone number",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Phone"
                    placeholder="(XXX) XXX-XXXX"
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone?.message}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length > 0) {
                        if (value.length <= 3) {
                          value = `(${value}`;
                        } else if (value.length <= 6) {
                          value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                        } else {
                          value = `(${value.slice(0, 3)}) ${value.slice(
                            3,
                            6
                          )}-${value.slice(6, 10)}`;
                        }
                      }
                      field.onChange(value);
                    }}
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
                name="driverOneDOB"
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
                    isInvalid={!!errors.driverOneDOB}
                    errorMessage={errors.driverOneDOB?.message}
                  />
                )}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <span className="text-sm text-foreground">
              By clicking Continue below, I expressly provide my E-SIGN
              signature and consent to receive marketing calls, texts, and
              emails regarding insurance, from or on behalf of USAA at the phone
              number and email address I provided, including via automatic
              telephone dialing system or artificial or prerecorded voice
              messages, even if my number is on a federal, state, or company
              Do-Not-Call List. I understand that my consent is not a condition
              of purchasing any goods or services. By clicking Get Quote, above,
              I affirm that I have read and agree to the{" "}
              <a
                className="text-blue-600 hover:underline"
                href="https://suretyautogroup.com/terms-conditions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms & conditions
              </a>{" "}
              and{" "}
              <a
                href="https://suretyautogroup.com/privacy-policy"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy policy
              </a>{" "}
              including the arbitration provision and the{" "}
              <a
                href="https://suretyautogroup.com/terms-conditions#econsent"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                E-SIGN Consent
              </a>
              .
            </span>
          </motion.div>
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
