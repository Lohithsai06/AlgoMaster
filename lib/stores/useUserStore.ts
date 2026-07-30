import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theme, CodeLanguage, FontSize } from "@/lib/types";

/* ============================================================
   useUserStore — User preferences & streak tracking
   Persists to localStorage via Zustand persist middleware.
   ============================================================ */

interface UserState {
  theme: Theme;
  preferredLanguage: CodeLanguage;
  globalAnimationSpeed: number; // 0.5, 1, 2
  fontSizePreference: FontSize;
  dailyStreak: number;
  lastActiveDate: string | null;

  // Actions
  setTheme: (theme: Theme) => void;
  setPreferredLanguage: (lang: CodeLanguage) => void;
  setGlobalAnimationSpeed: (speed: number) => void;
  setFontSizePreference: (size: FontSize) => void;
  updateStreak: () => void;
}

/**
 * Updates the daily streak based on the last active date.
 * - Same day: no change
 * - Consecutive day: increment
 * - Gap > 1 day: reset to 1
 */
function calculateNewStreak(
  currentStreak: number,
  lastActiveDate: string | null
): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split("T")[0];

  if (lastActiveDate === todayStr) return currentStreak;

  if (lastActiveDate) {
    const lastDate = new Date(lastActiveDate + "T00:00:00");
    lastDate.setHours(0, 0, 0, 0);
    const diffMs = today.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return currentStreak + 1;
    if (diffDays === 0) return currentStreak;
  }

  return 1;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      theme: "system",
      preferredLanguage: "javascript",
      globalAnimationSpeed: 1,
      fontSizePreference: "base",
      dailyStreak: 0,
      lastActiveDate: null,

      setTheme: (theme) => set({ theme }),
      setPreferredLanguage: (preferredLanguage) =>
        set({ preferredLanguage }),
      setGlobalAnimationSpeed: (globalAnimationSpeed) =>
        set({ globalAnimationSpeed }),
      setFontSizePreference: (fontSizePreference) =>
        set({ fontSizePreference }),
      updateStreak: () =>
        set((state) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const todayStr = today.toISOString().split("T")[0];

          if (state.lastActiveDate === todayStr) return state;

          const newStreak = calculateNewStreak(
            state.dailyStreak,
            state.lastActiveDate
          );

          return {
            dailyStreak: newStreak,
            lastActiveDate: todayStr,
          };
        }),
    }),
    {
      name: "algorithmia-user-storage",
    }
  )
);
