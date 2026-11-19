"use client";

import { ArrowRight } from "lucide-react";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { flushSync } from "react-dom";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

type Props = { brand: ReactNode; cta: ReactNode };

const DESKTOP = "(min-width: 1024px)";
const MOTION_OK = "(prefers-reduced-motion: no-preference)";
const FOCUSABLE = "a[href], button:not([disabled])";

const noopSubscribe = () => () => {};

const LINK_BASE =
  "inline-flex min-h-11 items-center rounded-nb border-2 px-3 text-[1rem] font-bold";

export function HeaderNav({ brand, cta }: Props) {
  // The button exists only after hydration; its slot is always there, so nothing shifts and no dead button renders without JS.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [pill, setPill] = useState({ x: 0, width: 0 });

  // Measure the active desktop link so the shared pill can slide to it (and follow resizes).
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const measure = () => {
      const link = active ? nav.querySelector<HTMLElement>(`[data-nav="${active}"]`) : null;
      setPill(link ? { x: link.offsetLeft, width: link.offsetWidth } : { x: 0, width: 0 });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [active]);

  // Layout effect: inert and scroll lock must be gone before the browser follows an anchor.
  useLayoutEffect(() => {
    if (!open) return;
    const inerted = ["conteudo", "rodape"].flatMap((id) => document.getElementById(id) ?? []);
    inerted.forEach((el) => el.setAttribute("inert", ""));
    document.documentElement.dataset.menu = "open";
    return () => {
      inerted.forEach((el) => el.removeAttribute("inert"));
      delete document.documentElement.dataset.menu;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !buttonRef.current) return;
      const items = [
        buttonRef.current,
        ...(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
      ].filter((el) => el.offsetParent !== null);
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement as HTMLElement | null;
      if (!current || !items.includes(current)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    }

    const wide = window.matchMedia(DESKTOP);
    const onWide = () => wide.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    let observed: string | null = null;

    function sync() {
      const projects = document.getElementById("projetos");
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      // Hero: the first section is still below the 40% line. Bottom: the last section is too short to reach it.
      if (projects && projects.getBoundingClientRect().top > window.innerHeight * 0.4)
        setActive(null);
      else setActive(atBottom ? "contato" : observed);
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const dy = y - lastY;
        if (!window.matchMedia(MOTION_OK).matches || y < 72) {
          setHidden(false);
          lastY = y;
        } else if (Math.abs(dy) > 8) {
          setHidden(dy > 0);
          lastY = y;
        }
        sync();
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.findLast((entry) => entry.isIntersecting);
        if (hit) observed = hit.target.id;
        sync();
      },
      { rootMargin: "-40% 0px -59% 0px" },
    );
    site.nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  function closeAndFocusButton() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <header
      className="site-header border-b-3 border-line bg-bg"
      data-open={open}
      data-hidden={hidden && !open}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-[var(--margin)] lg:h-18">
        {brand}
        <nav
          ref={navRef}
          aria-label={site.header.sections}
          className="relative hidden lg:flex lg:flex-1 lg:justify-center lg:gap-x-2"
        >
          {/* One shared pill slides to the active link, so a section change reads as movement. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-0 h-11 rounded-nb border-2 border-line bg-pop-blue motion-safe:transition-[transform,width,opacity] motion-safe:duration-[260ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: pill.width,
              transform: `translate(${pill.x}px, -50%)`,
              opacity: pill.width > 0 ? 1 : 0,
            }}
          />
          {site.nav.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              data-nav={id}
              aria-current={active === id ? "true" : undefined}
              className={`${LINK_BASE} relative border-transparent decoration-3 underline-offset-[6px] motion-safe:transition-colors motion-safe:duration-[260ms] ${
                active === id ? "on-fill" : "hover:underline"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <ThemeToggle />
          <div className="hidden sm:block">{cta}</div>
          <div className="size-11 lg:hidden">
            {mounted && (
              <button
                ref={buttonRef}
                type="button"
                aria-expanded={open}
                aria-controls="menu-principal"
                aria-label={site.header.menu}
                onClick={() => setOpen((value) => !value)}
                className="nb-btn nb-btn--secondary menu-toggle size-11 px-0"
              >
                <span className="menu-icon" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      <noscript>
        <nav
          aria-label={site.header.sections}
          className="mx-auto flex max-w-7xl flex-wrap gap-x-5 px-[var(--margin)] pb-2 lg:hidden"
        >
          {site.nav.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center font-bold">
              {label}
            </a>
          ))}
        </nav>
      </noscript>
      <div
        className="menu-scrim fixed inset-x-0 bottom-0 top-[calc(4rem+3px)] lg:hidden"
        style={{ background: "var(--scrim)" }}
        onClick={closeAndFocusButton}
        aria-hidden="true"
      />
      <div
        id="menu-principal"
        ref={panelRef}
        className="menu-panel absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b-3 border-line bg-surface shadow-[0_6px_0_0_var(--line)] lg:hidden"
      >
        <nav aria-label={site.header.sections}>
          <ul>
            {site.nav.map(({ id, label }, index) => (
              <li key={id} style={{ "--i": index } as CSSProperties}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  onClick={() => flushSync(() => setOpen(false))}
                  className={`wide flex min-h-14 items-center justify-between border-b-2 border-line px-[var(--margin)] font-extrabold text-[length:var(--step-title)] ${
                    active === id ? "on-fill bg-pop-blue" : ""
                  }`}
                >
                  {label}
                  <ArrowRight aria-hidden="true" strokeWidth={2.5} className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-[var(--margin)] sm:hidden [&>a]:w-full">{cta}</div>
      </div>
    </header>
  );
}
