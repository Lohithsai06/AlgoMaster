/**
 * Merges class names, filtering out falsy values.
 * A lightweight alternative to clsx/tailwind-merge for simple use cases.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
