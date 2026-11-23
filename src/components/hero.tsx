"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { type CSSProperties, useEffect, useRef, useSyncExternalStore } from "react";
import { ChargeButton } from "./cta";
import { CutText } from "./cut-text";
import { useFinePointerDesktop } from "./motion";

const at = (s: number) => ({ "--at": s }) as CSSProperties;

/**
 * Hero, concept "CARGA COMPLETA". The charge intro, title cut and headlight
 * streak are CSS (hero.css) so they run at first paint. Motion adds the
 * mouse depth on desktop and the scroll-linked exit: the copy slides off with
 * a horizontal smear, the video pushes in.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const desktop = useFinePointerDesktop();
  // the loop is client-only: pick 16:9 or 9:16 after hydration (the poster <picture> covers first paint)
  const portrait = useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia("(max-aspect-ratio: 4/5)");
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia("(max-aspect-ratio: 4/5)").matches,
    () => null
  );
  const base = portrait === null ? null : portrait ? "/media/hero-9x16" : "/media/hero-16x9";
  const src = reduce || !base ? null : { mp4: `${base}.mp4`, webm: `${base}.webm` };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.1,
    });
    io.observe(v);
    return () => io.disconnect();
  }, [base, reduce]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyX = useTransform(scrollYProgress, [0, 0.6], [0, 140]);
  const copySkew = useTransform(scrollYProgress, [0, 0.6], [0, -10]);
  const copyStretch = useTransform(scrollYProgress, [0, 0.6], [1, 1.08]);
  const copyOpacity = useTransform(scrollYProgress, [0.05, 0.55], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 120, damping: 20, mass: 0.6 };
  const vidX = useSpring(useTransform(mx, [-1, 1], [-10, 10]), spring);
  const vidY = useSpring(useTransform(my, [-1, 1], [-8, 8]), spring);
  const txtX = useSpring(useTransform(mx, [-1, 1], [6, -6]), spring);

  useEffect(() => {
    if (!desktop || reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [desktop, reduce, mx, my]);

  const live = !reduce;
  const depth = desktop && live;

  return (
    <section ref={ref} id="topo" aria-labelledby="hero-title" className="relative isolate min-h-svh overflow-hidden bg-ink">
      {/* first visit: battery charges to 100%, then a pulse sweeps the sheet away */}
      <div aria-hidden="true" className="charge-overlay">
        <span className="charge-sheet" />
        <span className="charge-pulse" />
        <div className="charge-meter">
          <span className="label text-mist">Carregando</span>
          <span className="charge-cell">
            <span className="charge-bar" />
          </span>
          <span className="charge-count display text-2xl text-volt" />
        </div>
      </div>

      {/* video layer: poster paints first (LCP), loop on top, headlight streak once */}
      <motion.div className="hx-video absolute inset-0 -z-10" style={live ? { scale: videoScale } : undefined}>
        <motion.div className="absolute -inset-4" style={depth ? { x: vidX, y: vidY } : undefined} data-cursor="Ver">
          <picture>
            <source media="(max-aspect-ratio: 4/5)" srcSet="/media/hero-9x16-poster.webp" />
            <img
              src="/media/hero-16x9-poster.webp"
              alt=""
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
          {src ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              aria-hidden="true"
            >
              <source src={src.webm} type="video/webm" />
              <source src={src.mp4} type="video/mp4" />
            </video>
          ) : null}
          <span aria-hidden="true" className="light-streak" />
        </motion.div>
        {/* legibility: darken the left/bottom where the copy sits */}
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(11_11_11/0.92)_0%,rgb(11_11_11/0.55)_45%,rgb(11_11_11/0.1)_75%),linear-gradient(0deg,rgb(11_11_11/0.95)_0%,transparent_45%)]" />
      </motion.div>
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      <div className="hero-body mx-auto flex min-h-svh max-w-[90rem] flex-col justify-end px-5 pt-28 pb-16 sm:px-10 lg:pb-24">
        <motion.div
          style={live ? { x: copyX, skewX: copySkew, scaleX: copyStretch, opacity: copyOpacity, transformOrigin: "left center" } : undefined}
        >
          <motion.div style={depth ? { x: txtX } : undefined}>
            <h1 id="hero-title" aria-label="Borah de elétrica?" className="display max-w-[12ch] text-[clamp(3rem,10.5vw,9rem)] text-paper">
              <CutText text="Borah de *elétrica?*" start={1.12} wordStagger={0.08} charStagger={0.018} />
            </h1>
            <p className="label hx-up mt-6 text-volt" style={at(1.4)}>
              Mobilidade urbana inteligente · Freguesia, RJ
            </p>
            <p className="hx-up mt-5 max-w-[40ch] text-lg leading-relaxed text-paper/85 sm:text-xl" style={at(1.48)}>
              Moto, scooter e bike elétrica pra fugir do trânsito e esquecer o posto. Vem pra loja e testa antes de levar.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
              <span className="hx-up" style={at(1.56)}>
                <ChargeButton />
              </span>
              <a
                href="#modelos"
                className="hx-up btn-line inline-flex min-h-14 items-center rounded-full px-7 text-base font-bold text-paper sm:text-lg"
                style={at(1.64)}
              >
                Ver modelos
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div aria-hidden="true" className="label absolute right-5 bottom-8 hidden flex-col items-center gap-3 text-mist sm:flex sm:right-10">
        <span className="[writing-mode:vertical-rl]">Role</span>
        <span className="scroll-cue-line">
          <span />
        </span>
      </div>
    </section>
  );
}
