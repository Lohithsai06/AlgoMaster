"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap } from "lucide-react";
import type { ExecutionFrame } from "@/lib/types";

/* ============================================================
   TeacherMode — Shows a teacher-style explanation for the
   current execution frame. Updates in sync with the visualizer.
   ============================================================ */

interface TeacherModeProps {
  frame: ExecutionFrame;
}

export function TeacherMode({ frame }: TeacherModeProps) {
  return (
    <div className="rounded-xl border border-border bg-background-subtle p-4">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary-500 text-white">
          <GraduationCap className="h-4 w-4" />
        </div>
        <span className="text-caption font-semibold text-secondary-700 dark:text-secondary-400">
          Teacher Mode
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={frame.teacherExplanation}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="text-body text-foreground leading-relaxed"
        >
          {frame.teacherExplanation}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
