"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ExecutionFrame } from "@/lib/types";

/* ============================================================
   ArrayVisualizer — Renders array data from execution frames.
   Purely data-driven: reads dataState, activeIndices, and
   sortedIndices from the current frame. No lesson-specific logic.
   ============================================================ */

interface ArrayVisualizerProps {
  frame: ExecutionFrame;
  height?: number;
}

export function ArrayVisualizer({ frame, height = 200 }: ArrayVisualizerProps) {
  const data = frame.dataState as number[];
  const activeIndices = frame.activeIndices || [];
  const sortedIndices = frame.sortedIndices || [];

  const maxValue = Math.max(...data.map(Math.abs), 1);
  const barWidth = 48;



  return (
    <div
      className="flex items-end justify-center gap-3 rounded-lg bg-background-subtle p-6"
      style={{ minHeight: height }}
      role="img"
      aria-label={`Array visualization: [${data.join(", ")}]. Currently comparing indices ${activeIndices.join(" and ")}.`}
    >
      <div className="flex items-end gap-3">
        {data.map((value, index) => {
          const isActive = activeIndices.includes(index);
          const isSorted = sortedIndices.includes(index);
          const barHeight = Math.max(40, (Math.abs(value) / maxValue) * 140);

          return (
            <div key={index} className="flex flex-col items-center gap-2">
              {/* Index label */}
              <span
                className={`text-caption font-mono transition-colors ${
                  isActive
                    ? "font-bold text-primary-500"
                    : isSorted
                      ? "text-success-500"
                      : "text-foreground-subtle"
                }`}
              >
                {index}
              </span>

              {/* Value bar */}
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isActive
                    ? "var(--color-primary-500)"
                    : isSorted
                      ? "var(--color-success-500)"
                      : "var(--color-primary-300)",
                  height: barHeight,
                }}
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                  duration: 0.3,
                }}
                style={{ width: barWidth }}
                className="flex items-start justify-center rounded-lg pt-2"
              >
                <span
                  className={`text-body font-mono font-bold ${
                    isActive || isSorted ? "text-white" : "text-primary-950"
                  }`}
                >
                  {value}
                </span>
              </motion.div>

              {/* Comparison arrow */}
              <div className="h-5">
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-primary-500"
                    >
                      ▲
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
