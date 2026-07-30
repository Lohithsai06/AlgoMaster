"use client";

import { useEffect } from "react";
import { useUserStore } from "@/lib/stores/useUserStore";
import type { Theme } from "@/lib/types";

/**
 * Hook that applies the current theme to the <html> element and
 * listens for system preference changes when theme is set to "system".
 *
 * This runs client-side after hydration and keeps the DOM in sync
 * with the persisted Zustand store. The pre-hydration inline script
 * in layout.tsx handles the initial paint to prevent FOUC.
 */
export function useTheme() {
  const theme = useUserStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    function applyThemeClass(t: Theme) {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const isDark = t === "dark" || (t === "system" && systemDark);
      root.classList.toggle("dark", isDark);
    }

    applyThemeClass(theme);

    // Listen for system changes only when in "system" mode
    if (theme === "system") {
      const mediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

      const handler = () => applyThemeClass("system");
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [theme]);

  return theme;
}
