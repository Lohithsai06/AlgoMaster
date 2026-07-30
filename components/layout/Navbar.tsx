"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Hop as Home, Compass, Settings, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/* ============================================================
   Navbar — Global navigation. Appears on all pages except
   the landing page (which has its own hero nav).
   ============================================================ */

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/learn", label: "Roadmap", icon: Compass },
  { href: "/revision", label: "Revision", icon: Bookmark },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500 text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="hidden text-h4 font-bold tracking-tight sm:block">
            Algorithmia
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-caption font-medium transition-colors",
                  isActive
                    ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400"
                    : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile nav */}
        <nav className="flex items-center gap-1 sm:hidden">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                  isActive
                    ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-400"
                    : "text-foreground-muted hover:bg-background-muted"
                )}
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
