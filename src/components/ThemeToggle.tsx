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
const read = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

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
      className="nb-btn nb-btn--secondary size-11 px-0"
    >
      <Sun aria-hidden="true" strokeWidth={2.5} className="hidden size-5 dark:block" />
      <Moon aria-hidden="true" strokeWidth={2.5} className="size-5 dark:hidden" />
    </button>
  );
}
