import { Button } from "@heroui/react";
import { Phone } from "lucide-react";

export default function CTA() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-8 mb-12 bg-content1 rounded-xl">
      <div className="px-6 py-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Want to talk to an agent?</h2>

        <Button
          href="tel:8005700899"
          size="lg"
          startContent={<Phone className="w-5 h-5" />}
          className="mb-6 text-lg font-semibold bg-primary text-background"
        >
          (800) 570-0899
        </Button>

        <p className="leading-relaxed text-md">
          Get a quote over the phone! We have agents standing by to answer your
          questions and get you a free quote for your Auto Insurance today!
        </p>
      </div>
    </div>
  );
}
