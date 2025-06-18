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
import CurrentInsurance from "./form/CurrentInsurance";
import InsuranceDetails from "./form/InsuranceDetails";
import Policy from "./form/Policy";
import Profile from "./form/Profile";
import Submitting from "./form/Submitting";
import ThankYouPage from "./form/ThankYou";
import { CarModelTwo } from "./form/driverTwo/CarModelTwo";
import { CarMakeTwo } from "./form/driverTwo/CarMakeTwo";
import { CarYearTwo } from "./form/driverTwo/CarTwoYear";
import VehicleDataTwo from "./form/driverTwo/VehicleDataTwo";
import VehicleUsageTwo from "./form/driverTwo/VehicleUsageTwo";
import AddressTwo from "./form/driverTwo/AddressTwo";
import IdentityTwo from "./form/driverTwo/IdentityTwo";
import HistoryTwo from "./form/driverTwo/HistoryTwo";
import RiskTwo from "./form/driverTwo/RiskTwo";
import PersonalTwo from "./form/driverTwo/PersonalInformationTwo";
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
    const searchParams = new URLSearchParams(window.location.search);
    const returnTo = searchParams.get("returnTo");

    if (returnTo) {
      navigate(`/${returnTo}`);
    } else {
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

        {/* Driver One */}
        <Route
          path="/personal-information"
          element={
            <FormTemplate progress={5}>
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
            <FormTemplate progress={15}>
              <Identity />
            </FormTemplate>
          }
        />
        <Route
          path="/history"
          element={
            <FormTemplate progress={20}>
              <History />
            </FormTemplate>
          }
        />
        <Route
          path="/risk"
          element={
            <FormTemplate progress={25}>
              <Risk />
            </FormTemplate>
          }
        />
        <Route
          path="/drivers"
          element={
            <FormTemplate progress={30}>
              <Drivers />
            </FormTemplate>
          }
        />
        <Route
          path="/car-year"
          element={
            <FormTemplate progress={35}>
              <CarYear />
            </FormTemplate>
          }
        />
        <Route
          path="/car-make"
          element={
            <FormTemplate progress={40}>
              <CarMake />
            </FormTemplate>
          }
        />
        <Route
          path="/car-model"
          element={
            <FormTemplate progress={45}>
              <CarModel />
            </FormTemplate>
          }
        />
        <Route
          path="/vehicle-data"
          element={
            <FormTemplate progress={50}>
              <VehicleData />
            </FormTemplate>
          }
        />
        <Route
          path="/vehicle-usage"
          element={
            <FormTemplate progress={55}>
              <VehicleUsage />
            </FormTemplate>
          }
        />

        {/* Driver Two */}

        <Route
          path="/personal-information-two"
          element={
            <FormTemplate progress={0.2}>
              <PersonalTwo />
            </FormTemplate>
          }
        />

        <Route
          path="/address-two"
          element={
            <FormTemplate progress={10}>
              <AddressTwo />
            </FormTemplate>
          }
        />

        <Route
          path="/identity-two"
          element={
            <FormTemplate progress={15}>
              <IdentityTwo />
            </FormTemplate>
          }
        />

        <Route
          path="/history-two"
          element={
            <FormTemplate progress={20}>
              <HistoryTwo />
            </FormTemplate>
          }
        />

        <Route
          path="/risk-two"
          element={
            <FormTemplate progress={25}>
              <RiskTwo />
            </FormTemplate>
          }
        />
        <Route
          path="/car-year-two"
          element={
            <FormTemplate progress={40}>
              <CarYearTwo />
            </FormTemplate>
          }
        />

        <Route
          path="/car-make-two"
          element={
            <FormTemplate progress={45}>
              <CarMakeTwo />
            </FormTemplate>
          }
        />

        <Route
          path="/car-model-two"
          element={
            <FormTemplate progress={50}>
              <CarModelTwo />
            </FormTemplate>
          }
        />

        <Route
          path="/vehicle-data-two"
          element={
            <FormTemplate progress={55}>
              <VehicleDataTwo />
            </FormTemplate>
          }
        />

        <Route
          path="/vehicle-usage-two"
          element={
            <FormTemplate progress={60}>
              <VehicleUsageTwo />
            </FormTemplate>
          }
        />

        <Route
          path="/vehicle-profile"
          element={
            <FormTemplate progress={60}>
              <VehicleProfile />
            </FormTemplate>
          }
        />

        {/* Insurance */}
        <Route
          path="/current-insurance"
          element={
            <FormTemplate progress={75}>
              <CurrentInsurance />
            </FormTemplate>
          }
        />
        <Route
          path="/insurance-details"
          element={
            <FormTemplate progress={80}>
              <InsuranceDetails />
            </FormTemplate>
          }
        />
        <Route
          path="/policy"
          element={
            <FormTemplate progress={85}>
              <Policy />
            </FormTemplate>
          }
        />

        <Route
          path="/profile"
          element={
            <FormTemplate progress={99}>
              <Profile />
            </FormTemplate>
          }
        />
        <Route
          path="/submitting"
          element={
            <MainLayout>
              <Submitting />
            </MainLayout>
          }
        />
        <Route
          path="/thank-you"
          element={
            <MainLayout>
              <ThankYouPage />
            </MainLayout>
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
