import type { Chapter, RoadmapChapter } from "@/lib/types";
import { arraysLesson } from "./lessons/arrays-introduction";
import { bubbleSortLesson } from "./lessons/bubble-sort";

/* ============================================================
   Roadmap & Chapter Data
   The complete learning pathway. Two lessons are unlocked
   (Introduction to Arrays, Bubble Sort). All others are locked
   placeholders that use the same architecture.
   ============================================================ */

export const chapters: Chapter[] = [
  {
    id: "basics",
    title: "Programming Basics",
    description: "Variables, loops, conditionals, and functions — the building blocks of every algorithm.",
    difficulty: "Beginner",
    estimatedTime: "2 hours",
    lessons: [
      { id: "basics-variables", title: "Variables & Data Types", difficulty: "Beginner", estimatedTime: "15 min", locked: true },
      { id: "basics-conditionals", title: "Conditionals & Logic", difficulty: "Beginner", estimatedTime: "15 min", locked: true },
      { id: "basics-loops", title: "Loops & Iteration", difficulty: "Beginner", estimatedTime: "20 min", locked: true },
      { id: "basics-functions", title: "Functions & Scope", difficulty: "Beginner", estimatedTime: "20 min", locked: true },
    ],
  },
  {
    id: "arrays",
    title: "Arrays",
    description: "The most fundamental data structure — contiguous memory, O(1) access, and the foundation for everything else.",
    difficulty: "Beginner",
    estimatedTime: "1.5 hours",
    lessons: [
      { id: "arrays-introduction", title: "Introduction to Arrays", difficulty: "Beginner", estimatedTime: "20 min", locked: false },
      { id: "arrays-traversal", title: "Array Traversal Patterns", difficulty: "Beginner", estimatedTime: "15 min", locked: true },
      { id: "arrays-2d", title: "2D Arrays & Matrices", difficulty: "Intermediate", estimatedTime: "25 min", locked: true },
      { id: "arrays-dynamic", title: "Dynamic Arrays", difficulty: "Intermediate", estimatedTime: "20 min", locked: true },
    ],
  },
  {
    id: "strings",
    title: "Strings",
    description: "Character arrays, string manipulation, and pattern matching fundamentals.",
    difficulty: "Beginner",
    estimatedTime: "2 hours",
    lessons: [
      { id: "strings-introduction", title: "Introduction to Strings", difficulty: "Beginner", estimatedTime: "15 min", locked: true },
      { id: "strings-manipulation", title: "String Manipulation", difficulty: "Beginner", estimatedTime: "20 min", locked: true },
      { id: "strings-patterns", title: "Pattern Matching Basics", difficulty: "Intermediate", estimatedTime: "25 min", locked: true },
    ],
  },
  {
    id: "searching",
    title: "Searching",
    description: "Linear search, binary search, and the power of sorted data.",
    difficulty: "Beginner",
    estimatedTime: "1.5 hours",
    lessons: [
      { id: "searching-linear", title: "Linear Search", difficulty: "Beginner", estimatedTime: "15 min", locked: true },
      { id: "searching-binary", title: "Binary Search", difficulty: "Intermediate", estimatedTime: "25 min", locked: true },
      { id: "searching-applications", title: "Search Applications", difficulty: "Intermediate", estimatedTime: "20 min", locked: true },
    ],
  },
  {
    id: "sorting",
    title: "Sorting",
    description: "From bubble sort to quicksort — understanding comparison-based sorting and why it matters.",
    difficulty: "Beginner",
    estimatedTime: "3 hours",
    lessons: [
      { id: "sorting-bubble-sort", title: "Bubble Sort", difficulty: "Beginner", estimatedTime: "25 min", locked: false },
      { id: "sorting-selection", title: "Selection Sort", difficulty: "Beginner", estimatedTime: "20 min", locked: true },
      { id: "sorting-insertion", title: "Insertion Sort", difficulty: "Beginner", estimatedTime: "20 min", locked: true },
      { id: "sorting-merge", title: "Merge Sort", difficulty: "Intermediate", estimatedTime: "30 min", locked: true },
      { id: "sorting-quick", title: "Quick Sort", difficulty: "Intermediate", estimatedTime: "30 min", locked: true },
    ],
  },
  {
    id: "recursion",
    title: "Recursion",
    description: "The art of solving problems by breaking them into smaller versions of themselves.",
    difficulty: "Intermediate",
    estimatedTime: "2 hours",
    lessons: [
      { id: "recursion-intro", title: "Introduction to Recursion", difficulty: "Intermediate", estimatedTime: "25 min", locked: true },
      { id: "recursion-patterns", title: "Recursion Patterns", difficulty: "Intermediate", estimatedTime: "30 min", locked: true },
      { id: "recursion-backtracking", title: "Backtracking Basics", difficulty: "Advanced", estimatedTime: "35 min", locked: true },
    ],
  },
];

/** Map of lessonId -> lesson data (only unlocked lessons have full content) */
const lessonMap: Record<string, typeof arraysLesson> = {
  "arrays-introduction": arraysLesson,
  "sorting-bubble-sort": bubbleSortLesson,
};

/** Get a lesson by ID. Returns undefined for locked lessons. */
export function getLesson(lessonId: string) {
  return lessonMap[lessonId];
}

/** Get all lesson IDs in order (for progress tracking) */
export function getAllLessonIds(): string[] {
  return chapters.flatMap((ch) => ch.lessons.map((l) => l.id));
}

/** Get the chapter a lesson belongs to */
export function getChapterByLessonId(lessonId: string): Chapter | undefined {
  return chapters.find((ch) => ch.lessons.some((l) => l.id === lessonId));
}

/** Get a chapter by ID */
export function getChapter(chapterId: string): Chapter | undefined {
  return chapters.find((ch) => ch.id === chapterId);
}

/** Build the roadmap with computed status based on progress */
export function getRoadmap(completedLessonIds: string[]): RoadmapChapter[] {
  return chapters.map((ch) => {
    const lessons = ch.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      locked: l.locked,
    }));

    const hasCompleted = lessons.some((l) => completedLessonIds.includes(l.id));
    const hasInProgress = lessons.some(
      (l) => !l.locked && !completedLessonIds.includes(l.id)
    );

    let status: RoadmapChapter["status"] = "locked";
    if (hasCompleted) status = "in-progress";
    if (lessons.every((l) => completedLessonIds.includes(l.id))) status = "completed";
    if (hasInProgress && !hasCompleted) status = "in-progress";
    if (ch.lessons.every((l) => l.locked)) status = "locked";

    return { id: ch.id, title: ch.title, status, lessons };
  });
}
