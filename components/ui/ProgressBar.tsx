import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "success";
}

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

const variantClasses = {
  primary: "from-primary-500 to-primary-400",
  secondary: "from-secondary-500 to-secondary-400",
  success: "from-success-500 to-success-400",
};

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
  size = "md",
  variant = "primary",
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1 flex items-center justify-between">
          <span className="text-caption text-foreground-subtle">{percentage}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-background-muted",
          sizeClasses[size]
        )}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full bg-gradient-to-r",
            variantClasses[variant]
          )}
        />
      </div>
    </div>
  );
}
