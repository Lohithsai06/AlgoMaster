"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import { getLesson, getChapterByLessonId } from "@/lib/data/roadmap";
import { useProgressStore } from "@/lib/stores/useProgressStore";
import { LessonNarrative } from "@/components/workspace/LessonNarrative";
import { InteractiveEngine } from "@/components/workspace/InteractiveEngine";
import { LessonNotes } from "@/components/workspace/LessonNotes";
import { Navbar } from "@/components/layout/Navbar";

/* ============================================================
   Lesson Workspace Page — Split-pane layout.
   Left: narrative (Explanation → Visualization → Code →
   Practice → Quiz → Summary).
   Right: sticky interactive engine (visualizer, controls,
   teacher mode, prediction, pseudocode, code, complexity).
   ============================================================ */

export default function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params);
  const lesson = getLesson(lessonId);
  const markLessonAccessed = useProgressStore((s) => s.markLessonAccessed);

  useEffect(() => {
    if (lesson) markLessonAccessed(lessonId);
  }, [lessonId, lesson, markLessonAccessed]);

  if (!lesson) {
    notFound();
  }

  const chapter = getChapterByLessonId(lessonId);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
          {/* Left: Narrative column */}
          <div className="flex-1 lg:max-w-2xl">
            <LessonNarrative lesson={lesson} />
          </div>

          {/* Right: Sticky interactive engine */}
          <div className="lg:sticky lg:top-20 lg:h-fit lg:w-[400px] lg:shrink-0 xl:w-[440px]">
            <InteractiveEngine lesson={lesson} chapterTitle={chapter?.title || ""} />
            <div className="mt-4">
              <LessonNotes lessonId={lessonId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
