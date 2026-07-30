import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LessonNote } from "@/lib/types";

/* ============================================================
   useWorkspaceStore — Bookmarks, notes, and weak topics
   Persists to localStorage via Zustand persist middleware.
   ============================================================ */

interface WorkspaceState {
  bookmarks: string[];
  notes: Record<string, LessonNote>;
  weakTopics: string[];

  // Actions
  toggleBookmark: (lessonId: string) => void;
  isBookmarked: (lessonId: string) => boolean;
  saveNote: (lessonId: string, content: string) => void;
  getNote: (lessonId: string) => LessonNote | undefined;
  deleteNote: (lessonId: string) => void;
  addWeakTopic: (topic: string) => void;
  removeWeakTopic: (topic: string) => void;
  clearWeakTopics: () => void;
  resetAll: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      notes: {},
      weakTopics: [],

      toggleBookmark: (lessonId) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(lessonId)
            ? state.bookmarks.filter((id) => id !== lessonId)
            : [...state.bookmarks, lessonId],
        })),

      isBookmarked: (lessonId) => get().bookmarks.includes(lessonId),

      saveNote: (lessonId, content) =>
        set((state) => ({
          notes: {
            ...state.notes,
            [lessonId]: {
              content,
              updatedAt: Date.now(),
            },
          },
        })),

      getNote: (lessonId) => get().notes[lessonId],

      deleteNote: (lessonId) =>
        set((state) => {
          const newNotes = { ...state.notes };
          delete newNotes[lessonId];
          return { notes: newNotes };
        }),

      addWeakTopic: (topic) =>
        set((state) => ({
          weakTopics: state.weakTopics.includes(topic)
            ? state.weakTopics
            : [...state.weakTopics, topic],
        })),

      removeWeakTopic: (topic) =>
        set((state) => ({
          weakTopics: state.weakTopics.filter((t) => t !== topic),
        })),

      clearWeakTopics: () => set({ weakTopics: [] }),

      resetAll: () => set({ bookmarks: [], notes: {}, weakTopics: [] }),
    }),
    {
      name: "algorithmia-workspace-storage",
    }
  )
);
