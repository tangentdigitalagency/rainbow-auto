import React from "react";
import { Button } from "../ui/button";

interface RainbowControlsProps {
  isAnimating: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export const RainbowControls: React.FC<RainbowControlsProps> = ({
  isAnimating,
  onStart,
  onStop,
  onReset,
}) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <Button
        onClick={onStart}
        disabled={isAnimating}
        className="bg-green-500 hover:bg-green-600 text-white"
      >
        Start Rainbow
      </Button>
      <Button
        onClick={onStop}
        disabled={!isAnimating}
        className="bg-red-500 hover:bg-red-600 text-white"
      >
        Stop Rainbow
      </Button>
      <Button
        onClick={onReset}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        Reset
      </Button>
    </div>
  );
};
