"use client";

import { Bookmark, BookmarkCheck, Clock } from "lucide-react";
import type { ILessonData } from "@/lib/types";
import { useWorkspaceStore } from "@/lib/stores/useWorkspaceStore";
import { useFrameStepper } from "@/lib/hooks/useFrameStepper";
import { ArrayVisualizer } from "@/components/visualizers/ArrayVisualizer";
import { ControlRack } from "@/components/visualizers/ControlRack";
import { TeacherMode } from "@/components/visualizers/TeacherMode";
import { PredictionMode } from "@/components/visualizers/PredictionMode";
import { PseudocodeBlock } from "@/components/visualizers/PseudocodeBlock";
import { CodeBlock } from "@/components/visualizers/CodeBlock";
import { ComplexityAnalysis } from "@/components/visualizers/ComplexityAnalysis";
import { DifficultyBadge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

/* ============================================================
   InteractiveEngine — The right sticky panel of the lesson
   workspace. Contains the visualizer, controls, teacher mode,
   prediction mode, pseudocode, code, and complexity analysis.
   All synced via useFrameStepper.
   ============================================================ */

interface InteractiveEngineProps {
  lesson: ILessonData;
  chapterTitle: string;
}

export function InteractiveEngine({ lesson, chapterTitle }: InteractiveEngineProps) {
  const stepper = useFrameStepper(lesson.visualizationConfig.executionFrames);
  const bookmarks = useWorkspaceStore((s) => s.bookmarks);
  const toggleBookmark = useWorkspaceStore((s) => s.toggleBookmark);
  const isBookmarked = bookmarks.includes(lesson.id);

  const { frame } = stepper;

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <Breadcrumbs
          items={[
            { label: "Learn", href: "/learn" },
            { label: chapterTitle, href: `/chapter/${lesson.chapterId}` },
            { label: lesson.title },
          ]}
        />
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-h4 font-semibold">{lesson.title}</h2>
            <div className="mt-2 flex items-center gap-2">
              <DifficultyBadge difficulty={lesson.difficulty} />
              <span className="flex items-center gap-1 text-caption text-foreground-muted">
                <Clock className="h-3.5 w-3.5" />
                {lesson.estimatedTime}
              </span>
            </div>
          </div>
          <button
            onClick={() => toggleBookmark(lesson.id)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:bg-background-subtle"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-5 w-5 text-primary-500" />
            ) : (
              <Bookmark className="h-5 w-5 text-foreground-muted" />
            )}
          </button>
        </div>
      </div>

      {/* Visualizer */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <h3 className="mb-3 text-subheading font-semibold">Visualizer</h3>
        <ArrayVisualizer frame={frame} />
        <div className="mt-4">
          <ControlRack
            isPlaying={stepper.isPlaying}
            currentFrame={stepper.currentFrame}
            totalFrames={stepper.totalFrames}
            speed={stepper.speed}
            onPlay={stepper.play}
            onPause={stepper.pause}
            onStepForward={stepper.stepForward}
            onStepBackward={stepper.stepBackward}
            onReset={stepper.reset}
            stepLabel={frame.stepLabel}
          />
        </div>
      </div>

      {/* Prediction Mode (conditional) */}
      {stepper.showPrediction && frame.predictionPrompt && (
        <PredictionMode prompt={frame.predictionPrompt} onResolve={stepper.resolvePrediction} />
      )}

      {/* Teacher Mode */}
      <TeacherMode frame={frame} />

      {/* Pseudocode */}
      <div>
        <h3 className="mb-2 text-subheading font-semibold">Pseudocode</h3>
        <PseudocodeBlock
          lines={lesson.pseudocode}
          highlightedLines={frame.highlightedLines}
        />
      </div>

      {/* Multi-language Code */}
      <div>
        <h3 className="mb-2 text-subheading font-semibold">Code</h3>
        <CodeBlock
          code={lesson.multiLangCode}
          highlightedLines={frame.highlightedCodeLines || []}
        />
      </div>

      {/* Complexity Analysis */}
      <ComplexityAnalysis complexity={lesson.complexity} />
    </div>
  );
}
