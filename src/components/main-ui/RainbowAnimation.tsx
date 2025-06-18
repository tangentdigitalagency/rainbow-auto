import React from "react";

interface RainbowAnimationProps {
  isAnimating: boolean;
  rainbowRef: React.RefObject<HTMLDivElement>;
}

export const RainbowAnimation: React.FC<RainbowAnimationProps> = ({
  isAnimating,
  rainbowRef,
}) => {
  return (
    <div className="relative w-full h-32 mb-8 overflow-hidden">
      <div
        ref={rainbowRef}
        className={`absolute inset-0 transition-opacity duration-500 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 animate-rainbow"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-rainbow-reverse"></div>
      </div>
    </div>
  );
};
