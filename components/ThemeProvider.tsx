"use client";

import { useEffect } from "react";
import { useUserStore } from "@/lib/stores/useUserStore";
import { useTheme } from "@/lib/hooks/useTheme";

/**
 * ThemeProvider — wraps the app and keeps the <html> class in sync
 * with the persisted theme preference. Also updates the daily streak
 * on mount so returning learners keep their streak alive.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useTheme();
  const updateStreak = useUserStore((state) => state.updateStreak);

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  return <>{children}</>;
}
