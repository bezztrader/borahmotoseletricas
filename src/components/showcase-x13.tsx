"use client";

import { motion, type MotionValue, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { BIKE } from "@/lib/bike";
import { wa } from "@/lib/site";
import { ChargeButton } from "./cta";
import { useIsMobile } from "./motion";

/*
 * Pinned X13 showcase. The bike is a line drawing (no AI image of the real
 * model): its strokes are drawn by the scroll, then thin leader lines run out
 * to the parts, and at the end it "launches" off screen with a smear trail.
 * To use a real photo later, set PHOTO to its path in /public.
 */
const PHOTO: string | null = null; // e.g. "/images/modelos/x13.webp"



const PARTS = [
  { id: "motor", label: "Motor 1000W", dot: [170, 340], end: [70, 160], align: "left" },
  { id: "bateria", label: "Bateria", dot: [385, 290], end: [330, 430], align: "left" },
  { id: "freios", label: "Freios a disco", dot: [620, 340], end: [740, 210], align: "right" },
  { id: "painel", label: "Painel digital", dot: [568, 118], end: [470, 40], align: "right" },
] as const;

function Stroke({ d, p, from, to }: { d: string; p: MotionValue<number>; from: number; to: number }) {
  const len = useTransform(p, [from, to], [0, 1]);
  return <motion.path d={d} style={{ pathLength: len }} />;
}

function Callout({
  part,
  p,
  from,
}: {
  part: (typeof PARTS)[number];
  p: MotionValue<number>;
  from: number;
}) {
  const line = useTransform(p, [from, from + 0.07], [0, 1]);
  const show = useTransform(p, [from + 0.05, from + 0.1], [0, 1]);
  const [dx, dy] = part.dot;
  const [ex, ey] = part.end;
  return (
    <g>
      <motion.circle cx={dx} cy={dy} r="5" className="fill-volt" style={{ opacity: show }} />
      <motion.path d={`M${dx} ${dy}L${ex} ${ey}`} className="stroke-volt" style={{ pathLength: line }} strokeWidth="1.2" />
      <motion.text
        x={ex + (part.align === "left" ? 0 : 0)}
        y={ey - 10}
        textAnchor={part.align === "left" ? "start" : "end"}
        className="fill-paper"
        style={{ opacity: show, fontSize: 18, fontWeight: 700, letterSpacing: "0.12em" }}
      >
        {part.label.toUpperCase()}
      </motion.text>
    </g>
  );
}

export function ShowcaseX13() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const full = useMotionValue(0.85); // reduced motion: everything drawn, bike parked
  const p = reduce ? full : scrollYProgress;

  // the launch: bike leaves right, with two trailing ghosts for a smear
  const launch = useTransform(p, [0.86, 1], ["0%", "130%"]);
  const ghost1 = useTransform(p, [0.86, 1], ["0%", "100%"]);
  const ghost2 = useTransform(p, [0.86, 1], ["0%", "70%"]);
  const ghostOpacity = useTransform(p, [0.86, 0.9, 1], [0, 0.35, 0]);
  const skew = useTransform(p, [0.86, 1], [0, -14]);
  const copyOpacity = useTransform(p, [0, 0.84, 0.92], [1, 1, 0]);
  const meter = useTransform(p, [0.05, 0.82], [0, 1]);

  const drawing = (extra?: { opacity?: MotionValue<number>; x?: MotionValue<string> }) => (
    <motion.svg
      viewBox="0 0 800 460"
      className="absolute inset-0 h-full w-full overflow-visible"
      style={{ x: extra?.x ?? launch, skewX: skew, opacity: extra?.opacity }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {BIKE.map((d, i) => (
        <Stroke key={i} d={d} p={p} from={0.02 + i * 0.022} to={0.14 + i * 0.022} />
      ))}
      {extra ? null : PARTS.map((part, i) => <Callout key={part.id} part={part} p={p} from={0.46 + i * 0.09} />)}
    </motion.svg>
  );

  return (
    <section
      ref={ref}
      id="x13"
      aria-labelledby="x13-title"
      className="relative bg-ink"
      style={{ height: reduce ? "auto" : mobile ? "320vh" : "420vh" }}
    >
      <div className={reduce ? "relative" : "sticky top-0 h-svh overflow-hidden"}>
        <div className="mx-auto grid h-full max-w-[90rem] grid-rows-[auto_1fr_auto] gap-6 px-5 py-20 sm:px-10 lg:py-24">
          <motion.div className="flex flex-wrap items-end justify-between gap-6" style={{ opacity: reduce ? 1 : copyOpacity }}>
            <div>
              <h2 id="x13-title" className="display text-[clamp(4rem,16vw,12rem)] text-paper">
                X13
              </h2>
              <p className="label mt-3 text-volt">A queridinha da loja</p>
            </div>
            <div className="max-w-sm">
              <p className="text-lg text-paper/80">
                Motor de 1000W e uma das mais procuradas da Borah. Role pra ver ela por dentro.
              </p>
              {/* charge meter tied to the scroll */}
              <div aria-hidden="true" className="mt-5 flex items-center gap-3">
                <span className="relative h-3 w-40 overflow-hidden rounded-[3px] border border-paper/40 p-[2px]">
                  <motion.span className="block h-full origin-left rounded-[2px] bg-volt" style={{ scaleX: meter }} />
                </span>
                <span className="label text-mist">Carga</span>
              </div>
            </div>
          </motion.div>

          <div className="relative text-paper/85" data-cursor="Ver">
            {PHOTO ? (
              <motion.div className="absolute inset-0" style={{ x: launch, skewX: skew }}>
                <Image src={PHOTO} alt="Moto elétrica X13" fill sizes="90vw" className="object-contain" />
              </motion.div>
            ) : (
              <>
                {reduce ? null : drawing({ opacity: ghostOpacity, x: ghost2 })}
                {reduce ? null : drawing({ opacity: ghostOpacity, x: ghost1 })}
                {drawing()}
              </>
            )}
          </div>

          <motion.div className="flex flex-wrap items-center gap-5" style={{ opacity: reduce ? 1 : copyOpacity }}>
            <ChargeButton href={wa("Olá! Vim pelo site e quero testar a X13")}>Quero testar a X13</ChargeButton>
            <span className="label text-mist">Ilustração · foto real em breve</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
