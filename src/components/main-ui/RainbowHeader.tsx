import React from "react";

interface RainbowHeaderProps {
  title: string;
  description: string;
}

export const RainbowHeader: React.FC<RainbowHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};
