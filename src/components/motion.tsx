"use client";

import {
  animate,
  MotionConfig,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { type ReactNode, useEffect, useRef, useState, useSyncExternalStore } from "react";

/** One easing for the whole site: soft, no overshoot. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEW = { once: true, margin: "0px 0px -10% 0px" } as const;

/** Transforms are dropped for visitors who ask for reduced motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** Phones: shorter animations, no parallax, no cursor, no magnetic buttons. */
export function useIsMobile() {
  return useMedia("(max-width: 767px)");
}

/** Desktop with a real mouse: the only place for parallax, cursor and magnet. */
export function useFinePointerDesktop() {
  return useMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
}

/** Fade + short rise, once, as the block enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "p";
}) {
  const mobile = useIsMobile();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: mobile ? 12 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: mobile ? 0.5 : 0.7, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/**
 * Section title: letters rise out of a per-word mask in stagger. Words wrapped
 * in *asterisks* turn volt a beat later (a volt copy fades in over them).
 */
export function SplitTitle({
  id,
  text,
  className = "",
  accent = "text-volt",
}: {
  id?: string;
  text: string;
  className?: string;
  /** colour of the *keyword*; use text-volt-ink on light backgrounds */
  accent?: string;
}) {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, VIEW);
  const words = text.split(" ");
  const step = mobile ? 0.018 : 0.026;
  const dur = mobile ? 0.5 : 0.7;
  // index of each word's first letter, for the running stagger
  const starts = words.reduce<number[]>((acc, raw, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + words[i - 1].replace(/\*/g, "").length);
    return acc;
  }, []);

  return (
    <h2 ref={ref} id={id} aria-label={text.replace(/\*/g, "")} className={`display ${className}`}>
      {words.map((raw, w) => {
        const volt = raw.startsWith("*");
        const word = raw.replace(/\*/g, "");
        const start = starts[w];
        const voltDelay = (start + word.length) * step + 0.25;
        return (
          <span key={w} aria-hidden="true" className="relative mr-[0.22em] -mt-[0.32em] inline-block overflow-hidden whitespace-nowrap pt-[0.32em] pb-[0.06em] align-bottom last:mr-0">
            {word.split("").map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={reduce ? { opacity: 0 } : { y: "105%" }}
                animate={inView ? (reduce ? { opacity: 1 } : { y: "0%" }) : undefined}
                transition={{ duration: dur, ease: EASE, delay: (start + i) * step }}
              >
                {ch}
              </motion.span>
            ))}
            {volt ? (
              <motion.span
                className={`absolute inset-x-0 bottom-[0.06em] ${accent}`}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ duration: 0.9, ease: EASE, delay: voltDelay }}
              >
                {word}
              </motion.span>
            ) : null}
          </span>
        );
      })}
    </h2>
  );
}

/**
 * Section number (counts 00 → NN) with a small tracked label, set vertically
 * in a margin column beside the title rather than stacked above it.
 */
export function SectionLabel({ n, children, tone = "dark" }: { n: number; children: ReactNode; tone?: "dark" | "light" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEW);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const c = animate(0, n, {
      duration: 0.6,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v)).padStart(2, "0");
      },
    });
    return () => c.stop();
  }, [inView, n, reduce]);
  return (
    <div className={`label flex shrink-0 flex-col items-center gap-3 pt-2 ${tone === "light" ? "text-ink/75" : "text-bone-dim"}`}>
      <span ref={ref} className={`tabular-nums ${tone === "light" ? "text-ink" : "text-volt"}`}>
        {String(n).padStart(2, "0")}
      </span>
      <span aria-hidden="true" className="h-8 w-px bg-current opacity-50" />
      <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap">{children}</span>
    </div>
  );
}

/** Photo reveal: clip-path from the bottom while the image settles 1.1 → 1. */
export function MaskImage({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const dur = mobile ? 0.6 : 0.9;
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={VIEW}
      transition={{ duration: dur, ease: EASE, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={VIEW}
        transition={{ duration: dur + 0.2, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Thin volt reading-progress bar along the top edge. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-volt"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

/** Slow ribbon whose speed follows the scroll (faster while scrolling). */
export function ScrollMarquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  const x = useTransform(() => `${-(base.get() % 50)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const boost = Math.min(Math.abs(velocity.get()) / 500, 5);
    const speed = (mobile ? 1.6 : 1.2) * (1 + boost);
    base.set(base.get() + (speed * delta) / 1000);
  });

  const copy = (
    <ul className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-[0.7em] px-[0.7em] whitespace-nowrap">
          <span>{item}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[0.6em] shrink-0 fill-volt">
            <path d="M13.5 2 5 13.2h5.6L9.5 22 19 9.8h-5.7z" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden border-y border-[var(--rule)] py-5">
      <p className="sr-only">{items.join(", ")}</p>
      <motion.div aria-hidden="true" className="display flex w-max text-[clamp(1.75rem,5vw,3.25rem)] text-bone" style={{ x }}>
        {copy}
        {copy}
      </motion.div>
    </div>
  );
}

/** Small dot following the mouse; grows and shows the [data-cursor] label ("Ver", "Arraste"). */
export function CustomCursor() {
  const desktop = useFinePointerDesktop();
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!desktop || reduce) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(el ? el.getAttribute("data-cursor") || "Ver" : "");
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [desktop, reduce, x, y]);

  if (!desktop || reduce) return null;
  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[80]" style={{ x: sx, y: sy }}>
      <motion.div
        className="cursor-dot"
        initial={false}
        animate={{ scale: label ? 1 : 0.16, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <motion.span initial={false} animate={{ opacity: label ? 1 : 0 }} transition={{ duration: 0.2 }}>
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

/**
 * Highlight band: as it scrolls in, a bone layer fades over the black (opacity
 * only) and the dark content fades in on top, so black turns to bone gradually.
 */
export function ToneShift({
  children,
  className = "",
  id,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 25%"] });
  const bg = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const content = useTransform(scrollYProgress, [0.45, 0.95], [0, 1]);
  return (
    <section ref={ref} id={id} aria-labelledby={labelledBy} className={`relative overflow-hidden ${className}`}>
      <motion.div aria-hidden="true" className="absolute inset-0 bg-paper" style={{ opacity: reduce ? 1 : bg }} />
      <motion.div className="relative" style={{ opacity: reduce ? 1 : content }}>
        {children}
      </motion.div>
    </section>
  );
}
