"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Terminal, Brain, FileText, Code as Code2, Target } from "lucide-react";
import type { PracticeExercise } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

/* ============================================================
   PracticePortal — Renders guided practice exercises.
   Supports: dry-run, prediction, multiple-choice,
   fill-in-the-blank, and structured-coding.
   No code execution — all answers are checked client-side.
   ============================================================ */

interface PracticePortalProps {
  exercises: PracticeExercise[];
  onComplete: () => void;
}

const typeIcons: Record<string, typeof Terminal> = {
  "dry-run": FileText,
  "prediction": Brain,
  "multiple-choice": Target,
  "fill-in-the-blank": Terminal,
  "structured-coding": Code2,
};

export function PracticePortal({ exercises, onComplete }: PracticePortalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const exercise = exercises[currentIndex];
  if (!exercise) return null;
  const isLast = currentIndex === exercises.length - 1;
  const Icon = typeIcons[exercise.type] || Target;

  function handleAnswer(value: string) {
    setAnswers({ ...answers, [exercise.id]: value });
  }

  function handleSubmit() {
    setShowExplanation(true);
    const userAnswer = (answers[exercise.id] || "").trim().toLowerCase();
    const correctAnswer = (exercise.correctAnswer || "").trim().toLowerCase();
    if (userAnswer === correctAnswer) {
      // Correct answer tracked by parent via onComplete
    }
  }

  function handleNext() {
    setShowExplanation(false);
    if (isLast) {
      onComplete();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  const isCorrect = (answers[exercise.id] || "").trim().toLowerCase() === (exercise.correctAnswer || "").trim().toLowerCase();

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-subheading font-semibold">{exercise.title}</h3>
          <span className="text-caption text-foreground-muted capitalize">
            {exercise.type.replace(/-/g, " ")} exercise
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4 flex items-center gap-1.5">
        {exercises.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 w-6 rounded-full transition-colors",
              i < currentIndex ? "bg-success-500" : i === currentIndex ? "bg-primary-500" : "bg-background-muted"
            )}
          >
          </div>
        ))}
        <span className="ml-2 text-caption text-foreground-muted">
          {currentIndex + 1} / {exercises.length}
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 text-body text-foreground-muted">{exercise.description}</p>

      {/* Dry run — show initial data */}
      {exercise.type === "dry-run" && exercise.initialData != null && (
        <div className="mb-4 rounded-lg bg-background-subtle p-4">
          <p className="mb-2 text-caption font-medium text-foreground-muted">Given data:</p>
          <p className="font-mono text-body font-semibold">
            {JSON.stringify(exercise.initialData)}
          </p>
        </div>
      )}

      {/* Prediction / Multiple choice — show options */}
      {(exercise.type === "prediction" || exercise.type === "multiple-choice") && exercise.options && (
        <div className="flex flex-col gap-2">
          {exercise.options.map((option) => {
            const isSelected = answers[exercise.id] === option;
            const isCorrectOption = option === exercise.correctAnswer;
            const showResult = showExplanation && isSelected;

            return (
              <button
                key={option}
                onClick={() => !showExplanation && handleAnswer(option)}
                disabled={showExplanation}
                className={cn(
                  "flex items-center justify-between rounded-lg border px-4 py-3 text-left text-body transition-all",
                  !showExplanation && isSelected && "border-primary-500 bg-primary-100 dark:bg-primary-900/40",
                  !showExplanation && !isSelected && "border-border bg-card hover:border-border-strong",
                  showExplanation && isCorrectOption && "border-success-500 bg-success-100 dark:bg-success-900/40",
                  showResult && !isCorrectOption && "border-danger-500 bg-danger-100 dark:bg-danger-900/40",
                  showExplanation && !isSelected && !isCorrectOption && "border-border opacity-60"
                )}
              >
                <span>{option}</span>
                {showExplanation && isCorrectOption && <Check className="h-5 w-5 text-success-600" />}
                {showResult && !isCorrectOption && <X className="h-5 w-5 text-danger-600" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Fill in the blank */}
      {exercise.type === "fill-in-the-blank" && (
        <input
          type="text"
          value={answers[exercise.id] || ""}
          onChange={(e) => handleAnswer(e.target.value)}
          disabled={showExplanation}
          onKeyDown={(e) => e.key === "Enter" && answers[exercise.id] && handleSubmit()}
          placeholder="Type your answer..."
          className={cn(
            "w-full rounded-lg border px-4 py-3 text-body outline-none transition-all",
            showExplanation
              ? isCorrect
                ? "border-success-500 bg-success-100 dark:bg-success-900/40"
                : "border-danger-500 bg-danger-100 dark:bg-danger-900/40"
              : "border-border bg-card focus:border-primary-500"
          )}
        />
      )}

      {/* Structured coding — show starter code */}
      {exercise.type === "structured-coding" && exercise.starterCode && (
        <div>
          <p className="mb-2 text-caption font-medium text-foreground-muted">Starter code:</p>
          <pre className="rounded-lg border border-border bg-neutral-950 p-4 font-mono text-caption text-neutral-300 overflow-x-auto">
            {exercise.starterCode}
          </pre>
          <textarea
            value={answers[exercise.id] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            disabled={showExplanation}
            placeholder="Write your solution here..."
            rows={6}
            className={cn(
              "mt-3 w-full rounded-lg border px-4 py-3 font-mono text-caption outline-none transition-all",
              showExplanation
                ? "border-success-500 bg-success-100 dark:bg-success-900/40"
                : "border-border bg-card focus:border-primary-500"
            )}
          />
          {showExplanation && (
            <p className="mt-2 text-caption text-foreground-muted">
              Expected: {exercise.expectedOutput}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between">
        {!showExplanation ? (
          <Button
            onClick={handleSubmit}
            disabled={!answers[exercise.id]}
            size="sm"
          >
            Submit Answer
          </Button>
        ) : (
          <div className="flex w-full items-center justify-between">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex-1 mr-4 overflow-hidden"
              >
                <div
                  className={cn(
                    "rounded-lg p-3 text-body",
                    isCorrect
                      ? "bg-success-100 text-success-800 dark:bg-success-900/40 dark:text-success-300"
                      : "bg-danger-100 text-danger-800 dark:bg-danger-900/40 dark:text-danger-300"
                  )}
                >
                  <span className="font-medium">{isCorrect ? "Correct! " : "Not quite. "}</span>
                  {exercise.explanation}
                </div>
              </motion.div>
            </AnimatePresence>
            <Button onClick={handleNext} size="sm" variant="secondary">
              {isLast ? "Finish Practice" : "Next Exercise"}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
