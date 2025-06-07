import { Routes, Route, useNavigate } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./components/main-ui/MainLayout";
import { ThemeProvider } from "./utils/theme-provider";
import PersonalInfo from "./form/PersonalInformation";
import FormTemplate from "./components/main-ui/FormTemplate";
import Address from "./form/Address";
import Identity from "./form/Identity";
import History from "./form/History";
import Risk from "./form/Risk";
import useFormData from "./data/useFormData";
import ContinuationModal from "./components/main-ui/ContinueModal";
import Drivers from "./form/Drivers";
import { CarYear } from "./form/CarYear";
import { CarMake } from "./form/CarMake";
import { CarModel } from "./form/CarModel";
import VehicleUsage from "./form/VehicleUsage";
import VehicleData from "./form/VehicleData";
import VehicleProfile from "./form/VehicleProfile";

// Create a navigation context
type NavigationContextType = {
  handleFormNavigation: (nextPath: string) => void;
  handleBack: () => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

// Custom hook to use navigation context
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

function AppContent() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastCompletedStep, setLastCompletedStep] = useState<string | null>(
    null
  );
  const { formData, refetch } = useFormData();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      refetch().then(() => {
        if (formData.lastCompletedStep && window.location.pathname === "/") {
          setLastCompletedStep(formData.lastCompletedStep);
          setIsModalOpen(true);
        }
      });
    }
  }, [refetch, formData.lastCompletedStep]);

  const handleFormNavigation = (nextPath: string) => {
    const searchParams = new URLSearchParams(location.search);
    const returnTo = searchParams.get("returnTo");

    if (returnTo) {
      // If there's a returnTo parameter, navigate back to that page
      navigate(`/${returnTo}`);
    } else {
      // If no returnTo parameter, proceed to the next step
      navigate(nextPath);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinueForm = () => {
    setIsModalOpen(false);
    if (lastCompletedStep) {
      navigate(lastCompletedStep);
    }
  };

  return (
    <NavigationContext.Provider value={{ handleFormNavigation, handleBack }}>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <LandingPage />
            </MainLayout>
          }
        />
        <Route
          path="/personal-information"
          element={
            <FormTemplate progress={0.2}>
              <PersonalInfo />
            </FormTemplate>
          }
        />
        <Route
          path="/address"
          element={
            <FormTemplate progress={10}>
              <Address />
            </FormTemplate>
          }
        />
        <Route
          path="/identity"
          element={
            <FormTemplate progress={20}>
              <Identity />
            </FormTemplate>
          }
        />
        <Route
          path="/history"
          element={
            <FormTemplate progress={30}>
              <History />
            </FormTemplate>
          }
        />
        <Route
          path="/risk"
          element={
            <FormTemplate progress={40}>
              <Risk />
            </FormTemplate>
          }
        />
        <Route
          path="/drivers"
          element={
            <FormTemplate progress={50}>
              <Drivers />
            </FormTemplate>
          }
        />
        <Route
          path="/car-year"
          element={
            <FormTemplate progress={60}>
              <CarYear />
            </FormTemplate>
          }
        />
        <Route
          path="/car-make"
          element={
            <FormTemplate progress={70}>
              <CarMake />
            </FormTemplate>
          }
        />
        <Route
          path="/car-model"
          element={
            <FormTemplate progress={80}>
              <CarModel />
            </FormTemplate>
          }
        />

        <Route
          path="/vehicle-data"
          element={
            <FormTemplate progress={90}>
              <VehicleData />
            </FormTemplate>
          }
        />
        <Route
          path="/vehicle-usage"
          element={
            <FormTemplate progress={100}>
              <VehicleUsage />
            </FormTemplate>
          }
        />

        <Route
          path="/vehicle-profile"
          element={
            <FormTemplate progress={100}>
              <VehicleProfile />
            </FormTemplate>
          }
        />
      </Routes>

      <ContinuationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContinue={handleContinueForm}
        lastStep={lastCompletedStep || ""}
      />
    </NavigationContext.Provider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
