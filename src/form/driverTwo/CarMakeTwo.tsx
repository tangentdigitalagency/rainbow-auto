import { useRef } from "react";
import { useForm, Controller, Control } from "react-hook-form";
import { Autocomplete, AutocompleteItem, Button, Spinner } from "@heroui/react";
import useFormData from "@/data/useFormData";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarMakes } from "@/hooks/useCarMakes";

type CarMakeData = {
  make: string;
};

type MakeSelectProps = {
  control: Control<CarMakeData>;
  makeOptions: { value: string; label: string }[];
};

const MakeSelect = ({ control, makeOptions }: MakeSelectProps) => {
  return (
    <Controller
      control={control}
      name="make"
      rules={{ required: "Make is required" }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          label="Select Make"
          placeholder="Search for your vehicle's make"
          onSelectionChange={(value) => field.onChange(value)}
          selectedKey={field.value}
        >
          {makeOptions.map((make) => (
            <AutocompleteItem key={make.value} textValue={make.label}>
              {make.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      )}
    />
  );
};

export function CarMakeTwo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, updateFormData } = useFormData();
  const {
    data: makes,
    isLoading,
    error,
  } = useCarMakes(formData.vehicleTwoYear || "");
  const formRef = useRef<HTMLFormElement>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CarMakeData>({
    defaultValues: {
      make: formData.vehicleTwoMake || "",
    },
  });

  const onSubmit = (data: CarMakeData) => {
    updateFormData({
      vehicleTwoMake: data.make,
      lastCompletedStep: "car-make-two",
    });

    // Check for returnTo parameter
    const searchParams = new URLSearchParams(location.search);
    const returnTo = searchParams.get("returnTo");

    if (returnTo) {
      // Pass through the returnTo parameter to the model page
      navigate(`/car-model-two?returnTo=${returnTo}`);
    } else {
      navigate("/car-model-two");
    }
  };

  const handleBack = () => {
    navigate("/car-year-two");
  };

  const fadeIn = {
    initial: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading makes: {error.message}</div>;
  if (!makes || makes.length === 0) return <div>No makes available</div>;

  const makeOptions = makes.map((make) => ({ value: make, label: make }));

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2 className="text-xl font-semibold">What Make is your second car?</h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <MakeSelect control={control} makeOptions={makeOptions} />
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
