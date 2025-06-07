import React from "react";
import { Card, CardBody, CardHeader, Progress } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import CTA from "./CTA";
import Footer from "./Footer";
import Nav from "./Navbar";

interface FormTemplateProps {
  children: React.ReactNode;
  progress: number;
  title?: string;
}

export default function FormTemplate({
  children,
  progress,
  title,
}: FormTemplateProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Nav />
      <div className="flex items-center justify-center flex-grow px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={title} // Use title as key to trigger animation on step change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-3xl"
          >
            <Card className="shadow-2xl">
              <CardHeader className="flex flex-col gap-2 p-6">
                {title && (
                  <h1 className="text-2xl font-bold text-center">{title}</h1>
                )}
                <Progress
                  value={progress}
                  className="w-full"
                  color="success"
                  showValueLabel={true}
                  size="md"
                />
              </CardHeader>
              <CardBody className="p-6">{children}</CardBody>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
      <CTA />
      <Footer />
    </div>
  );
}
