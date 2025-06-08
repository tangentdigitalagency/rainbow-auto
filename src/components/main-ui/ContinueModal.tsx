import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Progress,
} from "@heroui/react";
import Lottie from "lottie-react";
import carInsuranceAnimation from "@/assets/car-insurance.json";
import useFormData from "@/data/useFormData";
import { formatDistanceToNow } from "date-fns";

interface ContinuationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  lastStep: string;
}

const ContinuationModal: React.FC<ContinuationModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  lastStep,
}) => {
  const { formData } = useFormData();

  const getStepName = (path: string) => {
    const steps: { [key: string]: string } = {
      "/personal-information": "Personal Information",
      "/address": "Address",
      "/identity": "Identity",
      "/history": "Driving History",
      "/risk": "Risk Assessment",
      "/drivers": "Driver Information",
      "/car-year": "Vehicle Year",
      "/car-make": "Vehicle Make",
      "/car-model": "Vehicle Model",
      "/vehicle-data": "Vehicle Data",
      "/vehicle-usage": "Vehicle Usage",
      "/vehicle-profile": "Vehicle Profile",
      "/personal-information-two": "Personal Information",
      "/address-two": "Address",
      "/identity-two": "Identity",
      "/history-two": "Driving History",
      "/risk-two": "Risk Assessment",
      "/car-year-two": "Vehicle Year",
      "/car-make-two": "Vehicle Make",
      "/car-model-two": "Vehicle Model",
      "/vehicle-data-two": "Vehicle Data",
      "/vehicle-usage-two": "Vehicle Usage",
      "/vehicle-profile-two": "Vehicle Profile",
      "/current-insurance": "Current Insurance",
      "/insurance-details": "Insurance Details",
      "/profile": "Profile",
      "/submitting": "Submitting",
      "/thank-you": "Thank You",
    };
    return (
      steps[path] ||
      path
        .replace("/", "")
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  };

  const getProgressPercentage = (path: string) => {
    const stepOrder = [
      "/personal-information",
      "/address",
      "/identity",
      "/history",
      "/risk",
      "/drivers",
      "/car-year",
      "/car-make",
      "/car-model",
      "/vehicle-data",
      "/vehicle-usage",
      "/vehicle-profile",
      "/personal-information-two",
      "/address-two",
      "/identity-two",
      "/history-two",
      "/risk-two",
      "/car-year-two",
      "/car-make-two",
      "/car-model-two",
      "/vehicle-data-two",
      "/vehicle-usage-two",
      "/vehicle-profile-two",
      "/current-insurance",
      "/insurance-details",
      "/profile",
      "/submitting",
      "/thank-you",
    ];

    // Normalize the path to ensure it starts with a slash
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    const currentIndex = stepOrder.indexOf(normalizedPath);

    // If the path is not found, try to find the closest matching step
    if (currentIndex === -1) {
      const matchingStep = stepOrder.find((step) =>
        normalizedPath.includes(step.replace("/", ""))
      );
      if (matchingStep) {
        return ((stepOrder.indexOf(matchingStep) + 1) / stepOrder.length) * 100;
      }
      return 0;
    }

    return ((currentIndex + 1) / stepOrder.length) * 100;
  };

  const getTimeAgo = () => {
    if (formData.lastCompletedAt) {
      return formatDistanceToNow(new Date(formData.lastCompletedAt), {
        addSuffix: true,
      });
    }
    return "recently";
  };

  const currentStep =
    lastStep || formData.lastCompletedStep || "/personal-information";
  const progress = getProgressPercentage(currentStep);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      size="2xl"
      classNames={{
        base: "bg-background",
        header: "border-b-[1px] border-divider",
        footer: "border-t-[1px] border-divider",
        closeButton: "hover:bg-default-100/80 active:bg-default-100/90",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-center">
            Welcome Back {formData.firstName || "there"}!
          </h2>
          <p className="text-sm text-center text-default-500">
            We found your previous progress from {getTimeAgo()}
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center gap-4">
            <div className="w-64 h-64">
              <Lottie
                animationData={carInsuranceAnimation}
                loop={true}
                autoplay={true}
              />
            </div>

            <div className="w-full max-w-md space-y-4">
              {currentStep === "/thank-you" ? (
                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-semibold">
                    Ready for Another Quote?
                  </h3>
                  <p className="text-sm text-default-500">
                    We see you've already received a quote. Would you like to
                    start fresh and get another quote? We're here to help you
                    find the best coverage for your needs.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-semibold">
                    Continue from {getStepName(currentStep)}
                  </h3>
                  <p className="text-sm text-default-500">
                    You were in the middle of completing your insurance quote.
                    Would you like to continue where you left off?
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Quote Progress</span>
                  <span className="text-default-500">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <Progress
                  value={progress}
                  color="success"
                  size="sm"
                  className="w-full"
                />
              </div>

              <div className="p-4 space-y-3 rounded-lg bg-default-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Progress</span>
                  <span className="text-sm text-default-500">
                    {getStepName(currentStep)}
                  </span>
                </div>
                {formData.lastCompletedAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Last Updated</span>
                    <span className="text-sm text-default-500">
                      {getTimeAgo()}
                    </span>
                  </div>
                )}
                {formData.email && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Email</span>
                    <span className="text-sm text-default-500">
                      {formData.email}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onPress={onClose}
            className="font-medium"
          >
            Start Over
          </Button>
          <Button color="primary" onPress={onContinue} className="font-medium">
            {currentStep === "/thank-you" ? "Get New Quote" : "Continue"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ContinuationModal;
