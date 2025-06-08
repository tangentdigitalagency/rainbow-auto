import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, Button } from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import useFormData from "../../data/useFormData";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { AddressAutofill } from "@mapbox/search-js-react";
import { AddressAutofillProps } from "@mapbox/search-js-react/dist/components/AddressAutofill";
import { useNavigation } from "@/App";

type AddressFormData = {
  driverTwoAddress1: string;
  driverTwoAddress2: string;
  driverTwoCity: string;
  driverTwoState: string;
  driverTwoZipcode: number;
};

const AddressAutoFillWrapper =
  AddressAutofill as React.ComponentType<AddressAutofillProps>;

export default function Address() {
  const location = useLocation();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_MAPBOX_API;
  const { updateFormData, formData } = useFormData();
  const { handleFormNavigation } = useNavigation();
  const userId = localStorage.getItem("userId");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    trigger,
  } = useForm<AddressFormData>({
    defaultValues: {
      driverTwoAddress1: formData.driverTwoAddress1 || "",
      driverTwoAddress2: formData.driverTwoAddress2 || "",
      driverTwoCity: formData.driverTwoCity || "",
      driverTwoState: formData.driverTwoState || "",
      driverTwoZipcode: formData.driverTwoZipcode || 0,

      driverOneRelationship: "Self",
    } as AddressFormData,
  });

  const onSubmit: SubmitHandler<AddressFormData> = async (data) => {
    if (userId) {
      updateFormData({
        ...data,
        driverTwoZipcode: parseInt(
          data.driverTwoZipcode.toString().replace(/\D/g, "")
        ),
        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep: location.pathname,
      });
    }
    handleFormNavigation("/identity-two");
  };

  const handleBack = () => {
    navigate(-1);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddressAutofill = (result: any) => {
    const address = result.features[0].properties;

    setValue("driverTwoAddress1", address.address_line1 || "", {
      shouldValidate: true,
    });
    setValue("driverTwoCity", address.city || "", { shouldValidate: true });
    setValue("driverTwoState", address.state_code || address.state || "", {
      shouldValidate: true,
    });
    setValue("driverTwoZipcode", address.postcode || "", {
      shouldValidate: true,
    });

    trigger([
      "driverTwoAddress1",
      "driverTwoCity",
      "driverTwoState",
      "driverTwoZipcode",
    ]);

    setTimeout(() => {
      trigger([
        "driverTwoAddress1",
        "driverTwoCity",
        "driverTwoState",
        "driverTwoZipcode",
      ]);
    }, 0);
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
      <h2 className="mb-2 text-2xl font-semibold">
        Hi {formData.driverTwoFirstName}! 👋
      </h2>
      <p className="mb-6 text-gray-600">
        Let's get your current address to help find the best insurance options
        for you.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Controller
              name="driverTwoAddress1"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <AddressAutoFillWrapper
                  accessToken={apiKey}
                  onRetrieve={handleAddressAutofill}
                >
                  <Input
                    {...field}
                    autoComplete="address-line1"
                    label="Address Line 1"
                    placeholder="Enter your Address"
                    isInvalid={!!errors.driverTwoAddress1}
                    errorMessage={errors.driverTwoAddress1?.message}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </AddressAutoFillWrapper>
              )}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Input
              {...register("driverTwoAddress2")}
              autoComplete="address-line2"
              label="Address Line 2"
              placeholder="Apartment, suite, unit, etc. (optional)"
            />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Controller
              name="driverTwoCity"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="address-level2"
                  label="City"
                  placeholder="Enter city"
                  isInvalid={!!errors.driverTwoCity}
                  errorMessage={errors.driverTwoCity?.message}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
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
              name="driverTwoState"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="address-level1"
                  label="State"
                  placeholder="Enter state"
                  isInvalid={!!errors.driverTwoState}
                  errorMessage={errors.driverTwoState?.message}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Input
              {...register("driverTwoZipcode", {
                required: "Zipcode is required",
                pattern: {
                  value: /^\d{5}(-\d{4})?$/,
                  message: "Invalid zipcode format",
                },
              })}
              autoComplete="postal-code"
              label="Zipcode"
              placeholder="Enter zipcode"
              isInvalid={!!errors.driverTwoZipcode}
              errorMessage={errors.driverTwoZipcode?.message}
            />
          </motion.div>
        </div>

        <motion.div
          className="flex justify-between space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
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
