"use client";

import { Pause, Play, RotateCcw, SkipBack, SkipForward, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

/* ============================================================
   ControlRack — Play/pause/step/reset controls for the
   visualization engine. Also shows step counter and speed.
   ============================================================ */

interface ControlRackProps {
  isPlaying: boolean;
  currentFrame: number;
  totalFrames: number;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  stepLabel?: string;
}

export function ControlRack({
  isPlaying,
  currentFrame,
  totalFrames,
  speed,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  stepLabel,
}: ControlRackProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Step label */}
      {stepLabel && (
        <div className="flex items-center gap-2 text-caption text-foreground-muted">
          <ChevronRight className="h-3.5 w-3.5 text-primary-500" />
          <span className="font-medium">{stepLabel}</span>
        </div>
      )}

      {/* Controls row */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          aria-label="Reset to start"
          disabled={currentFrame === 0}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onStepBackward}
          aria-label="Step backward"
          disabled={currentFrame === 0}
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        {isPlaying ? (
          <Button
            variant="primary"
            size="sm"
            onClick={onPause}
            aria-label="Pause"
            className="min-w-[80px]"
          >
            <Pause className="h-4 w-4" />
            Pause
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={onPlay}
            aria-label="Play"
            className="min-w-[80px]"
          >
            <Play className="h-4 w-4" />
            Play
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={onStepForward}
          aria-label="Step forward"
          disabled={currentFrame >= totalFrames - 1}
        >
          <SkipForward className="h-4 w-4" />
        </Button>

        {/* Step counter */}
        <div className="ml-auto flex items-center gap-1.5 text-caption text-foreground-muted">
          <span className={cn("font-mono font-medium", "text-foreground")}>
            {currentFrame + 1}
          </span>
          <span>/</span>
          <span>{totalFrames}</span>
          <span className="ml-1 rounded-full bg-background-muted px-2 py-0.5">
            {speed}× speed
          </span>
        </div>
      </div>
    </div>
  );
}
