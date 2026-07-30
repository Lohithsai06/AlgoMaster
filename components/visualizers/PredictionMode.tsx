"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Brain, Check, Lightbulb, X } from "lucide-react";
import { useState } from "react";
import type { PredictionPrompt } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

/* ============================================================
   PredictionMode — Interactive gate that pauses the learner
   and asks them to predict the next step before revealing it.
   ============================================================ */

interface PredictionModeProps {
  prompt: PredictionPrompt;
  onResolve: () => void;
}

export function PredictionMode({ prompt, onResolve }: PredictionModeProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const isCorrect = selected === prompt.correctAnswer;

  function handleReveal() {
    if (!selected) return;
    setRevealed(true);
  }

  function handleContinue() {
    onResolve();
    setSelected(null);
    setRevealed(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border-2 border-primary-300 bg-primary-50 dark:border-primary-700 dark:bg-primary-950/40 p-5"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white">
          <Brain className="h-4 w-4" />
        </div>
        <h4 className="text-subheading font-semibold text-primary-700 dark:text-primary-400">
          Prediction Mode
        </h4>
      </div>

      <p className="mb-4 text-body text-foreground">{prompt.question}</p>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {prompt.options.map((option) => {
          const isSelected = selected === option;
          const isCorrectOption = option === prompt.correctAnswer;

          return (
            <button
              key={option}
              onClick={() => !revealed && setSelected(option)}
              disabled={revealed}
              className={cn(
                "flex items-center justify-between rounded-lg border px-4 py-3 text-left text-body transition-all",
                !revealed && isSelected && "border-primary-500 bg-primary-100 dark:bg-primary-900/40",
                !revealed && !isSelected && "border-border bg-card hover:border-border-strong",
                revealed && isCorrectOption && "border-success-500 bg-success-100 dark:bg-success-900/40",
                revealed && isSelected && !isCorrectOption && "border-danger-500 bg-danger-100 dark:bg-danger-900/40",
                revealed && !isSelected && !isCorrectOption && "border-border bg-card opacity-60"
              )}
            >
              <span>{option}</span>
              {revealed && isCorrectOption && (
                <Check className="h-5 w-5 text-success-600" />
              )}
              {revealed && isSelected && !isCorrectOption && (
                <X className="h-5 w-5 text-danger-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div
              className={cn(
                "flex items-start gap-2 rounded-lg p-3 text-body",
                isCorrect
                  ? "bg-success-100 text-success-800 dark:bg-success-900/40 dark:text-success-300"
                  : "bg-danger-100 text-danger-800 dark:bg-danger-900/40 dark:text-danger-300"
              )}
            >
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-medium">
                  {isCorrect ? "Correct!" : "Not quite."}
                </p>
                <p className="mt-1 text-foreground-muted">{prompt.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-4 flex justify-end gap-2">
        {!revealed ? (
          <Button onClick={handleReveal} disabled={!selected} size="sm">
            Reveal Answer
          </Button>
        ) : (
          <Button onClick={handleContinue} size="sm" variant="secondary">
            Continue
          </Button>
        )}
      </div>
    </motion.div>
  );
}
