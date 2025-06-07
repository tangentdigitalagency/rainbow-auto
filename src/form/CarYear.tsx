import { useForm, Controller, Control } from "react-hook-form";
import { Select, SelectItem, Button, Spinner } from "@heroui/react";
import useFormData from "@/data/useFormData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarYears } from "@/hooks/useCarYears";

type CarYearData = {
  year: string;
};

type YearSelectProps = {
  control: Control<CarYearData>;
  yearOptions: { value: string; label: string }[];
};

const YearSelect = ({ control, yearOptions }: YearSelectProps) => {
  return (
    <Controller
      control={control}
      name="year"
      rules={{ required: "Year is required" }}
      render={({ field }) => (
        <Select
          {...field}
          items={yearOptions}
          label="Select Year"
          placeholder="Select Year"
        >
          {(year) => (
            <SelectItem key={year.value} textValue={year.label}>
              {year.label}
            </SelectItem>
          )}
        </Select>
      )}
    />
  );
};

export function CarYear() {
  const navigate = useNavigate();
  const { data: years, isLoading, error } = useCarYears();
  const { formData, updateFormData } = useFormData();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CarYearData>({
    defaultValues: {
      year: formData.vehicleOneYear || "",
    },
  });

  const onSubmit = (data: CarYearData) => {
    updateFormData({
      vehicleOneYear: data.year,
      lastCompletedStep: "car-year",
    });
    navigate("/car-make");
  };

  const handleBack = () => {
    navigate("/drivers");
  };

  const fadeIn = {
    initial: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading years: {error.message}</div>;
  if (!years || years.length === 0) return <div>No years available</div>;

  const yearOptions = years.map((year) => ({ value: year, label: year }));

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2 className="text-xl font-semibold">What year is your car?</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <YearSelect control={control} yearOptions={yearOptions} />
        <motion.div
          className="flex justify-between space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
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
