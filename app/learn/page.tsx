"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Lock, CircleCheck as CheckCircle2, Play, ChevronRight, Compass } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/Card";
import { DifficultyBadge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useProgressStore } from "@/lib/stores/useProgressStore";
import { chapters } from "@/lib/data/roadmap";

/* ============================================================
   Roadmap Page — The Interactive Roadmap Hub
   Shows all chapters as connected nodes with completion status
   and locked/active states.
   ============================================================ */

export default function RoadmapPage() {
  const lessons = useProgressStore((s) => s.lessons);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-2 flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary-500" />
            <h1 className="text-h1 font-bold tracking-tight">Learning Roadmap</h1>
          </div>
          <p className="text-body-lg text-foreground-muted">
            A structured pathway from fundamentals to interview confidence. Follow the path in order — each chapter builds on the last.
          </p>
        </motion.div>

        {/* Roadmap nodes */}
        <div className="flex flex-col gap-4">
          {chapters.map((chapter, chapterIndex) => {
            const chapterLessons = chapter.lessons;
            const completedInChapter = chapterLessons.filter(
              (l) => lessons[l.id]?.completed
            ).length;
            const chapterPct = chapterLessons.length > 0
              ? Math.round((completedInChapter / chapterLessons.length) * 100)
              : 0;
            const hasUnlocked = chapterLessons.some((l) => !l.locked);


            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: chapterIndex * 0.05 }}
              >
                <Card hover>
                  <CardContent>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-caption font-bold text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                            {chapterIndex + 1}
                          </span>
                          <h2 className="text-h3 font-semibold">{chapter.title}</h2>
                        </div>
                        <p className="mt-2 pl-11 text-body text-foreground-muted">
                          {chapter.description}
                        </p>
                        <div className="mt-3 flex items-center gap-2 pl-11">
                          <DifficultyBadge difficulty={chapter.difficulty} />
                          <span className="text-caption text-foreground-muted">
                            {chapter.estimatedTime}
                          </span>
                        </div>
                      </div>
                      <Link href={`/chapter/${chapter.id}`}>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-background-subtle">
                          <ChevronRight className="h-5 w-5 text-foreground-muted" />
                        </div>
                      </Link>
                    </div>

                    {/* Progress bar */}
                    {hasUnlocked && (
                      <div className="mt-4 pl-11">
                        <ProgressBar value={chapterPct} size="sm" showLabel />
                      </div>
                    )}

                    {/* Lesson list */}
                    <div className="mt-4 flex flex-col gap-2 pl-11">
                      {chapterLessons.map((lesson) => {
                        const isCompleted = lessons[lesson.id]?.completed;
                        const isLocked = lesson.locked;

                        return (
                          <Link
                            key={lesson.id}
                            href={isLocked ? "#" : `/learn/${lesson.id}`}
                            className={`flex items-center justify-between rounded-lg border p-3 transition-all ${
                              isLocked
                                ? "border-border bg-background-muted opacity-60"
                                : "border-border bg-card hover:border-border-strong hover:shadow-sm"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {isCompleted ? (
                                <CheckCircle2 className="h-5 w-5 text-success-500" />
                              ) : isLocked ? (
                                <Lock className="h-5 w-5 text-foreground-subtle" />
                              ) : (
                                <Play className="h-5 w-5 text-primary-500" />
                              )}
                              <div>
                                <p className={`text-body font-medium ${isLocked ? "text-foreground-muted" : "text-foreground"}`}>
                                  {lesson.title}
                                </p>
                                <div className="flex items-center gap-2">
                                  <DifficultyBadge difficulty={lesson.difficulty} />
                                  <span className="text-caption text-foreground-subtle">
                                    {lesson.estimatedTime}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {!isLocked && (
                              <ChevronRight className="h-4 w-4 text-foreground-subtle" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
