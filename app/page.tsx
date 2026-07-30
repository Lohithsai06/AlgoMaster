"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Code as Code2, Eye, Flame, GraduationCap, Lightbulb, Play, Sparkles, Target, TrendingUp } from "lucide-react";
export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-h4 font-bold tracking-tight">
              Algorithmia
            </span>
          </div>
          <div className="hidden items-center gap-8 sm:flex">
            <a
              href="#features"
              className="text-caption text-foreground-muted transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#roadmap"
              className="text-caption text-foreground-muted transition-colors hover:text-foreground"
            >
              Roadmap
            </a>
            <a
              href="#how-it-works"
              className="text-caption text-foreground-muted transition-colors hover:text-foreground"
            >
              How It Works
            </a>
          </div>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-caption font-medium text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md active:scale-95"
          >
            Start Learning
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary-200/30 blur-3xl dark:bg-primary-900/20" />
          <div className="absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-secondary-200/20 blur-3xl dark:bg-secondary-800/10" />
        </div>

        <div className="mx-auto flex max-w-4xl flex-col items-center pt-24 pb-16 text-center">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-caption text-foreground-muted shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent-500" />
              The interactive DSA learning ecosystem
            </motion.div>

          <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display font-bold tracking-tight"
            >
              Master Algorithms Through
              <br />
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Thinking, Not Memorization
              </span>
            </motion.h1>

          <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-2xl text-body-lg text-foreground-muted"
            >
              Every concept is taught through explanation, visualization,
              interaction, and practice. A guided journey from beginner to
              interview-ready, built for humans who want to truly understand.
            </motion.p>

          <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-subheading font-medium text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30 active:scale-95"
              >
                <Play className="h-5 w-5" />
                Start Your Journey
              </a>
              <Link
                href="/learn"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-subheading font-medium text-foreground shadow-sm transition-all hover:border-border-strong hover:bg-background-subtle active:scale-95"
              >
                <BookOpen className="h-5 w-5" />
                Explore Roadmap
              </Link>
            </motion.div>
        </div>
      </section>

      {/* Continue Where You Left Off Card */}
      <section className="px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-caption font-medium text-foreground-subtle">
                      Continue Where You Left Off
                    </p>
                    <p className="text-subheading font-semibold">
                      Arrays — Introduction to Arrays
                    </p>
                  </div>
                </div>
                <div className="hidden items-center gap-3 sm:flex">
                  <div className="text-right">
                    <p className="text-h4 font-bold text-primary-500">65%</p>
                    <p className="text-caption text-foreground-subtle">
                      Complete
                    </p>
                  </div>
                  <Link
                    href="/learn"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary-500 px-4 py-2 text-caption font-medium text-white transition-all hover:bg-primary-600 active:scale-95"
                  >
                    Resume
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-background-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                />
              </div>
            </motion.div>
        </div>
      </section>

      {/* How It Works — The Learning Flow */}
      <section id="how-it-works" className="px-6 pt-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-h2 font-semibold tracking-tight">
              The Learning Flow
            </h2>
            <p className="mt-3 text-body-lg text-foreground-muted">
              Every lesson follows the same unbreakable sequence — because
              understanding must come before code.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                icon: BookOpen,
                label: "Explanation",
                color: "text-primary-500",
                bg: "bg-primary-100 dark:bg-primary-900/40",
              },
              {
                icon: Eye,
                label: "Visualization",
                color: "text-secondary-500",
                bg: "bg-secondary-100 dark:bg-secondary-900/40",
              },
              {
                icon: Code2,
                label: "Code",
                color: "text-accent-500",
                bg: "bg-accent-100 dark:bg-accent-900/40",
              },
              {
                icon: Target,
                label: "Practice",
                color: "text-success-500",
                bg: "bg-success-100 dark:bg-success-900/40",
              },
              {
                icon: Lightbulb,
                label: "Quiz",
                color: "text-warning-500",
                bg: "bg-warning-100 dark:bg-warning-900/40",
              },
            ].map((step, index) => (
              <div key={step.label} className="relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center shadow-sm"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg ${step.bg}`}
                    >
                      <step.icon className={`h-6 w-6 ${step.color}`} />
                    </div>
                    <span className="text-caption font-medium text-foreground-muted">
                      Step {index + 1}
                    </span>
                    <span className="text-subheading font-semibold">
                      {step.label}
                    </span>
                  </motion.div>
                {/* Connector arrow */}
                {index < 4 && (
                  <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 lg:block">
                    <ArrowRight className="h-4 w-4 text-foreground-subtle" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 pt-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-h2 font-semibold tracking-tight">
              Built for Understanding
            </h2>
            <p className="mt-3 text-body-lg text-foreground-muted">
              Every feature exists to reduce cognitive load and help you truly
              learn — not just memorize.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Eye,
                title: "Interactive Visualizers",
                description:
                  "Watch algorithms execute step-by-step. Every movement is synchronized with the code and a teacher-mode explanation.",
                color: "text-secondary-500",
                bg: "bg-secondary-100 dark:bg-secondary-900/40",
              },
              {
                icon: Brain,
                title: "Prediction Mode",
                description:
                  "Pause and predict the next step before it happens. Active recall is the fastest path to deep understanding.",
                color: "text-primary-500",
                bg: "bg-primary-100 dark:bg-primary-900/40",
              },
              {
                icon: Flame,
                title: "Alive Dashboard",
                description:
                  "Track your streak, see your progress, and get personalized recommendations for what to learn next.",
                color: "text-warning-500",
                bg: "bg-warning-100 dark:bg-warning-900/40",
              },
              {
                icon: Code2,
                title: "Multi-Language Code",
                description:
                  "See implementations in JavaScript, Python, Java, and C++ — all synced with the visualizer.",
                color: "text-accent-500",
                bg: "bg-accent-100 dark:bg-accent-900/40",
              },
              {
                icon: Target,
                title: "Guided Practice",
                description:
                  "Dry runs, prediction questions, and structured exercises that reinforce every concept without a compiler.",
                color: "text-success-500",
                bg: "bg-success-100 dark:bg-success-900/40",
              },
              {
                icon: GraduationCap,
                title: "Structured Roadmap",
                description:
                  "A clear pathway from programming basics through sorting and beyond. Always know what to learn next and why.",
                color: "text-danger-500",
                bg: "bg-danger-100 dark:bg-danger-900/40",
              },
            ].map((feature, index) => (
              <div key={feature.title}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="h-full rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-border-strong"
                  >
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${feature.bg}`}
                    >
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="mb-2 text-subheading font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-body text-foreground-muted">
                      {feature.description}
                    </p>
                  </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Preview */}
      <section id="roadmap" className="px-6 pt-24 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-h2 font-semibold tracking-tight">
              Your Learning Pathway
            </h2>
            <p className="mt-3 text-body-lg text-foreground-muted">
              A structured journey from fundamentals to interview confidence.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            {[
              {
                title: "Programming Basics",
                status: "Foundation",
                color: "bg-primary-500",
              },
              {
                title: "Arrays",
                status: "In Progress",
                color: "bg-secondary-500",
              },
              {
                title: "Strings",
                status: "Locked",
                color: "bg-neutral-400",
              },
              {
                title: "Searching",
                status: "Locked",
                color: "bg-neutral-400",
              },
              {
                title: "Sorting",
                status: "Locked",
                color: "bg-neutral-400",
              },
            ].map((node, index) => (
              <div key={node.title} className="flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex w-full max-w-md items-center justify-between rounded-xl border border-border bg-card px-6 py-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${node.color} text-white`}
                      >
                        <span className="text-caption font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-subheading font-semibold">
                        {node.title}
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-caption font-medium ${
                        node.status === "Locked"
                          ? "bg-background-muted text-foreground-subtle"
                          : node.status === "In Progress"
                            ? "bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-400"
                            : "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400"
                      }`}
                    >
                      {node.status}
                    </span>
                  </motion.div>
                {index < 4 && (
                  <div className="h-6 w-px bg-border-strong" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="text-caption font-semibold">Algorithmia</span>
          </div>
          <p className="text-caption text-foreground-subtle">
            Built for learners who want to truly understand.
          </p>
        </div>
      </footer>
    </div>
  );
}
