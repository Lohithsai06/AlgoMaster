/* ============================================================
   Algorithmia — Core Type Definitions
   These types define the shape of all data across the platform.
   ============================================================ */

/* ---------- Theme & User Preferences ---------- */
export type Theme = "light" | "dark" | "system";
export type CodeLanguage = "javascript" | "python" | "java" | "cpp";
export type FontSize = "sm" | "base" | "lg";

/* ---------- Difficulty ---------- */
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

/* ---------- Lesson Progress ---------- */
export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  quizScore: number | null;
  practiceCompleted: boolean;
  lastAccessed: number;
}

/* ---------- Workspace ---------- */
export interface LessonNote {
  content: string;
  updatedAt: number;
}

/* ---------- Quiz Types ---------- */
export type QuizQuestionType =
  | "multiple-choice"
  | "fill-in-the-blank"
  | "true-false";

export interface QuizOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  options?: QuizOption[];
  correctAnswer?: string;
  explanation: string;
}

/* ---------- Practice Exercise Types ---------- */
export type PracticeType =
  | "dry-run"
  | "prediction"
  | "multiple-choice"
  | "fill-in-the-blank"
  | "structured-coding";

export interface PracticeExercise {
  id: string;
  type: PracticeType;
  title: string;
  description: string;
  /** For dry-run: the array or data state to trace through */
  initialData?: unknown;
  /** For prediction: the question prompt */
  prompt?: string;
  /** For multiple-choice */
  options?: string[];
  correctAnswer?: string;
  /** For structured-coding: the starter code and instructions */
  starterCode?: string;
  expectedOutput?: string;
  /** Explanation shown after answering */
  explanation: string;
}

/* ---------- Visualization Engine ---------- */
export type VisualizerEngine =
  | "array"
  | "tree"
  | "graph"
  | "matrix"
  | "stack-queue";

export interface PredictionPrompt {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ExecutionFrame {
  /** Snapshot of the data structure at this step */
  dataState: unknown;
  /** Indices currently being compared/active */
  activeIndices: number[];
  /** Indices that have been sorted/finalized */
  sortedIndices?: number[];
  /** Pseudocode line numbers to highlight */
  highlightedLines: number[];
  /** Code line numbers to highlight (1-indexed) */
  highlightedCodeLines?: number[];
  /** Teacher-mode explanation for this step */
  teacherExplanation: string;
  /** Optional prediction gate — pauses learner and asks them to predict */
  predictionPrompt?: PredictionPrompt;
  /** Optional label for this step (e.g. "Pass 1, Comparison 3") */
  stepLabel?: string;
}

export interface VisualizationConfig {
  engine: VisualizerEngine;
  initialData: unknown;
  executionFrames: ExecutionFrame[];
}

/* ---------- Complexity Analysis ---------- */
export interface ComplexityInfo {
  best: string;
  average: string;
  worst: string;
  space: string;
  /** Optional explanation of why the complexity is what it is */
  explanation?: string;
}

/* ---------- Multi-Language Code ---------- */
export interface MultiLangCode {
  javascript: string;
  python: string;
  java: string;
  cpp: string;
}

/* ---------- Lesson Data (JSON Schema) ---------- */
export interface ILessonData {
  id: string;
  title: string;
  chapterId: string;
  difficulty: Difficulty;
  estimatedTime: string;
  objectives: string[];
  prerequisites: { title: string; link: string }[];
  introduction: string;
  whyItMatters: {
    realWorld: string;
    industryApplication: string;
  };
  theory: {
    paragraphs: string[];
    diagramType: string;
  };
  realLifeAnalogy: {
    title: string;
    description: string;
  };
  dryRun: {
    initialState: unknown;
    steps: { description: string; state: unknown }[];
  };
  visualizationConfig: VisualizationConfig;
  pseudocode: string[];
  multiLangCode: MultiLangCode;
  complexity: ComplexityInfo;
  practiceExercises: PracticeExercise[];
  quiz: QuizQuestion[];
  nextLessonId: string | null;
}

/* ---------- Chapter / Roadmap ---------- */
export interface ChapterLesson {
  id: string;
  title: string;
  difficulty: Difficulty;
  estimatedTime: string;
  locked: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedTime: string;
  lessons: ChapterLesson[];
}

/* ---------- Roadmap ---------- */
export interface RoadmapChapter {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "locked";
  lessons: { id: string; title: string; locked: boolean }[];
}
