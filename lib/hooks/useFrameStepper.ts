"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { ExecutionFrame } from "@/lib/types";
import { useUserStore } from "@/lib/stores/useUserStore";

/* ============================================================
   useFrameStepper — State machine for stepping through
   execution frames with play/pause/speed control.
   Drives all visualizer synchronization.
   ============================================================ */

interface FrameStepperState {
  currentFrame: number;
  isPlaying: boolean;
  speed: number;
  totalFrames: number;
  isComplete: boolean;
  showPrediction: boolean;
  predictionResolved: boolean;
}

export function useFrameStepper(frames: ExecutionFrame[]) {
  const globalSpeed = useUserStore((s) => s.globalAnimationSpeed);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [predictionResolved, setPredictionResolved] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalFrames = frames.length;
  const frame = frames[currentFrame];
  const isComplete = currentFrame >= totalFrames - 1;

  // Check if current frame has a prediction prompt
  const hasPrediction = !!frame?.predictionPrompt;

  // Play/pause timer — handles prediction auto-pause inside the interval
  useEffect(() => {
    if (isPlaying && !showPrediction) {
      const baseDelay = 1000;
      const delay = baseDelay / globalSpeed;

      intervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev >= totalFrames - 1) {
            setIsPlaying(false);
            return prev;
          }
          const nextFrame = prev + 1;
          const next = frames[nextFrame];
          if (next?.predictionPrompt && !predictionResolved) {
            setIsPlaying(false);
            setShowPrediction(true);
          }
          return nextFrame;
        });
      }, delay);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [isPlaying, showPrediction, globalSpeed, totalFrames, frames, predictionResolved]);

  const play = useCallback(() => {
    if (isComplete) {
      setCurrentFrame(0);
      setPredictionResolved(false);
      setShowPrediction(false);
      setIsPlaying(true);
    } else if (hasPrediction && !predictionResolved) {
      setShowPrediction(true);
    } else {
      setIsPlaying(true);
    }
  }, [isComplete, hasPrediction, predictionResolved]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const stepForward = useCallback(() => {
    setIsPlaying(false);
    setShowPrediction(false);
    setPredictionResolved(false);
    setCurrentFrame((prev) => Math.min(prev + 1, totalFrames - 1));
  }, [totalFrames]);

  const stepBackward = useCallback(() => {
    setIsPlaying(false);
    setShowPrediction(false);
    setPredictionResolved(false);
    setCurrentFrame((prev) => Math.max(prev - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setShowPrediction(false);
    setPredictionResolved(false);
    setCurrentFrame(0);
  }, []);

  const resolvePrediction = useCallback(() => {
    setPredictionResolved(true);
    setShowPrediction(false);
  }, []);

  const state: FrameStepperState = {
    currentFrame,
    isPlaying,
    speed: globalSpeed,
    totalFrames,
    isComplete,
    showPrediction,
    predictionResolved,
  };

  return {
    ...state,
    frame,
    frames,
    play,
    pause,
    stepForward,
    stepBackward,
    reset,
    resolvePrediction,
  };
}
