"use client";

import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useId, useRef } from "react";
import { ChargeButton } from "./cta";
import { EASE, Reveal, SplitTitle } from "./motion";

const STEPS = [
  { n: "1", title: "Chama no WhatsApp", text: "Fala qual modelo te interessa e o melhor dia pra passar." },
  { n: "2", title: "Vem e testa", text: "Na loja da Freguesia você sobe, liga e sente a moto antes de decidir." },
  { n: "3", title: "Sai pilotando", text: "Fechou? A gente explica tudo e você já sai rodando elétrico." },
];

/**
 * Test ride: a dashed road links the three stops and is drawn as you scroll
 * (a solid mask path grows; the dashes stay dashes). The road only grows.
 */
export function TestRide() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const maskId = useId().replace(/:/g, "");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const drawn = useMotionValue(0);
  const full = useMotionValue(1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > drawn.get()) drawn.set(v);
  });

  return (
    <section id="test-ride" aria-labelledby="test-ride-title" className="relative bg-paper text-ink">
      <div className="mx-auto max-w-[90rem] px-5 py-28 sm:px-10 lg:py-36">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="flex items-start gap-5 lg:col-span-8">
            <span className="label pt-3 text-volt-ink">04</span>
            <SplitTitle
              id="test-ride-title"
              text="Aqui você não escolhe sua moto no *escuro.*"
              accent="text-volt-ink"
              className="text-[clamp(2.4rem,6.5vw,5.4rem)] text-ink"
            />
          </div>
          <Reveal as="p" className="max-w-sm self-end text-lg leading-relaxed text-ink/70 lg:col-span-4">
            Test ride é de graça e sem compromisso. Você sente na mão antes de levar pra casa.
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-20">
          {/* the road */}
          <svg aria-hidden="true" viewBox="0 0 1200 80" preserveAspectRatio="none" className="absolute inset-x-0 top-0 hidden h-20 w-full md:block">
            <defs>
              <mask id={maskId}>
                <motion.path
                  d="M40 40C180 6 300 74 440 40S700 6 840 40S1060 74 1180 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="12"
                  style={{ pathLength: reduce ? full : drawn }}
                />
              </mask>
            </defs>
            <path
              d="M40 40C180 6 300 74 440 40S700 6 840 40S1060 74 1180 40"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeDasharray="14 12"
              mask={`url(#${maskId})`}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <ol className="relative grid gap-12 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.n}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
              >
                <span className="display relative z-10 grid size-20 place-items-center rounded-full bg-ink text-3xl text-volt">
                  {s.n}
                </span>
                <h3 className="display mt-6 text-2xl sm:text-3xl">{s.title}</h3>
                <p className="mt-3 max-w-[30ch] text-base leading-relaxed text-ink/70">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
        <div className="mt-16">
          <ChargeButton>Marcar meu test ride</ChargeButton>
        </div>
      </div>
    </section>
  );
}
