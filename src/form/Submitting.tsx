import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/insurance.json";
import useFormData from "@/data/useFormData";

const messages = [
  "Summoning the insurance wizards...",
  "Brewing the perfect policy potion...",
  "Consulting with our crystal ball...",
  "Training our quote-finding dragons...",
  "Polishing our magic insurance mirror...",
  "Warming up our quote-o-matic machine...",
  "Feeding our policy-predicting hamsters...",
  "Untangling the insurance web...",
  "Charging our quote-ray gun...",
  "Dusting off our magic insurance wand...",
  "Teaching our quote-finding owls to fly...",
  "Brewing a fresh pot of insurance tea...",
  "Consulting with our insurance fortune cookies...",
  "Waking up our sleeping policy gnomes...",
  "Untangling our insurance spaghetti...",
  "Feeding our quote-finding unicorns...",
  "Polishing our insurance crystal ball...",
  "Teaching our policy-finding cats to purr...",
  "Brewing our special insurance coffee...",
  "Warming up our quote-finding toaster...",
];

export default function Submitting() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();

  useEffect(() => {
    const submitForm = async () => {
      if (isSubmitting) return;
      setIsSubmitting(true);

      const params = new URLSearchParams({
        CampaignId: "335089462252FC642798C12C760C4FC0",
        IsTest: "True",
        FirstName: formData.firstName || "",
        LastName: formData.lastName || "",
        Email: formData.email || "",
        Phone: formData.phone || "",
        Address1: formData.address1 || "",
        Address2: formData.address2 || "",
        City: formData.city || "",
        State: formData.state || "",
        Zip: formData.zipcode?.toString() || "",
        DriverOneFirstName: formData.driverOneFirstName || "",
        DriverOneLastName: formData.driverOneLastName || "",
        DriverOneDateOfBirth: formData.driverOneDOB || "",
        DriverOneGender: formData.driverOneGender || "",
        DriverOneResidence: formData.driverOneResidence || "",
        DriverOneYearsAtResidence: formData.driverOneYearAtResidence || "",
        DriverOneCredit: formData.driverOneCredit || "",
        DriverOneRelationship: formData.driverOneRelationship || "",
        DriverOneMaritalStatus: formData.driverOneMaritalStatus || "",
        DriverOneOccupation: formData.driverOneOccupation || "",
        DriverOneAgeLicensed: formData.driverOneAgedLicensed || "",
        DriverOneLicenseState: formData.driverOneLicenseState || "",
        DriverOneSuspended: formData.driverOneSuspended || "",
        DriverOneFilingRequired: formData.driverOneFilingRequired || "",
        DriverOneDUI: formData.driverOneDUI || "",
        DriverTwoFirstName: formData.driverTwoFirstName || "",
        DriverTwoLastName: formData.driverTwoLastName || "",
        DriverTwoDateOfBirth: formData.driverTwoDOB || "",
        DriverTwoGender: formData.driverTwoGender || "",
        DriverTwoCredit: formData.driverTwoCredit || "",
        DriverTwoOccupation: formData.driverTwoOccupation || "",
        DriverTwoLicenseStatus: formData.driverTwoLicenseStatus || "",
        DriverTwoSuspended: formData.driverTwoSuspended || "",
        DriverTwoFilingRequired: formData.driverTwoFilingRequired || "",
        DriverTwoLicenseState: formData.driverTwoLicenseState || "",
        CurrentlyInsured: formData.currentlyInsured || "",
        RequestedCoverageType: formData.requestedCoverageType || "",
        CurrentProvider: formData.currentProvider || "",
        Bodily: formData.bodily || "",
        Property: formData.property || "",
        VehicleOneYear: formData.vehicleOneYear || "",
        VehicleOneMake: formData.vehicleOneMake || "",
        VehicleOneModel: formData.vehicleOneModel || "",
        VehicleOneOwnership: formData.vehicleOneOwnership || "",
        VehicleOneSecurity: formData.vehicleOneSecurity || "",
        VehicleOnePrimaryUsage: formData.vehicleOnePrimaryUsage || "",
        VehicleOneOneWayDistance: formData.vehicleOneOneWayDistance || "",
        VehicleOneAnnualMiles: formData.vehicleOneAnnualMiles || "",
        VehicleOneStorage: formData.vehicleOneStorage || "",
        VehicleOneComprehensive: formData.vehicleOneComprehensive || "",
        VehicleOneCollision: formData.vehicleOneCollision || "",
        VehicleTwoYear: formData.vehicleTwoYear || "",
        VehicleTwoMake: formData.vehicleTwoMake || "",
        VehicleTwoModel: formData.vehicleTwoModel || "",
        VehicleTwoOwnership: formData.vehicleTwoOwnership || "",
        VehicleTwoSecurity: formData.vehicleTwoSecurity || "",
        VehicleTwoPrimaryUsage: formData.vehicleTwoPrimaryUsage || "",
        VehicleTwoOneWayDistance: formData.vehicleTwoOneWayDistance || "",
        VehicleTwoAnnualMiles: formData.vehicleTwoAnnualMiles || "",
        VehicleTwoStorage: formData.vehicleTwoStorage || "",
        VehicleTwoComprehensive: formData.vehicleTwoComprehensive || "",
        VehicleTwoCollision: formData.vehicleTwoCollision || "",
        IPAddress: "",
        UserAgent: navigator.userAgent,
        SourceURL: window.location.href,
        TCPA: "Yes",
        TCPAText:
          "By clicking Continue below, I expressly provide my E-SIGN signature and consent to receive marketing calls, texts, and emails regarding insurance, from or on behalf of USAA at the phone number and email address I provided, including via automatic telephone dialing system or artificial or prerecorded voice messages, even if my number is on a federal, state, or company Do-Not-Call List. I understand that my consent is not a condition of purchasing any goods or services. By clicking Get Quote, above, I affirm that I have read and agree to the Terms & conditions and Privacy policy including the arbitration provision and the E-SIGN Consent.",
      });

      try {
        const response = await fetch(
          `https://sag.leadcapsule.com/Leads/LeadPost.aspx?${params.toString()}`,
          {
            method: "POST",
            mode: "no-cors",
          }
        );

        console.log("Form submission response:", response);
        // Update last completed step
        updateFormData({
          lastCompletedStep: "/thank-you",
        });

        // Don't navigate here - let the timeout handle it
      } catch (error) {
        console.error("Error submitting form:", error);
        navigate("/sorry");
      }
    };

    submitForm();
  }, []); // Empty dependency array since we only want to submit once

  // Handle message rotation
  useEffect(() => {
    const messageInterval = setInterval(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * messages.length);
      } while (newIndex === currentMessageIndex);
      setCurrentMessageIndex(newIndex);
    }, 2500);

    return () => clearInterval(messageInterval);
  }, [currentMessageIndex]);

  // Handle navigation after 7 seconds
  useEffect(() => {
    const navigationTimeout = setTimeout(() => {
      navigate("/thank-you");
    }, 7000);

    return () => clearTimeout(navigationTimeout);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="space-y-8 text-center">
        <div className="mx-auto w-64 h-64">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            className="w-full h-full"
          />
        </div>
cc
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold text-primary"
          >
            {messages[currentMessageIndex]}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="overflow-hidden w-64 h-1 rounded-full bg-primary/20"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 7, ease: "linear" }}
        >
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 7, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
