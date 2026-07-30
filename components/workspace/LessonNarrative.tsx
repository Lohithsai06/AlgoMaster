"use client";

import { motion } from "framer-motion";
import { BookOpen, Target, Lightbulb, Eye, ClipboardList, Circle as HelpCircle, ArrowRight, CircleCheck as CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { ILessonData } from "@/lib/types";
import { useProgressStore } from "@/lib/stores/useProgressStore";
import { useWorkspaceStore } from "@/lib/stores/useWorkspaceStore";
import { QuizEngine } from "./QuizEngine";
import { PracticePortal } from "./PracticePortal";
import { Button } from "@/components/ui/Button";

/* ============================================================
   LessonNarrative — The left panel of the lesson workspace.
   Contains the strict learning flow:
   Explanation → Visualization → Code → Practice → Quiz → Summary
   ============================================================ */

interface LessonNarrativeProps {
  lesson: ILessonData;
}

export function LessonNarrative({ lesson }: LessonNarrativeProps) {
  const markLessonCompleted = useProgressStore((s) => s.markLessonCompleted);
  const markPracticeCompleted = useProgressStore((s) => s.markPracticeCompleted);
  const setQuizScore = useProgressStore((s) => s.setQuizScore);
  const addWeakTopic = useWorkspaceStore((s) => s.addWeakTopic);

  function handleQuizComplete(score: number) {
    setQuizScore(lesson.id, score);
    if (score < 70) {
      addWeakTopic(lesson.title);
    }
  }

  function handlePracticeComplete() {
    markPracticeCompleted(lesson.id);
  }

  function handleFinishLesson() {
    markLessonCompleted(lesson.id);
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Section 1: Introduction */}
      <NarrativeSection id="introduction" icon={BookOpen} title="Introduction" number={1}>
        <p className="text-body-lg text-foreground-muted leading-relaxed">{lesson.introduction}</p>
      </NarrativeSection>

      {/* Section 2: Objectives */}
      <NarrativeSection id="objectives" icon={Target} title="Learning Objectives" number={2}>
        <ul className="flex flex-col gap-2">
          {lesson.objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-body text-foreground-muted">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success-500" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </NarrativeSection>

      {/* Section 3: Theory */}
      <NarrativeSection id="theory" icon={BookOpen} title="Theory" number={3}>
        <div className="flex flex-col gap-4">
          {lesson.theory.paragraphs.map((para, i) => (
            <p key={i} className="text-body text-foreground-muted leading-relaxed">{para}</p>
          ))}
        </div>
      </NarrativeSection>

      {/* Section 4: Why It Matters */}
      <NarrativeSection id="why-it-matters" icon={Lightbulb} title="Why It Matters" number={4}>
        <div className="flex flex-col gap-4">
          <div className="rounded-lg bg-background-subtle p-4">
            <p className="mb-1 text-caption font-semibold text-primary-500">Real World</p>
            <p className="text-body text-foreground-muted">{lesson.whyItMatters.realWorld}</p>
          </div>
          <div className="rounded-lg bg-background-subtle p-4">
            <p className="mb-1 text-caption font-semibold text-secondary-500">Industry Application</p>
            <p className="text-body text-foreground-muted">{lesson.whyItMatters.industryApplication}</p>
          </div>
        </div>
      </NarrativeSection>

      {/* Section 5: Real-Life Analogy */}
      <NarrativeSection id="analogy" icon={Lightbulb} title="Real-Life Analogy" number={5}>
        <div className="rounded-lg border border-accent-300 bg-accent-50 p-4 dark:border-accent-700 dark:bg-accent-950/30">
          <p className="mb-1 text-subheading font-semibold text-accent-700 dark:text-accent-400">
            {lesson.realLifeAnalogy.title}
          </p>
          <p className="text-body text-foreground-muted">{lesson.realLifeAnalogy.description}</p>
        </div>
      </NarrativeSection>

      {/* Section 6: Dry Run */}
      <NarrativeSection id="dry-run" icon={Eye} title="Dry Run" number={6}>
        <p className="mb-4 text-body text-foreground-muted">
          Let&apos;s trace through the algorithm step by step. Follow along with the visualizer on the right.
        </p>
        <div className="flex flex-col gap-3">
          <div className="rounded-lg bg-background-subtle p-4">
            <p className="mb-1 text-caption font-medium text-foreground-subtle">Initial state:</p>
            <p className="font-mono text-body font-semibold">
              {JSON.stringify(lesson.dryRun.initialState)}
            </p>
          </div>
          {lesson.dryRun.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-caption font-bold text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                {i + 1}
              </span>
              <div>
                <p className="text-body text-foreground">{step.description}</p>
                <p className="mt-1 font-mono text-caption text-foreground-muted">
                  State: [{String(step.state)}]
                </p>
              </div>
            </div>
          ))}
        </div>
      </NarrativeSection>

      {/* Section 7: Practice */}
      <NarrativeSection id="practice" icon={ClipboardList} title="Practice" number={7}>
        <p className="mb-4 text-body text-foreground-muted">
          Complete these guided exercises to reinforce your understanding. No compiler needed — just think through each problem.
        </p>
        <PracticePortal exercises={lesson.practiceExercises} onComplete={handlePracticeComplete} />
      </NarrativeSection>

      {/* Section 8: Quiz */}
      <NarrativeSection id="quiz" icon={HelpCircle} title="Quiz" number={8}>
        <p className="mb-4 text-body text-foreground-muted">
          Test your knowledge. You need 70% to pass.
        </p>
        <QuizEngine questions={lesson.quiz} onComplete={handleQuizComplete} />
      </NarrativeSection>

      {/* Section 9: Summary & Next Lesson */}
      <NarrativeSection id="summary" icon={ArrowRight} title="Summary" number={9}>
        <div className="rounded-lg bg-success-50 border border-success-300 p-4 dark:bg-success-950/30 dark:border-success-700">
          <p className="text-body text-foreground-muted">
            You&apos;ve completed the lesson on <span className="font-semibold text-foreground">{lesson.title}</span>.
            Review the key concepts, then continue to the next lesson.
          </p>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Button onClick={handleFinishLesson} size="md">
            <CheckCircle2 className="h-4 w-4" />
            Mark as Complete
          </Button>
          {lesson.nextLessonId ? (
            <Link href={`/learn/${lesson.nextLessonId}`}>
              <Button variant="outline" size="md">
                Next Lesson
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Link href="/learn">
              <Button variant="outline" size="md">
                Back to Roadmap
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </NarrativeSection>
    </div>
  );
}

/* ---------- Reusable narrative section wrapper ---------- */

interface NarrativeSectionProps {
  id: string;
  icon: typeof BookOpen;
  title: string;
  number: number;
  children: React.ReactNode;
}

function NarrativeSection({ id, icon: Icon, title, number, children }: NarrativeSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="scroll-mt-20"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <span className="text-caption font-medium text-foreground-subtle">Step {number}</span>
          <h2 className="text-h3 font-semibold">{title}</h2>
        </div>
      </div>
      <div className="pl-0 sm:pl-13">{children}</div>
    </motion.section>
  );
}
