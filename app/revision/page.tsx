"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bookmark, Trash2, CircleAlert as AlertCircle, RotateCcw, GraduationCap } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useWorkspaceStore } from "@/lib/stores/useWorkspaceStore";
import { useProgressStore } from "@/lib/stores/useProgressStore";
import { getLesson } from "@/lib/data/roadmap";

/* ============================================================
   Revision Hub — Auto-generated flashcards from weak topics,
   bookmarked lessons, and quiz scores for review.
   ============================================================ */

export default function RevisionPage() {
  const weakTopics = useWorkspaceStore((s) => s.weakTopics);
  const removeWeakTopic = useWorkspaceStore((s) => s.removeWeakTopic);
  const bookmarks = useWorkspaceStore((s) => s.bookmarks);
  const toggleBookmark = useWorkspaceStore((s) => s.toggleBookmark);
  const lessons = useProgressStore((s) => s.lessons);

  // Quiz results for review
  const quizResults = Object.values(lessons)
    .filter((l) => l.quizScore !== null)
    .sort((a, b) => (a.quizScore ?? 0) - (b.quizScore ?? 0));

  // Bookmarked lessons with data
  const bookmarkedLessons = bookmarks
    .map((id) => getLesson(id))
    .filter(Boolean);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-2 flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary-500" />
            <h1 className="text-h1 font-bold tracking-tight">Revision Hub</h1>
          </div>
          <p className="text-body-lg text-foreground-muted">
            Review weak topics, revisit bookmarked lessons, and track your quiz performance.
          </p>
        </motion.div>

        {/* Weak Topics Flashcards */}
        <Card className="mb-6">
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-danger-500" />
              <h2 className="text-subheading font-semibold">Weak Topics</h2>
            </div>
            {weakTopics.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {weakTopics.map((topic) => {
                  const lesson = getLesson(topic.toLowerCase().replace(/\s+/g, "-"));
                  return (
                    <div
                      key={topic}
                      className="flex items-center justify-between rounded-lg border border-border bg-background-subtle p-4"
                    >
                      <div>
                        <p className="text-body font-medium">{topic}</p>
                        <p className="text-caption text-foreground-muted">
                          Quiz score below 70%
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson && (
                          <Link href={`/learn/${lesson.id}`}>
                            <Button size="sm" variant="outline">
                              <RotateCcw className="h-3.5 w-3.5" />
                              Review
                            </Button>
                          </Link>
                        )}
                        <button
                          onClick={() => removeWeakTopic(topic)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-danger-100 hover:text-danger-500 dark:hover:bg-danger-900/40"
                          aria-label="Remove weak topic"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-body text-foreground-muted">
                No weak topics yet. Lessons where you score below 70% on the quiz will appear here automatically.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Bookmarked Lessons */}
        <Card className="mb-6">
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-primary-500" />
              <h2 className="text-subheading font-semibold">Bookmarked Lessons</h2>
            </div>
            {bookmarkedLessons.length > 0 ? (
              <div className="flex flex-col gap-3">
                {bookmarkedLessons.map((lesson) => lesson && (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-background-subtle p-4"
                  >
                    <Link href={`/learn/${lesson.id}`} className="flex-1">
                      <p className="text-body font-medium hover:text-primary-500">{lesson.title}</p>
                      <p className="text-caption text-foreground-muted">{lesson.estimatedTime}</p>
                    </Link>
                    <button
                      onClick={() => toggleBookmark(lesson.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-500 transition-colors hover:bg-primary-100 dark:hover:bg-primary-900/40"
                      aria-label="Remove bookmark"
                    >
                      <Bookmark className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-body text-foreground-muted">
                No bookmarks yet. Bookmark lessons to quickly revisit them here.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quiz Performance */}
        <Card>
          <CardContent>
            <h2 className="mb-4 text-subheading font-semibold">Quiz Performance</h2>
            {quizResults.length > 0 ? (
              <div className="flex flex-col gap-3">
                {quizResults.map((result) => {
                  const lesson = getLesson(result.lessonId);
                  if (!lesson) return null;
                  const score = result.quizScore ?? 0;
                  const passed = score >= 70;
                  return (
                    <Link key={result.lessonId} href={`/learn/${result.lessonId}`}>
                      <div className="flex items-center justify-between rounded-lg border border-border bg-background-subtle p-4 transition-colors hover:bg-background-muted">
                        <div>
                          <p className="text-body font-medium">{lesson.title}</p>
                          <p className="text-caption text-foreground-muted">
                            {passed ? "Passed" : "Needs review"}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-h3 font-bold ${
                              passed ? "text-success-500" : "text-danger-500"
                            }`}
                          >
                            {score}%
                          </span>
                          <RotateCcw className="h-4 w-4 text-foreground-subtle" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-body text-foreground-muted">
                No quiz results yet. Complete a lesson quiz to see your performance here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
