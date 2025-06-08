import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

const ThankYouPage = () => {
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState("");
  const [nextContactTime, setNextContactTime] = useState("");

  useEffect(() => {
    const updateMessage = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hour * 60 + minutes;

      // Business hours in minutes
      const weekdayOpenTime = 480; // 8 AM
      const weekdayCloseTime = 1260; // 9 PM
      const saturdayOpenTime = 540; // 9 AM
      const saturdayCloseTime = 1080; // 6 PM

      const isWeekday = day >= 1 && day <= 5;
      const isSaturday = day === 6;

      if (isWeekday) {
        if (currentTime < weekdayOpenTime) {
          const timeUntilOpen = weekdayOpenTime - currentTime;
          const hoursUntilOpen = Math.floor(timeUntilOpen / 60);
          const minutesUntilOpen = timeUntilOpen % 60;
          setCountdown(`${hoursUntilOpen}h ${minutesUntilOpen}m`);
          setMessage("We'll reach out to you when we open");
          setNextContactTime("8:00 AM EST");
        } else if (currentTime >= weekdayCloseTime) {
          setMessage("We'll contact you tomorrow morning");
          setNextContactTime("8:00 AM EST");
        } else {
          setMessage("Our team will contact you shortly");
          setNextContactTime("Within the next hour");
        }
      } else if (isSaturday) {
        if (currentTime < saturdayOpenTime) {
          const timeUntilOpen = saturdayOpenTime - currentTime;
          const hoursUntilOpen = Math.floor(timeUntilOpen / 60);
          const minutesUntilOpen = timeUntilOpen % 60;
          setCountdown(`${hoursUntilOpen}h ${minutesUntilOpen}m`);
          setMessage("We'll reach out to you when we open");
          setNextContactTime("9:00 AM EST");
        } else if (currentTime >= saturdayCloseTime) {
          setMessage("We'll reach out to you Monday morning");
          setNextContactTime("8:00 AM EST");
        } else {
          setMessage("Our team will contact you shortly");
          setNextContactTime("Within the next hour");
        }
      } else {
        setMessage(
          "We're excited to help you! While we're closed today, we can't wait to reach out to you first thing Monday morning."
        );
        setNextContactTime("8:00 AM EST");
      }
    };

    updateMessage();
    const interval = setInterval(updateMessage, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-default-50">
      <div className="container max-w-5xl px-4 py-12 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Success Banner */}
          <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-600">
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20"
                  >
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-2xl font-bold text-white md:text-3xl">
                      Submission Successful!
                    </h1>
                    <p className="text-white/80">{message}</p>
                  </div>
                </div>
                {countdown && (
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/20">
                    <Calendar className="w-5 h-5 text-white" />
                    <span className="font-medium text-white">
                      Opening in: {countdown}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="p-6 shadow-sm bg-content1 rounded-2xl">
            <h2 className="mb-6 text-xl font-semibold text-foreground">
              Business Hours
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Monday - Friday</p>
                  <p className="text-foreground-500">8:00 AM - 9:00 PM EST</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Saturday</p>
                  <p className="text-foreground-500">9:00 AM - 6:00 PM EST</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Sunday</p>
                  <p className="text-foreground-500">Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {/* Contact Timeline */}
            <div className="space-y-6 md:col-span-2">
              <div className="p-6 shadow-sm bg-content1 rounded-2xl">
                <h2 className="mb-6 text-xl font-semibold text-foreground">
                  Your Contact Timeline
                </h2>
                <div className="space-y-4">
                  {/* Initial Contact Card */}
                  <div className="p-4 bg-content2 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          Initial Contact
                        </h3>
                        <p className="text-foreground-500">{nextContactTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quote Delivery Card */}
                  <div className="p-4 bg-content2 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          Quote Delivery
                        </h3>
                        <p className="text-foreground-500">
                          Within 24 hours of contact
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Final Review Card */}
                  <div className="p-4 bg-content2 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          Final Review
                        </h3>
                        <p className="text-foreground-500">
                          Complete your application
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="p-6 shadow-sm bg-content1 rounded-2xl">
              <h2 className="mb-6 text-xl font-semibold text-foreground">
                Next Steps
              </h2>
              <div className="space-y-2">
                {/* Review Step */}
                <div className="p-4 bg-content2 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">
                        1
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">Review</h3>
                      <p className="text-sm text-foreground-500">
                        We'll review your information
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-5 h-5 rotate-90 text-primary" />
                </div>

                {/* Contact Step */}
                <div className="p-4 bg-content2 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">
                        2
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">Contact</h3>
                      <p className="text-sm text-foreground-500">
                        Our team will reach out to you
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-5 h-5 rotate-90 text-primary" />
                </div>

                {/* Quote Step */}
                <div className="p-4 bg-content2 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">
                        3
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">Quote</h3>
                      <p className="text-sm text-foreground-500">
                        Receive your personalized quote
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYouPage;
