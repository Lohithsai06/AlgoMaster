"use client";

import { cn } from "@/lib/utils/cn";

/* ============================================================
   PseudocodeBlock — Renders pseudocode with line highlighting
   that syncs with the current execution frame.
   ============================================================ */

interface PseudocodeBlockProps {
  lines: string[];
  highlightedLines: number[];
}

export function PseudocodeBlock({ lines, highlightedLines }: PseudocodeBlockProps) {
  return (
    <div className="rounded-xl border border-border bg-neutral-950 p-4 overflow-x-auto">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-danger-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-warning-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-success-500" />
        </div>
        <span className="text-caption text-neutral-400 font-mono ml-2">pseudocode</span>
      </div>
      <pre className="font-mono text-caption leading-relaxed">
        {lines.map((line, index) => {
          const lineNum = index + 1;
          const isHighlighted = highlightedLines.includes(lineNum);
          return (
            <div
              key={index}
              className={cn(
                "flex gap-3 rounded px-2 py-0.5 transition-colors",
                isHighlighted
                  ? "bg-primary-500/20 text-primary-300"
                  : "text-neutral-300"
              )}
            >
              <span className="w-6 shrink-0 text-right text-neutral-600 select-none">
                {lineNum}
              </span>
              <span className={isHighlighted ? "font-semibold" : ""}>
                {line}
              </span>
            </div>
          );
        })}
      </pre>
    </div>
  );
}
