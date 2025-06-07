import { useForm, Controller, Control } from "react-hook-form";
import { Select, SelectItem, Button, Spinner } from "@heroui/react";
import useFormData from "@/data/useFormData";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarModels } from "@/hooks/useCarModels";

type CarModelData = {
  model: string;
};

type ModelSelectProps = {
  control: Control<CarModelData>;
  modelOptions: { value: string; label: string }[];
};

const ModelSelect = ({ control, modelOptions }: ModelSelectProps) => {
  return (
    <Controller
      control={control}
      name="model"
      rules={{ required: "Model is required" }}
      render={({ field }) => (
        <Select
          {...field}
          items={modelOptions}
          label="Select Model"
          placeholder="Select Model"
        >
          {(model) => (
            <SelectItem key={model.value} textValue={model.label}>
              {model.label}
            </SelectItem>
          )}
        </Select>
      )}
    />
  );
};

export function CarModel() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, updateFormData } = useFormData();
  const {
    data: models,
    isLoading,
    error,
  } = useCarModels(
    formData.vehicleOneYear || "",
    formData.vehicleOneMake || ""
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CarModelData>({
    defaultValues: {
      model: formData.vehicleOneModel || "",
    },
  });

  const onSubmit = (data: CarModelData) => {
    updateFormData({
      vehicleOneModel: data.model,
      lastCompletedStep: "car-model",
    });

    // Check for returnTo parameter
    const searchParams = new URLSearchParams(location.search);
    const returnTo = searchParams.get("returnTo");

    if (returnTo) {
      navigate(`/${returnTo}`);
    } else {
      navigate("/vehicle-data");
    }
  };

  const handleBack = () => {
    navigate("/car-make");
  };

  const fadeIn = {
    initial: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading models: {error.message}</div>;
  if (!models || models.length === 0) return <div>No models available</div>;

  const modelOptions = models.map((model) => ({ value: model, label: model }));

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2 className="text-xl font-semibold">What Model is your car?</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <ModelSelect control={control} modelOptions={modelOptions} />
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
