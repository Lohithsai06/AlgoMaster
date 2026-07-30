"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div
      className={cn("flex gap-1 overflow-x-auto border-b border-border", className)}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative whitespace-nowrap px-4 py-2.5 text-caption font-medium transition-colors",
            activeTab === tab.id
              ? "text-primary-500"
              : "text-foreground-muted hover:text-foreground"
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab"
              className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-500"
            />
          )}
        </button>
      ))}
    </div>
  );
}
