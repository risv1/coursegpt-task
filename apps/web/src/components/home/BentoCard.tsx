import React from "react";
import { IconType } from "react-icons";

type BentoCardProps = {
  title: string;
  description: string;
  icon: IconType;
  variant?: "primary" | "secondary";
  className?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  description,
  icon: Icon,
  variant = "primary",
  className = "",
}) => {
  return (
    <div
      className={`
        p-8 rounded-xl border transition-all duration-300
        ${variant === "primary"
          ? "border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800 hover:border-red-400"
          : "border-neutral-300 bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 hover:border-red-400"
        }
        ${className}
      `}
    >
      <div className="text-red-400 mb-4 text-3xl">
        <Icon />
      </div>
      <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">{title}</h3>
      <p className="text-neutral-700 dark:text-neutral-300">{description}</p>
    </div>
  );
};

export default BentoCard;
