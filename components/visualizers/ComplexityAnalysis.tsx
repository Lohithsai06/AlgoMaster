"use client";

import { TrendingUp, Clock, Database, ChartBar as BarChart3 } from "lucide-react";
import type { ComplexityInfo } from "@/lib/types";

/* ============================================================
   ComplexityAnalysis — Displays time and space complexity
   for the current algorithm.
   ============================================================ */

interface ComplexityAnalysisProps {
  complexity: ComplexityInfo;
}

export function ComplexityAnalysis({ complexity }: ComplexityAnalysisProps) {
  const items = [
    { icon: TrendingUp, label: "Best Case", value: complexity.best, color: "text-success-500" },
    { icon: BarChart3, label: "Average", value: complexity.average, color: "text-warning-500" },
    { icon: Clock, label: "Worst Case", value: complexity.worst, color: "text-danger-500" },
    { icon: Database, label: "Space", value: complexity.space, color: "text-primary-500" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h4 className="mb-3 text-subheading font-semibold">Complexity Analysis</h4>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-lg bg-background-subtle p-3">
            <div className="mb-1 flex items-center gap-1.5">
              <item.icon className={`h-4 w-4 ${item.color}`} />
              <span className="text-caption font-medium text-foreground-muted">
                {item.label}
              </span>
            </div>
            <p className="text-body font-mono font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
      {complexity.explanation && (
        <p className="mt-3 text-caption text-foreground-muted leading-relaxed">
          {complexity.explanation}
        </p>
      )}
    </div>
  );
}
