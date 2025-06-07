import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import useLocationData from "@/data/useLocationData";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import ContinuationModal from "@/components/main-ui/ContinueModal";
import useFormData from "@/data/useFormData";

type ZipcodeFormData = {
  zipcode: string;
};

const Zipcode: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    formData,
    updateFormData,
    isLoading: isUpdating,
    refetch,
  } = useFormData();
  const { isLoading: isLocationLoading, fetchLocationForZipcode } =
    useLocationData();
  const [cityState, setCityState] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastCompletedStep, setLastCompletedStep] = useState<string | null>(
    null
  );

  useEffect(() => {
    let currentUserId = localStorage.getItem("userId");
    if (!currentUserId) {
      currentUserId = uuidv4();
      localStorage.setItem("userId", currentUserId);
    }
    setUserId(currentUserId);

    // Fetch the latest form data
    refetch().then(() => {
      if (
        formData.lastCompletedStep &&
        formData.lastCompletedStep !== location.pathname
      ) {
        const steps = [
          // TODO: Add steps here
          "/",
          "/personal-information",
        ];
        const currentStepIndex = steps.indexOf(location.pathname);
        const lastCompletedStepIndex = steps.indexOf(
          formData.lastCompletedStep
        );

        if (lastCompletedStepIndex > currentStepIndex) {
          setLastCompletedStep(formData.lastCompletedStep);
          setIsModalOpen(true);
        }
      }
    });
  }, [location.pathname, navigate, refetch, formData.lastCompletedStep]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<ZipcodeFormData>({
    mode: "onBlur",
    defaultValues: {
      zipcode: formData.zipcode?.toString() || "",
    },
  });

  const validateAndUpdateCity = async (value: string) => {
    if (value.length === 5 && /^\d{5}$/.test(value) && userId) {
      try {
        const locationData = await fetchLocationForZipcode(value);
        if (locationData && locationData.city && locationData.state) {
          setCityState(`${locationData.city}, ${locationData.state}`);
        } else {
          setCityState(null);
          toast.error("Unable to find location for this zipcode");
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
        setCityState(null);
        toast.error("Error fetching location data");
      }
    } else {
      setCityState(null);
    }
  };

  const handleContinueForm = () => {
    setIsModalOpen(false);
    if (lastCompletedStep) {
      navigate(lastCompletedStep);
    }
  };

  const onSubmit: SubmitHandler<ZipcodeFormData> = async (data) => {
    updateFormData({
      zipcode: parseInt(data.zipcode),
      lastCompletedStep: location.pathname,
    });

    navigate("/personal-information");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 sm:flex">
        <Input
          {...register("zipcode", {
            required: "Zipcode is required",
            pattern: {
              value: /^\d{5}$/,
              message: "Zipcode must be 5 digits",
            },
            validate: async (value) => {
              if (value.trim() === "") {
                return "Zipcode cannot be empty";
              }
              await validateAndUpdateCity(value);
              return true;
            },
          })}
          type="text"
          placeholder="Enter your zipcode"
          className="w-full sm:max-w-xs"
          size="lg"
          isInvalid={!!errors.zipcode}
          errorMessage={errors.zipcode?.message}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 5 && /^\d*$/.test(value)) {
              setValue("zipcode", value, {
                shouldValidate: value.length === 5,
              });
            }
          }}
          onBlur={() => trigger("zipcode")}
        />
        <Button
          type="submit"
          color="primary"
          size="lg"
          className="mt-3 font-semibold sm:mt-0 sm:ml-3"
          endContent={<ArrowRight className="ml-2" />}
          isLoading={isUpdating || isLocationLoading}
        >
          Get Your Quote
        </Button>
      </form>
      <ContinuationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContinue={handleContinueForm}
        lastStep={lastCompletedStep || ""}
      />
      {cityState && (
        <div className="mt-2 text-sm text-green-500">
          Savings Available in {cityState}
        </div>
      )}
    </div>
  );
};

export default Zipcode;
