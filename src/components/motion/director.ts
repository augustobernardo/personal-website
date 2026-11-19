import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isBelowFold, staggerEach } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const OWN = ".in-word, .in-slap, .in-media, [data-parallax]";
const CLEAR = "opacity,transform,translate,rotate,scale";
const START = "top 88%";
const OUT = "power3.out"; // ≈ --ease-out

export function startMotion(): () => void {
  ScrollTrigger.config({ ignoreMobileResize: true });
  const mm = gsap.matchMedia();

  mm.add(
    {
      motion: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 1024px) and (pointer: fine)",
    },
    (context) => {
      const { motion, desktop } = context.conditions ?? {};
      if (!motion) return;

      // Read phase: measure everything before any write (no layout thrash).
      const vh = window.innerHeight;
      const below = (el: HTMLElement) => isBelowFold(el.getBoundingClientRect().top, vh);
      const all = <T extends HTMLElement>(sel: string) => void gsap.utils.toArray<T>(sel);

      const words = all<HTMLElement>(".in-word").filter(below);
      const media = all<HTMLElement>(".in-media").filter(below);
      const slaps = all<HTMLElement>(".in-slap")
        .filter(below)
        .map((el) => ({ el, wide: el.offsetWidth > 240 }));
      const seq = all<HTMLElement>(".in-seq > *")
        .filter((el) => !el.matches(OWN))
        .filter(below);
      const side = (el: HTMLElement) =>
        el.classList.contains("self-end") ? 16 : el.classList.contains("self-start") ? -16 : 0;
      const chat = seq.filter((el) => side(el) !== 0);
      const rise = seq.filter((el) => side(el) === 0);
      const floats = desktop ? all<HTMLElement>('[data-parallax="float"]').filter(below) : [];
      const hero = desktop ? all<HTMLElement>('[data-parallax="hero"]') : [];

      // Write phase: hidden start states, only for what is below the fold.
      const pending = new Set<HTMLElement>([...words, ...media, ...seq, ...slaps.map((s) => s.el)]);
      gsap.set([...words, ...rise], { opacity: 0, y: 24 });
      gsap.set(chat, { opacity: 0, x: (_i: number, el: HTMLElement) => side(el) });
      gsap.set(media, { opacity: 0, scale: 0.97 });
      slaps.forEach(({ el, wide }) => void gsap.set(el, { opacity: 0, scale: wide ? 1.08 : 1.25 }));

      const take = (els: Element[]) => (els as HTMLElement[]).filter((el) => pending.delete(el));
      const batch = (targets: HTMLElement[], play: (els: HTMLElement[]) => void) => {
        if (targets.length === 0) return;
        const onEnter = (els: Element[]) => {
          const fresh = take(els);
          if (fresh.length > 0) play(fresh);
        };
        // onLeave too: a fast jump (anchor link) past an element must still reveal it.
        ScrollTrigger.batch(targets, {
          start: START,
          once: true,
          interval: 0.1,
          onEnter,
          onLeave: onEnter,
        });
      };

      batch(
        words,
        (els) =>
          void gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: OUT,
            stagger: 0.06,
            clearProps: CLEAR,
          }),
      );
      batch(
        rise,
        (els) =>
          void gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: OUT,
            stagger: staggerEach(els.length, 0.06, 0.36),
            clearProps: CLEAR,
          }),
      );
      batch(
        chat,
        (els) =>
          void gsap.to(els, {
            opacity: 1,
            x: 0,
            duration: 0.35,
            ease: OUT,
            stagger: staggerEach(els.length, 0.12, 0.48),
            clearProps: CLEAR,
          }),
      );
      batch(
        media,
        (els) =>
          void gsap.to(els, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.06,
            clearProps: CLEAR,
          }),
      );
      batch(
        slaps.map((s) => s.el),
        (els) =>
          els.forEach((el, i) => {
            gsap
              .timeline({
                delay: 0.1 + i * 0.09,
                onComplete: () => {
                  gsap.set(el, { clearProps: CLEAR });
                },
              })
              .to(el, { opacity: 1, duration: 0.12, ease: "none" }, 0)
              .to(el, { scaleX: 1.04, scaleY: 0.96, duration: 0.23, ease: "power2.in" }, 0)
              .to(el, { scaleX: 1, scaleY: 1, duration: 0.19, ease: OUT });
          }),
      );

      hero.forEach(
        (el) =>
          void gsap.to(el, {
            y: -40,
            ease: "none",
            scrollTrigger: { trigger: el, start: 0, end: "bottom top", scrub: 0.5 },
          }),
      );
      floats.forEach(
        (el) =>
          void gsap.fromTo(
            el,
            { y: 20 },
            {
              y: -20,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.5 },
            },
          ),
      );

      // Safety nets: focus and print never meet a hidden element.
      const reveal = (el: HTMLElement) => {
        pending.delete(el);
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: CLEAR });
      };
      const onFocus = (event: FocusEvent) => {
        const target = event.target as Node;
        pending.forEach((el) => {
          if (el.contains(target)) reveal(el);
        });
      };
      const onPrint = () => pending.forEach(reveal);
      document.addEventListener("focusin", onFocus);
      window.addEventListener("beforeprint", onPrint);
      return () => {
        document.removeEventListener("focusin", onFocus);
        window.removeEventListener("beforeprint", onPrint);
      };
    },
  );

  return () => mm.revert();
}
