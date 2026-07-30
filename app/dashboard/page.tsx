"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Flame, TrendingUp, BookOpen, Target, ArrowRight, GraduationCap, Lightbulb, Award, StickyNote, CircleAlert as AlertCircle, CircleCheck as CheckCircle2, Bookmark } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { DifficultyBadge } from "@/components/ui/Badge";
import { useUserStore } from "@/lib/stores/useUserStore";
import { useProgressStore } from "@/lib/stores/useProgressStore";
import { useWorkspaceStore } from "@/lib/stores/useWorkspaceStore";
import { getAllLessonIds, chapters, getLesson } from "@/lib/data/roadmap";

/* ============================================================
   Dashboard — The "Alive" Dashboard
   Personalized greeting, continue learning, streak, progress,
   recommended lesson, recent notes, weak topics, achievements.
   ============================================================ */

export default function DashboardPage() {
  const dailyStreak = useUserStore((s) => s.dailyStreak);
  const lessons = useProgressStore((s) => s.lessons);
  const getCompletionPercentage = useProgressStore((s) => s.getCompletionPercentage);
  const bookmarks = useWorkspaceStore((s) => s.bookmarks);
  const notes = useWorkspaceStore((s) => s.notes);
  const weakTopics = useWorkspaceStore((s) => s.weakTopics);

  const allLessonIds = getAllLessonIds();
  const completionPct = getCompletionPercentage(allLessonIds);
  const completedCount = allLessonIds.filter((id) => lessons[id]?.completed).length;

  // Find last accessed lesson
  const lastAccessed = Object.values(lessons)
    .filter((l) => l.lastAccessed)
    .sort((a, b) => b.lastAccessed - a.lastAccessed)[0];
  const continueLesson = lastAccessed ? getLesson(lastAccessed.lessonId) : null;

  // Find recommended lesson (first uncompleted unlocked lesson)
  const recommendedLesson = chapters
    .flatMap((ch) => ch.lessons)
    .find((l) => !l.locked && !lessons[l.id]?.completed);
  const recommendedLessonData = recommendedLesson ? getLesson(recommendedLesson.id) : null;

  // Recent notes (last 3)
  const recentNotes = Object.entries(notes)
    .sort(([, a], [, b]) => b.updatedAt - a.updatedAt)
    .slice(0, 3);

  // Bookmarked lessons
  const bookmarkedLessons = bookmarks
    .map((id) => getLesson(id))
    .filter(Boolean);

  // Achievements
  const achievements = [
    { id: "first-lesson", label: "First Lesson", icon: BookOpen, unlocked: completedCount >= 1, color: "text-primary-500", bg: "bg-primary-100 dark:bg-primary-900/40" },
    { id: "streak-3", label: "3-Day Streak", icon: Flame, unlocked: dailyStreak >= 3, color: "text-warning-500", bg: "bg-warning-100 dark:bg-warning-900/40" },
    { id: "quiz-master", label: "Quiz Master", icon: Award, unlocked: Object.values(lessons).some((l) => (l.quizScore ?? 0) >= 80), color: "text-success-500", bg: "bg-success-100 dark:bg-success-900/40" },
    { id: "scholar", label: "Scholar", icon: GraduationCap, unlocked: completionPct >= 50, color: "text-secondary-500", bg: "bg-secondary-100 dark:bg-secondary-900/40" },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-h1 font-bold tracking-tight">
            {greeting}, Learner!
          </h1>
          <p className="mt-2 text-body-lg text-foreground-muted">
            You&apos;re on a <span className="inline-flex items-center gap-1 font-semibold text-warning-500">
              <Flame className="h-5 w-5" />{dailyStreak}-day streak
            </span>. Keep it going!
          </p>
        </motion.div>

        {/* Top row: Continue + Progress */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Continue Where You Left Off */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="flex h-full flex-col justify-between gap-4">
                <div>
                  <p className="mb-2 text-caption font-medium text-foreground-subtle">Continue Where You Left Off</p>
                  {continueLesson ? (
                    <>
                      <h2 className="text-h3 font-semibold">{continueLesson.title}</h2>
                      <p className="mt-1 text-body text-foreground-muted line-clamp-2">
                        {continueLesson.introduction}
                      </p>
                    </>
                  ) : recommendedLessonData ? (
                    <>
                      <h2 className="text-h3 font-semibold">{recommendedLessonData.title}</h2>
                      <p className="mt-1 text-body text-foreground-muted line-clamp-2">
                        {recommendedLessonData.introduction}
                      </p>
                    </>
                  ) : (
                    <p className="text-body text-foreground-muted">Start your first lesson!</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  {continueLesson && (
                    <div className="flex items-center gap-2">
                      <DifficultyBadge difficulty={continueLesson.difficulty} />
                      <span className="text-caption text-foreground-muted">{continueLesson.estimatedTime}</span>
                    </div>
                  )}
                  {continueLesson ? (
                    <Link href={`/learn/${continueLesson.id}`}>
                      <Button size="sm">
                        Resume <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ) : recommendedLessonData ? (
                    <Link href={`/learn/${recommendedLessonData.id}`}>
                      <Button size="sm">
                        Start Learning <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Roadmap Progress */}
          <Card>
            <CardContent>
              <div className="mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary-500" />
                <h3 className="text-subheading font-semibold">Roadmap Progress</h3>
              </div>
              <p className="text-h2 font-bold text-primary-500">{completionPct}%</p>
              <p className="mb-3 text-caption text-foreground-muted">
                {completedCount} of {allLessonIds.length} lessons complete
              </p>
              <ProgressBar value={completionPct} size="lg" />
            </CardContent>
          </Card>
        </div>

        {/* Second row: Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard icon={Flame} label="Day Streak" value={dailyStreak} color="text-warning-500" bg="bg-warning-100 dark:bg-warning-900/40" />
          <StatCard icon={CheckCircle2} label="Completed" value={completedCount} color="text-success-500" bg="bg-success-100 dark:bg-success-900/40" />
          <StatCard icon={Bookmark} label="Bookmarked" value={bookmarks.length} color="text-primary-500" bg="bg-primary-100 dark:bg-primary-900/40" />
          <StatCard icon={StickyNote} label="Notes" value={Object.keys(notes).length} color="text-accent-500" bg="bg-accent-100 dark:bg-accent-900/40" />
        </div>

        {/* Third row: Recommended + Weak Topics */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recommended Lesson */}
          {recommendedLessonData && (
            <Card hover>
              <CardContent>
                <div className="mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-accent-500" />
                  <h3 className="text-subheading font-semibold">Recommended Next</h3>
                </div>
                <h4 className="text-body-lg font-semibold">{recommendedLessonData.title}</h4>
                <p className="mt-1 text-body text-foreground-muted line-clamp-2">
                  {recommendedLessonData.introduction}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <DifficultyBadge difficulty={recommendedLessonData.difficulty} />
                  <span className="text-caption text-foreground-muted">{recommendedLessonData.estimatedTime}</span>
                </div>
                <Link href={`/learn/${recommendedLessonData.id}`} className="mt-4 block">
                  <Button size="sm" variant="outline" fullWidth>
                    Start Lesson <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Weak Topics */}
          <Card>
            <CardContent>
              <div className="mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-danger-500" />
                <h3 className="text-subheading font-semibold">Weak Topics</h3>
              </div>
              {weakTopics.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {weakTopics.map((topic) => (
                    <div key={topic} className="flex items-center justify-between rounded-lg bg-background-subtle px-3 py-2">
                      <span className="text-body">{topic}</span>
                      <Link href="/revision">
                        <Button size="sm" variant="ghost">Review</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-body text-foreground-muted">
                  No weak topics yet. Quiz scores below 70% will appear here for review.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Fourth row: Recent Notes + Achievements */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Notes */}
          <Card>
            <CardContent>
              <div className="mb-3 flex items-center gap-2">
                <StickyNote className="h-5 w-5 text-accent-500" />
                <h3 className="text-subheading font-semibold">Recent Notes</h3>
              </div>
              {recentNotes.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {recentNotes.map(([lessonId, note]) => {
                    const lesson = getLesson(lessonId);
                    return (
                      <Link key={lessonId} href={`/learn/${lessonId}`}>
                        <div className="rounded-lg bg-background-subtle p-3 transition-colors hover:bg-background-muted">
                          <p className="mb-1 text-caption font-medium text-primary-500">
                            {lesson?.title || lessonId}
                          </p>
                          <p className="text-body text-foreground-muted line-clamp-2">
                            {note.content}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-body text-foreground-muted">
                  No notes yet. Take notes while learning to see them here.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardContent>
              <div className="mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-secondary-500" />
                <h3 className="text-subheading font-semibold">Achievements</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className={`flex flex-col items-center gap-2 rounded-lg p-4 text-center transition-all ${
                      ach.unlocked ? "bg-background-subtle" : "bg-background-muted opacity-50"
                    }`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${ach.unlocked ? ach.bg : "bg-neutral-200 dark:bg-neutral-800"}`}>
                      <ach.icon className={`h-6 w-6 ${ach.unlocked ? ach.color : "text-foreground-subtle"}`} />
                    </div>
                    <span className="text-caption font-medium">{ach.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookmarked Lessons */}
        {bookmarkedLessons.length > 0 && (
          <div className="mt-6">
            <Card>
              <CardContent>
                <div className="mb-3 flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-primary-500" />
                  <h3 className="text-subheading font-semibold">Bookmarked Lessons</h3>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {bookmarkedLessons.map((lesson) => lesson && (
                    <Link key={lesson.id} href={`/learn/${lesson.id}`}>
                      <div className="flex items-center justify-between rounded-lg bg-background-subtle p-3 transition-colors hover:bg-background-muted">
                        <div>
                          <p className="text-body font-medium">{lesson.title}</p>
                          <p className="text-caption text-foreground-muted">{lesson.estimatedTime}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-foreground-subtle" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: typeof Flame;
  label: string;
  value: number;
  color: string;
  bg: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        <div>
          <p className="text-h3 font-bold">{value}</p>
          <p className="text-caption text-foreground-muted">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
