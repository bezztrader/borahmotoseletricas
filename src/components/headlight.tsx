"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { type ReactNode, useEffect, useRef } from "react";
import { LaneIcon, NoPumpIcon, WrenchIcon } from "./icons";
import { EASE, Reveal, SplitTitle, useFinePointerDesktop } from "./motion";

const REASONS: { icon: ReactNode; title: string; text: string }[] = [
  {
    icon: <NoPumpIcon className="size-10" />,
    title: "Tchau, posto.",
    text: "Carrega na tomada e paga conta de luz, não bomba de gasolina. Sem fila, sem cheiro, sem susto no preço.",
  },
  {
    icon: <LaneIcon className="size-10" />,
    title: "Passa no trânsito.",
    text: "Leve, ágil e estaciona em qualquer cantinho. A Estrada dos Três Rios parada não é mais problema seu.",
  },
  {
    icon: <WrenchIcon className="size-10" />,
    title: "Manutenção simples.",
    text: "Motor elétrico tem bem menos peça pra gastar que motor a combustão. Sem troca de óleo e sem vela.",
  },
];

/** Speedometer that sweeps to its value once it scrolls into view. */
function Gauge() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  return (
    <svg ref={ref} viewBox="0 0 240 150" aria-hidden="true" className="w-full max-w-[320px] overflow-visible">
      <path d="M20 130a100 100 0 0 1 200 0" fill="none" stroke="var(--graphite-2)" strokeWidth="10" strokeLinecap="round" />
      <motion.path
        d="M20 130a100 100 0 0 1 200 0"
        fill="none"
        stroke="var(--volt)"
        strokeWidth="10"
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.4, ease: EASE }}
      />
      {Array.from({ length: 11 }).map((_, i) => {
        const a = (-90 + i * 18) * (Math.PI / 180);
        return (
          <line
            key={i}
            x1={120 + Math.sin(a) * 82}
            y1={130 - Math.cos(a) * 82}
            x2={120 + Math.sin(a) * 72}
            y2={130 - Math.cos(a) * 72}
            stroke="var(--mist)"
            strokeWidth="1.5"
          />
        );
      })}
      <motion.g
        initial={{ rotate: reduce ? 90 : -90 }}
        animate={inView ? { rotate: 90 } : undefined}
        transition={{ duration: 1.4, ease: EASE }}
        style={{ originX: "120px", originY: "130px" }}
      >
        <line x1="120" y1="130" x2="120" y2="52" stroke="var(--paper)" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
      <circle cx="120" cy="130" r="7" fill="var(--volt)" />
    </svg>
  );
}

/**
 * "Por que elétrica", the dark section where the cursor is a headlight: a
 * soft beam reveals wet asphalt and hidden notes. On phones the beam rides
 * the scroll on its own.
 */
export function WhyElectric() {
  const ref = useRef<HTMLElement>(null);
  const desktop = useFinePointerDesktop();
  const reduce = useReducedMotion();
  const x = useMotionValue(50);
  const y = useMotionValue(40);
  const sx = useSpring(x, { stiffness: 140, damping: 24 });
  const sy = useSpring(y, { stiffness: 140, damping: 24 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const autoX = useTransform(scrollYProgress, [0.15, 0.85], [20, 80]);
  const autoY = useTransform(scrollYProgress, [0.15, 0.85], [25, 75]);
  const beamX = desktop ? sx : autoX;
  const beamY = desktop ? sy : autoY;
  const clip = useMotionTemplate`circle(${desktop ? 220 : 170}px at ${beamX}% ${beamY}%)`;

  useEffect(() => {
    if (!desktop || reduce) return;
    const el = ref.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set(((e.clientX - r.left) / r.width) * 100);
      y.set(((e.clientY - r.top) / r.height) * 100);
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, [desktop, reduce, x, y]);

  return (
    <section ref={ref} id="por-que" aria-labelledby="por-que-title" className="relative overflow-hidden bg-ink">
      {/* what the headlight reveals */}
      {reduce ? null : (
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ clipPath: clip }}>
          <Image src="/media/asfalto.webp" alt="" fill sizes="100vw" className="object-cover opacity-70" />
          <div className="absolute inset-0 bg-ink/30" />
          <span className="display absolute top-[18%] left-[8%] text-5xl text-volt/80">0 L</span>
          <span className="label absolute top-[62%] left-[62%] text-paper/80">Estaciona em qualquer canto</span>
          <span className="label absolute top-[80%] left-[14%] text-paper/80">Carrega na tomada</span>
          <span className="display absolute top-[34%] right-[10%] text-4xl text-paper/40">Sem fila</span>
        </motion.div>
      )}

      <div className="relative mx-auto grid max-w-[90rem] gap-14 px-5 py-28 sm:px-10 lg:grid-cols-12 lg:py-36">
        <div className="lg:col-span-6">
          <div className="flex items-start gap-5">
            <span className="label pt-3 text-volt">01</span>
            <SplitTitle id="por-que-title" text="Por que *elétrica?*" className="text-[clamp(2.8rem,8vw,6.5rem)] text-paper" />
          </div>
          <Reveal as="p" className="mt-8 max-w-[44ch] text-lg leading-relaxed text-paper/75">
            Porque o Rio já tem coisa demais pra te estressar. Posto, trânsito e oficina não precisam estar na lista.
          </Reveal>
          <div className="mt-12 flex items-end gap-6">
            <Gauge />
            <p className="label max-w-[14ch] pb-4 text-mist">100% elétrica, 0% gasolina</p>
          </div>
        </div>
        <ol className="grid gap-10 lg:col-span-5 lg:col-start-8">
          {REASONS.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.08} className="grid grid-cols-[auto_1fr] gap-5 border-t border-rule pt-8">
              <span className="text-volt">{r.icon}</span>
              <div>
                <h3 className="display text-2xl text-paper sm:text-3xl">{r.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-paper/70">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
