"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { site } from "@/content/site";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

// Server snapshot is null: the theme is only known in the browser, so the label stays neutral until hydration.
const read = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, read, () => null);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked: the choice only lasts for this visit.
    }
  }

  const label =
    theme === null ? site.theme.toggle : theme === "dark" ? site.theme.light : site.theme.dark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="inline-flex size-11 items-center justify-center bg-surface text-fg transition-colors duration-[var(--dur-fast)] hover:bg-surface-2"
    >
      <Sun aria-hidden="true" className="hidden size-5 dark:block" />
      <Moon aria-hidden="true" className="size-5 dark:hidden" />
    </button>
  );
}
