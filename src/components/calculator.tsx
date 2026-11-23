"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { ECONOMIA, economiaMensal } from "@/lib/economia";
import { wa } from "@/lib/site";
import { ChargeButton } from "./cta";

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/** Number that rolls to its new value when the input changes. */
function Rolling({ value, className = "" }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const last = useRef(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = brl(value);
      last.current = value;
      return;
    }
    const c = animate(last.current, value, {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = brl(v);
      },
    });
    last.current = value;
    return () => c.stop();
  }, [value, reduce]);
  return (
    <span ref={ref} className={`mono-num ${className}`}>
      {brl(value)}
    </span>
  );
}

/**
 * "Quanto você economiza": km per day → estimated monthly and yearly saving
 * trading gasoline for electricity. Constants live in lib/economia.ts.
 */
export function Calculator() {
  const id = useId();
  const [km, setKm] = useState<number>(ECONOMIA.kmInicial);
  const mes = economiaMensal(km);
  const ano = mes * 12;
  const fill = useMotionValue((km - ECONOMIA.kmMin) / (ECONOMIA.kmMax - ECONOMIA.kmMin));
  const needle = useTransform(fill, [0, 1], [-120, 120]);

  useEffect(() => {
    fill.set((km - ECONOMIA.kmMin) / (ECONOMIA.kmMax - ECONOMIA.kmMin));
  }, [km, fill]);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-5">
        <label htmlFor={id} className="label text-ink/60">
          Quantos km você roda por dia?
        </label>
        <div className="mt-6 flex items-end gap-4">
          <span className="display mono-num text-[clamp(4rem,12vw,7.5rem)] leading-none text-ink">{km}</span>
          <span className="pb-3 text-xl font-bold text-ink/60">km/dia</span>
        </div>
        <input
          id={id}
          type="range"
          min={ECONOMIA.kmMin}
          max={ECONOMIA.kmMax}
          step={1}
          value={km}
          onChange={(e) => setKm(Number(e.target.value))}
          className="range-volt mt-8 w-full"
          aria-valuetext={`${km} quilômetros por dia`}
        />
        <div className="label mt-3 flex justify-between text-ink/50">
          <span>{ECONOMIA.kmMin} km</span>
          <span>{ECONOMIA.kmMax} km</span>
        </div>
      </div>

      <div className="relative lg:col-span-6 lg:col-start-7">
        {/* speedometer dial: the needle follows the slider */}
        <svg viewBox="0 0 220 130" aria-hidden="true" className="mx-auto mb-6 w-56 overflow-visible text-ink/25">
          <path d="M20 120a90 90 0 0 1 180 0" fill="none" stroke="currentColor" strokeWidth="2" />
          {Array.from({ length: 13 }).map((_, i) => {
            const a = (-120 + i * 20) * (Math.PI / 180);
            return (
              <line
                key={i}
                x1={110 + Math.sin(a) * 80}
                y1={120 - Math.cos(a) * 80}
                x2={110 + Math.sin(a) * (i % 3 === 0 ? 66 : 72)}
                y2={120 - Math.cos(a) * (i % 3 === 0 ? 66 : 72)}
                stroke="currentColor"
                strokeWidth={i % 3 === 0 ? 2 : 1.2}
              />
            );
          })}
          <motion.g style={{ rotate: needle, originX: "110px", originY: "120px" }}>
            <line x1="110" y1="120" x2="110" y2="48" stroke="var(--volt-deep)" strokeWidth="3" strokeLinecap="round" />
          </motion.g>
          <circle cx="110" cy="120" r="6" fill="var(--ink)" />
        </svg>
        <dl className="grid gap-6 sm:grid-cols-2">
          <div className="border-t border-ink/15 pt-5">
            <dt className="label text-ink/60">Por mês</dt>
            <dd className="display mt-3 text-[clamp(2.4rem,6vw,3.6rem)] text-ink">
              <Rolling value={mes} />
            </dd>
          </div>
          <div className="border-t border-ink/15 pt-5">
            <dt className="label text-ink/60">Por ano</dt>
            <dd className="display mt-3 text-[clamp(2.4rem,6vw,3.6rem)] text-volt-ink">
              <Rolling value={ano} />
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-sm leading-relaxed text-ink/60">
          Valores estimados. Comparamos gasolina a R$ {ECONOMIA.gasolinaPorLitro.toFixed(2).replace(".", ",")}/L numa moto de{" "}
          {ECONOMIA.kmPorLitro} km/L com energia a R$ {ECONOMIA.tarifaKwh.toFixed(2).replace(".", ",")}/kWh, rodando{" "}
          {ECONOMIA.diasPorMes} dias por mês. Não é preço de produto, é só a conta do combustível.
        </p>
        <div className="mt-8">
          <ChargeButton href={wa(`Olá! Vim pelo site. Rodo uns ${km} km por dia e quero economizar com uma elétrica`)}>
            Quero economizar isso
          </ChargeButton>
        </div>
      </div>
    </div>
  );
}
