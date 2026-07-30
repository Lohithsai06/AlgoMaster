"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Lock, CircleCheck as CheckCircle2, Play, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { DifficultyBadge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useProgressStore } from "@/lib/stores/useProgressStore";
import { getChapter } from "@/lib/data/roadmap";

/* ============================================================
   Chapter Page — Chapter Syllabus Hub
   Shows chapter summary, difficulty, estimated time, and
   the lesson list with completion checkboxes.
   ============================================================ */

export default function ChapterPage({ params }: { params: Promise<{ chapterId: string }> }) {
  const { chapterId } = use(params);
  const chapter = getChapter(chapterId);
  const lessons = useProgressStore((s) => s.lessons);

  if (!chapter) {
    notFound();
  }

  const completedCount = chapter.lessons.filter(
    (l) => lessons[l.id]?.completed
  ).length;
  const chapterPct = chapter.lessons.length > 0
    ? Math.round((completedCount / chapter.lessons.length) * 100)
    : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Learn", href: "/learn" },
            { label: chapter.title },
          ]}
        />

        {/* Chapter header */}
        <div className="mt-6">
          <h1 className="text-h1 font-bold tracking-tight">{chapter.title}</h1>
          <p className="mt-2 text-body-lg text-foreground-muted">
            {chapter.description}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <DifficultyBadge difficulty={chapter.difficulty} />
            <span className="flex items-center gap-1 text-caption text-foreground-muted">
              <Clock className="h-3.5 w-3.5" />
              {chapter.estimatedTime}
            </span>
            <span className="text-caption text-foreground-muted">
              {chapter.lessons.length} lessons
            </span>
          </div>
          <div className="mt-4 max-w-md">
            <ProgressBar value={chapterPct} showLabel />
          </div>
        </div>

        {/* Lesson list */}
        <div className="mt-8 flex flex-col gap-3">
          {chapter.lessons.map((lesson, index) => {
            const isCompleted = lessons[lesson.id]?.completed;
            const isLocked = lesson.locked;

            return (
              <Link
                key={lesson.id}
                href={isLocked ? "#" : `/learn/${lesson.id}`}
                className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                  isLocked
                    ? "border-border bg-background-muted opacity-60"
                    : "border-border bg-card hover:border-border-strong hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-body font-bold text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 text-success-500" />
                      ) : isLocked ? (
                        <Lock className="h-4 w-4 text-foreground-subtle" />
                      ) : (
                        <Play className="h-4 w-4 text-primary-500" />
                      )}
                      <h3 className={`text-subheading font-semibold ${isLocked ? "text-foreground-muted" : "text-foreground"}`}>
                        {lesson.title}
                      </h3>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <DifficultyBadge difficulty={lesson.difficulty} />
                      <span className="text-caption text-foreground-subtle">
                        {lesson.estimatedTime}
                      </span>
                    </div>
                  </div>
                </div>
                {!isLocked && (
                  <ChevronRight className="h-5 w-5 text-foreground-subtle" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
