"use client";

import { Settings as SettingsIcon, Sun, Moon, Monitor, Code as Code2, Gauge, Type } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { useUserStore } from "@/lib/stores/useUserStore";
import { useProgressStore } from "@/lib/stores/useProgressStore";
import { useWorkspaceStore } from "@/lib/stores/useWorkspaceStore";
import type { Theme, CodeLanguage, FontSize } from "@/lib/types";

/* ============================================================
   Settings Page — User preferences
   Theme, code language, animation speed, font size,
   progress reset, and data management.
   ============================================================ */

export default function SettingsPage() {
  const theme = useUserStore((s) => s.theme);
  const setTheme = useUserStore((s) => s.setTheme);
  const preferredLanguage = useUserStore((s) => s.preferredLanguage);
  const setPreferredLanguage = useUserStore((s) => s.setPreferredLanguage);
  const globalAnimationSpeed = useUserStore((s) => s.globalAnimationSpeed);
  const setGlobalAnimationSpeed = useUserStore((s) => s.setGlobalAnimationSpeed);
  const fontSizePreference = useUserStore((s) => s.fontSizePreference);
  const setFontSizePreference = useUserStore((s) => s.setFontSizePreference);

  const resetAllProgress = useProgressStore((s) => s.resetAllProgress);
  const resetAllWorkspace = useWorkspaceStore((s) => s.resetAll);

  function handleResetAll() {
    if (confirm("Are you sure? This will reset all progress, bookmarks, notes, and weak topics. This cannot be undone.")) {
      resetAllProgress();
      resetAllWorkspace();
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-8 flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-primary-500" />
          <h1 className="text-h1 font-bold tracking-tight">Settings</h1>
        </div>

        <div className="flex flex-col gap-6">
          {/* Theme */}
          <Card>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <Sun className="h-5 w-5 text-warning-500" />
                <h2 className="text-subheading font-semibold">Theme</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { value: "light", label: "Light", icon: Sun },
                  { value: "dark", label: "Dark", icon: Moon },
                  { value: "system", label: "System", icon: Monitor },
                ] as { value: Theme; label: string; icon: typeof Sun }[]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg border p-4 transition-all",
                      theme === opt.value
                        ? "border-primary-500 bg-primary-100 dark:bg-primary-900/40"
                        : "border-border bg-card hover:border-border-strong"
                    )}
                  >
                    <opt.icon className={cn("h-6 w-6", theme === opt.value ? "text-primary-500" : "text-foreground-muted")} />
                    <span className="text-caption font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preferred Language */}
          <Card>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-secondary-500" />
                <h2 className="text-subheading font-semibold">Preferred Code Language</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {([
                  { value: "javascript", label: "JavaScript" },
                  { value: "python", label: "Python" },
                  { value: "java", label: "Java" },
                  { value: "cpp", label: "C++" },
                ] as { value: CodeLanguage; label: string }[]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setPreferredLanguage(opt.value)}
                    className={cn(
                      "rounded-lg border p-3 text-center text-body font-medium transition-all",
                      preferredLanguage === opt.value
                        ? "border-primary-500 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400"
                        : "border-border bg-card text-foreground-muted hover:border-border-strong"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Animation Speed */}
          <Card>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <Gauge className="h-5 w-5 text-accent-500" />
                <h2 className="text-subheading font-semibold">Animation Speed</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 0.5, label: "0.5×" },
                  { value: 1, label: "1× (Normal)" },
                  { value: 2, label: "2× (Fast)" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setGlobalAnimationSpeed(opt.value)}
                    className={cn(
                      "rounded-lg border p-3 text-center text-body font-medium transition-all",
                      globalAnimationSpeed === opt.value
                        ? "border-primary-500 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400"
                        : "border-border bg-card text-foreground-muted hover:border-border-strong"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Font Size */}
          <Card>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <Type className="h-5 w-5 text-success-500" />
                <h2 className="text-subheading font-semibold">Font Size</h2>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { value: "sm", label: "Small" },
                  { value: "base", label: "Medium" },
                  { value: "lg", label: "Large" },
                ] as { value: FontSize; label: string }[]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFontSizePreference(opt.value)}
                    className={cn(
                      "rounded-lg border p-3 text-center text-body font-medium transition-all",
                      fontSizePreference === opt.value
                        ? "border-primary-500 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400"
                        : "border-border bg-card text-foreground-muted hover:border-border-strong"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardContent>
              <h2 className="mb-2 text-subheading font-semibold text-danger-600">Data Management</h2>
              <p className="mb-4 text-body text-foreground-muted">
                Reset all progress, bookmarks, notes, and weak topics. This action cannot be undone.
              </p>
              <Button variant="danger" onClick={handleResetAll}>
                Reset All Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
