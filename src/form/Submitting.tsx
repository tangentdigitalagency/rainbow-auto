import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/insurance.json";

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
  const navigate = useNavigate();

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

  // Handle navigation
  useEffect(() => {
    const navigationTimeout = setTimeout(() => {
      navigate("/thank-you");
    }, 7000);

    return () => clearTimeout(navigationTimeout);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="space-y-8 text-center">
        <div className="w-64 h-64 mx-auto">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            className="w-full h-full"
          />
        </div>

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
          className="w-64 h-1 overflow-hidden rounded-full bg-primary/20"
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
