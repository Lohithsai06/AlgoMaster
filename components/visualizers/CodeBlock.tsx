"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { CodeLanguage, MultiLangCode } from "@/lib/types";
import { useUserStore } from "@/lib/stores/useUserStore";
import { Tabs } from "@/components/ui/Tabs";

/* ============================================================
   CodeBlock — Multi-language code viewer with tabs.
   Highlights specific lines in sync with the visualizer.
   ============================================================ */

interface CodeBlockProps {
  code: MultiLangCode;
  highlightedLines?: number[];
}

const languageTabs: { id: CodeLanguage; label: string }[] = [
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "cpp", label: "C++" },
];

export function CodeBlock({ code, highlightedLines = [] }: CodeBlockProps) {
  const preferredLanguage = useUserStore((s) => s.preferredLanguage);
  const setPreferredLanguage = useUserStore((s) => s.setPreferredLanguage);
  const [activeLang, setActiveLang] = useState<CodeLanguage>(preferredLanguage);

  function handleTabChange(id: string) {
    const lang = id as CodeLanguage;
    setActiveLang(lang);
    setPreferredLanguage(lang);
  }

  const codeText = code[activeLang] || "";
  const lines = codeText.split("\n");

  return (
    <div className="flex flex-col">
      <Tabs
        tabs={languageTabs}
        activeTab={activeLang}
        onTabChange={handleTabChange}
      />
      <div className="rounded-b-xl border border-t-0 border-border bg-neutral-950 p-4 overflow-x-auto">
        <pre className="font-mono text-caption leading-relaxed">
          {lines.map((line, index) => {
            const lineNum = index + 1;
            const isHighlighted = highlightedLines.includes(lineNum);
            return (
              <div
                key={index}
                className={cn(
                  "flex gap-3 rounded px-2 py-0.5 transition-colors",
                  isHighlighted
                    ? "bg-primary-500/20"
                    : ""
                )}
              >
                <span className="w-8 shrink-0 text-right text-neutral-600 select-none">
                  {lineNum}
                </span>
                <code
                  className={cn(
                    isHighlighted ? "text-primary-300 font-semibold" : "text-neutral-300"
                  )}
                >
                  {line || " "}
                </code>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
