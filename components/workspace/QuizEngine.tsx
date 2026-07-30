"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Award, RotateCcw, ChevronRight } from "lucide-react";
import type { QuizQuestion } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";

/* ============================================================
   QuizEngine — Renders quiz questions, tracks answers,
   shows explanations, and computes final score.
   ============================================================ */

interface QuizEngineProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export function QuizEngine({ questions, onComplete }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  function handleAnswer(optionId: string) {
    setAnswers({ ...answers, [question.id]: optionId });
    setShowExplanation(true);
  }

  function handleTextAnswer(value: string) {
    setAnswers({ ...answers, [question.id]: value });
  }

  function handleNext() {
    setShowExplanation(false);
    if (isLast) {
      const correctCount = questions.filter((q) => {
        if (q.type === "fill-in-the-blank") {
          return answers[q.id]?.trim().toLowerCase() === q.correctAnswer?.toLowerCase();
        }
        const selected = answers[q.id];
        const correct = q.options?.find((o) => o.id === selected);
        return correct?.isCorrect ?? false;
      }).length;
      const score = Math.round((correctCount / questions.length) * 100);
      setShowResults(true);
      onComplete(score);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setAnswers({});
    setShowExplanation(false);
    setShowResults(false);
  }

  // Results screen
  if (showResults) {
    const correctCount = questions.filter((q) => {
      if (q.type === "fill-in-the-blank") {
        return answers[q.id]?.trim().toLowerCase() === q.correctAnswer?.toLowerCase();
      }
      const selected = answers[q.id];
      const correct = q.options?.find((o) => o.id === selected);
      return correct?.isCorrect ?? false;
    }).length;
    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= 70;

    return (
      <Card className="p-6 text-center">
        <div
          className={cn(
            "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full",
            passed ? "bg-success-100 dark:bg-success-900/40" : "bg-warning-100 dark:bg-warning-900/40"
          )}
        >
          <Award className={cn("h-8 w-8", passed ? "text-success-500" : "text-warning-500")} />
        </div>
        <h3 className="text-h3 font-semibold">
          {passed ? "Great work!" : "Keep practicing!"}
        </h3>
        <p className="mt-2 text-body-lg text-foreground-muted">
          You scored <span className="font-bold text-foreground">{correctCount}</span> out of{" "}
          <span className="font-bold text-foreground">{questions.length}</span>
        </p>
        <p className="mt-1 text-h3 font-bold text-primary-500">{score}%</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={handleRestart}>
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      {/* Progress indicator */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-caption font-medium text-foreground-muted">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 w-6 rounded-full transition-colors",
                i < currentIndex
                  ? "bg-success-500"
                  : i === currentIndex
                    ? "bg-primary-500"
                    : "bg-background-muted"
              )}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="mb-4 text-subheading font-semibold">{question.question}</h3>

          {/* Multiple choice / True-False */}
          {(question.type === "multiple-choice" || question.type === "true-false") && question.options && (
            <div className="flex flex-col gap-2">
              {question.options.map((option) => {
                const isSelected = answers[question.id] === option.id;
                const isCorrect = option.isCorrect;
                const showResult = showExplanation && isSelected;

                return (
                  <button
                    key={option.id}
                    onClick={() => !showExplanation && handleAnswer(option.id)}
                    disabled={showExplanation}
                    className={cn(
                      "flex items-center justify-between rounded-lg border px-4 py-3 text-left text-body transition-all",
                      !showExplanation && isSelected && "border-primary-500 bg-primary-100 dark:bg-primary-900/40",
                      !showExplanation && !isSelected && "border-border bg-card hover:border-border-strong",
                      showExplanation && isCorrect && "border-success-500 bg-success-100 dark:bg-success-900/40",
                      showResult && !isCorrect && "border-danger-500 bg-danger-100 dark:bg-danger-900/40",
                      showExplanation && !isSelected && !isCorrect && "border-border opacity-60"
                    )}
                  >
                    <span>{option.label}</span>
                    {showExplanation && isCorrect && <Check className="h-5 w-5 text-success-600" />}
                    {showResult && !isCorrect && <X className="h-5 w-5 text-danger-600" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Fill in the blank */}
          {question.type === "fill-in-the-blank" && (
            <div>
              <input
                type="text"
                value={answers[question.id] || ""}
                onChange={(e) => handleTextAnswer(e.target.value)}
                disabled={showExplanation}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && answers[question.id] && !showExplanation) {
                    setShowExplanation(true);
                  }
                }}
                placeholder="Type your answer..."
                className={cn(
                  "w-full rounded-lg border px-4 py-3 text-body outline-none transition-all",
                  showExplanation
                    ? answers[question.id]?.trim().toLowerCase() === question.correctAnswer?.toLowerCase()
                      ? "border-success-500 bg-success-100 dark:bg-success-900/40"
                      : "border-danger-500 bg-danger-100 dark:bg-danger-900/40"
                    : "border-border bg-card focus:border-primary-500"
                )}
              />
              {!showExplanation && (
                <Button
                  className="mt-3"
                  size="sm"
                  onClick={() => answers[question.id] && setShowExplanation(true)}
                  disabled={!answers[question.id]}
                >
                  Submit Answer
                </Button>
              )}
            </div>
          )}

          {/* Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 overflow-hidden"
            >
              <div className="rounded-lg bg-background-subtle p-4">
                <p className="text-body text-foreground-muted">
                  <span className="font-semibold text-foreground">Explanation: </span>
                  {question.explanation}
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={handleNext} size="sm">
                  {isLast ? "See Results" : "Next Question"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </Card>
  );
}
