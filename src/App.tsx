import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./components/main-ui/MainLayout";
import { ThemeProvider } from "./utils/theme-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonalInfo from "./form/PersonalInformation";
import FormTemplate from "./components/main-ui/FormTemplate";
import Address from "./form/Address";
import Identity from "./form/Identity";
import History from "./form/History";
import Risk from "./form/Risk";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        stacked={true}
        closeOnClick={true}
        theme="colored"
      />

      <ThemeProvider>
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

          <Route path="/c2c" element={<Number />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
