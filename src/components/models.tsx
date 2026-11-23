"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BIKE } from "@/lib/bike";
import { type Model, MODELS, wa } from "@/lib/site";
import { ChargeButton } from "./cta";
import { EASE, useFinePointerDesktop } from "./motion";

function ModelCard({ model, index }: { model: Model; index: number }) {
  const ref = useRef<HTMLElement>(null);
  // "in focus": most of the card is on screen (works for the pinned track and the swipe carousel)
  const focus = useInView(ref, { amount: 0.7 });
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  const powered = focus || hover;

  return (
    <motion.article
      ref={ref}
      className="group relative flex w-[82vw] shrink-0 snap-center flex-col rounded-[20px] border border-rule-light bg-paper p-6 text-ink sm:w-[400px] lg:w-[440px] lg:p-7"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label text-ink/70">{String(index + 1).padStart(2, "0")} · Modelo</p>
          <h3 className="display mt-3 text-[clamp(2.4rem,5vw,3.4rem)]">{model.name}</h3>
        </div>
        <p className={`mt-1 text-right text-sm font-bold ${model.tag.startsWith("[") ? "placeholder-slot" : "text-volt-ink"}`}>{model.tag}</p>
      </div>

      {/* photo slot: line illustration until a real photo is set in lib/site.ts */}
      <div className="relative my-5 aspect-[2/1] overflow-hidden rounded-[14px] bg-ink" data-cursor="Ver">
        {model.photo ? (
          <Image src={model.photo} alt={`Moto elétrica ${model.name}`} fill sizes="520px" className="object-cover" />
        ) : (
          <motion.svg
            viewBox="0 0 800 460"
            aria-hidden="true"
            className="absolute inset-0 m-auto h-[88%] w-[88%] text-paper/80"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={reduce ? undefined : { x: hover ? 14 : 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {BIKE.map((d) => (
              <path key={d} d={d} />
            ))}
          </motion.svg>
        )}
        <span className="label absolute bottom-3 left-4 text-paper/50">{model.photo ? "" : "Ilustração"}</span>
      </div>

      <dl className="grid grid-cols-3 gap-3 border-t border-ink/10 pt-4">
        {model.specs.map((s) => (
          <div key={s.label}>
            <dt className="text-[0.72rem] font-bold tracking-[0.1em] text-ink/70 uppercase">{s.label}</dt>
            <dd className={`mt-1 font-bold ${s.value.startsWith("[") ? "placeholder-slot text-xs" : "text-lg"}`}>{s.value}</dd>
          </div>
        ))}
      </dl>

      {/* power meter: cells light up when the card is in focus */}
      <div className="mt-6 flex items-center gap-3" aria-hidden="true">
        <span className="label w-16 text-ink/70">Potência</span>
        <div className="flex flex-1 gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.span
              key={i}
              className="h-2.5 flex-1 origin-left rounded-[2px] bg-ink"
              initial={false}
              animate={{ scaleX: powered && i < Math.round(model.power * 10) ? 1 : 0.15, opacity: powered && i < Math.round(model.power * 10) ? 1 : 0.25 }}
              transition={{ duration: 0.35, ease: EASE, delay: powered ? i * 0.04 : 0 }}
            />
          ))}
        </div>
      </div>

      <div className="mt-7">
        <ChargeButton size="md" href={wa(`Olá! Vim pelo site e quero testar a ${model.name}`)}>
          Quero testar
        </ChargeButton>
      </div>
    </motion.article>
  );
}

/**
 * Models. Desktop: the section pins and the track slides sideways as you
 * scroll down. Phones/tablets: a native swipe carousel with snap.
 */
export function Models() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const desktop = useFinePointerDesktop();
  const reduce = useReducedMotion();
  const pin = desktop && !reduce;
  const [overflow, setOverflow] = useState(0);

  useEffect(() => {
    if (!pin) return;
    const measure = () => {
      const t = track.current;
      if (t) setOverflow(Math.max(0, t.scrollWidth - window.innerWidth + 80));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pin]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -overflow]);

  const cards = MODELS.map((m, i) => <ModelCard key={m.id} model={m} index={i} />);
  const more = (
    <div className="flex w-[70vw] shrink-0 snap-center flex-col justify-center rounded-[20px] border border-dashed border-paper/25 p-8 sm:w-[320px]">
      <p className="label text-mist">Mais modelos</p>
      <p className="mt-3 text-lg text-paper/80">Scooters e bikes elétricas também. Pergunta no WhatsApp o que tem na loja hoje.</p>
    </div>
  );

  return (
    <section
      ref={ref}
      id="modelos"
      aria-labelledby="modelos-title"
      className="relative bg-graphite"
      style={pin ? { height: `calc(100vh + ${overflow}px)` } : undefined}
      data-cursor={pin ? "Arraste" : undefined}
    >
      <div className={pin ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden" : "py-24"}>
        <div className="mx-auto mb-8 flex w-full max-w-[90rem] flex-wrap items-end justify-between gap-6 px-5 pt-16 sm:px-10">
          <div className="flex items-start gap-5">
            <span className="label pt-3 text-volt">03</span>
            <h2 id="modelos-title" className="display text-[clamp(2.8rem,7vw,5.2rem)] text-paper">
              Escolhe a <span className="text-volt">sua.</span>
            </h2>
          </div>
          <p className="max-w-xs text-base text-paper/70">
            {pin ? "Role pra passar pelos modelos." : "Arraste pro lado pra ver os modelos."} Sem preço aqui: o test ride resolve.
          </p>
        </div>
        {pin ? (
          <motion.div ref={track} className="flex w-max gap-6 px-10" style={{ x }}>
            {cards}
            {more}
          </motion.div>
        ) : (
          <div ref={track} className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-10 [scrollbar-width:none]">
            {cards}
            {more}
          </div>
        )}
      </div>
    </section>
  );
}
