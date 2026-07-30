import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LessonProgress } from "@/lib/types";

/* ============================================================
   useProgressStore — Lesson progress matrix & roadmap completion
   Persists to localStorage via Zustand persist middleware.
   ============================================================ */

interface ProgressState {
  /** Map of lessonId -> progress data */
  lessons: Record<string, LessonProgress>;

  // Actions
  markLessonAccessed: (lessonId: string) => void;
  markLessonCompleted: (lessonId: string) => void;
  setQuizScore: (lessonId: string, score: number) => void;
  markPracticeCompleted: (lessonId: string) => void;
  resetLesson: (lessonId: string) => void;
  getLessonProgress: (lessonId: string) => LessonProgress | undefined;
  isLessonCompleted: (lessonId: string) => boolean;
  getCompletedCount: (totalLessonIds: string[]) => number;
  getCompletionPercentage: (totalLessonIds: string[]) => number;
  getQuizScore: (lessonId: string) => number | null;
  isPracticeCompleted: (lessonId: string) => boolean;
  resetAllProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      lessons: {},

      markLessonAccessed: (lessonId) =>
        set((state) => ({
          lessons: {
            ...state.lessons,
            [lessonId]: {
              lessonId,
              completed: state.lessons[lessonId]?.completed ?? false,
              quizScore: state.lessons[lessonId]?.quizScore ?? null,
              practiceCompleted:
                state.lessons[lessonId]?.practiceCompleted ?? false,
              lastAccessed: Date.now(),
            },
          },
        })),

      markLessonCompleted: (lessonId) =>
        set((state) => ({
          lessons: {
            ...state.lessons,
            [lessonId]: {
              lessonId,
              completed: true,
              quizScore: state.lessons[lessonId]?.quizScore ?? null,
              practiceCompleted:
                state.lessons[lessonId]?.practiceCompleted ?? true,
              lastAccessed: Date.now(),
            },
          },
        })),

      setQuizScore: (lessonId, score) =>
        set((state) => ({
          lessons: {
            ...state.lessons,
            [lessonId]: {
              lessonId,
              completed: state.lessons[lessonId]?.completed ?? false,
              quizScore: score,
              practiceCompleted:
                state.lessons[lessonId]?.practiceCompleted ?? false,
              lastAccessed: Date.now(),
            },
          },
        })),

      markPracticeCompleted: (lessonId) =>
        set((state) => ({
          lessons: {
            ...state.lessons,
            [lessonId]: {
              lessonId,
              completed: state.lessons[lessonId]?.completed ?? false,
              quizScore: state.lessons[lessonId]?.quizScore ?? null,
              practiceCompleted: true,
              lastAccessed: Date.now(),
            },
          },
        })),

      resetLesson: (lessonId) =>
        set((state) => {
          const newLessons = { ...state.lessons };
          delete newLessons[lessonId];
          return { lessons: newLessons };
        }),

      getLessonProgress: (lessonId) => get().lessons[lessonId],

      isLessonCompleted: (lessonId) =>
        get().lessons[lessonId]?.completed ?? false,

      getCompletedCount: (totalLessonIds) =>
        totalLessonIds.filter((id) => get().lessons[id]?.completed).length,

      getCompletionPercentage: (totalLessonIds) => {
        if (totalLessonIds.length === 0) return 0;
        const completed = totalLessonIds.filter(
          (id) => get().lessons[id]?.completed
        ).length;
        return Math.round((completed / totalLessonIds.length) * 100);
      },

      getQuizScore: (lessonId) => get().lessons[lessonId]?.quizScore ?? null,

      isPracticeCompleted: (lessonId) =>
        get().lessons[lessonId]?.practiceCompleted ?? false,

      resetAllProgress: () => set({ lessons: {} }),
    }),
    {
      name: "algorithmia-progress-storage",
    }
  )
);
