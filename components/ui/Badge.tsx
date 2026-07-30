import { cn } from "@/lib/utils/cn";
import type { Difficulty } from "@/lib/types";

type BadgeVariant = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "neutral";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-background-muted text-foreground-muted",
  primary: "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400",
  secondary: "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-400",
  success: "bg-success-100 text-success-700 dark:bg-success-900/40 dark:text-success-400",
  warning: "bg-warning-100 text-warning-700 dark:bg-warning-900/40 dark:text-warning-400",
  danger: "bg-danger-100 text-danger-700 dark:bg-danger-900/40 dark:text-danger-400",
  neutral: "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-caption font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

const difficultyVariantMap: Record<Difficulty, BadgeVariant> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "danger",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return <Badge variant={difficultyVariantMap[difficulty]}>{difficulty}</Badge>;
}
