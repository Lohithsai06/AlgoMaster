import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Algorithmia — Master Algorithms Through Thinking, Not Memorization",
  description:
    "An interactive DSA learning ecosystem where every concept is taught through explanation, visualization, interaction, and practice.",
};

/**
 * Inline script that runs before React hydration to set the initial theme
 * class on <html>, preventing a flash of unstyled content (FOUC).
 * Reads the saved theme from localStorage (written by Zustand persist).
 */
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('algorithmia-user-storage');
    var theme = 'system';
    if (stored) {
      var parsed = JSON.parse(stored);
      theme = (parsed && parsed.state && parsed.state.theme) || 'system';
    }
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = theme === 'dark' || (theme === 'system' && systemDark);
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', systemDark);
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
