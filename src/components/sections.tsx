"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { ADDRESS, HOURS, MAPS_EMBED_URL, MAPS_URL, SERVICES } from "@/lib/site";
import { BorahSymbol } from "./brand";
import { ChargeButton, InstagramButton } from "./cta";
import { ArrowIcon } from "./icons";
import { EASE, MaskImage, Reveal, SplitTitle, useIsMobile } from "./motion";

/** Section number + title, side by side (no kicker stacked above). */
function Heading({ n, id, text, tone = "dark", size = "text-[clamp(2.4rem,6.5vw,5.4rem)]", className = "" }: { n: string; id: string; text: string; tone?: "dark" | "light"; size?: string; className?: string }) {
  return (
    <div className="flex items-start gap-5">
      <span className={`label pt-3 ${tone === "light" ? "text-volt-ink" : "text-volt"}`}>{n}</span>
      <SplitTitle id={id} text={text} accent={tone === "light" ? "text-volt-ink" : "text-volt"} className={`${size} ${tone === "light" ? "text-ink" : "text-paper"} ${className}`} />
    </div>
  );
}

/** Services as an editorial ledger, the dash leader drawn per row. */
export function Services() {
  const mobile = useIsMobile();
  const reduce = useReducedMotion();
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="relative bg-ink">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 py-28 sm:px-10 lg:grid-cols-12 lg:py-36">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Heading n="05" id="servicos-title" text="Do test ride à *oficina.*" size="text-[clamp(2.4rem,4.6vw,4.2rem)]" />
            <Reveal as="p" className="mt-6 max-w-[34ch] text-base leading-relaxed text-paper/70">
              Tudo na mesma loja. Comprou aqui, é atendido aqui.
            </Reveal>
          </div>
        </div>
        <ol className="divide-y divide-rule border-y border-rule lg:col-span-7 lg:col-start-6">
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.name}
              className="grid gap-3 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-baseline md:gap-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: mobile ? 0.5 : 0.7, ease: EASE, delay: i * 0.07 }}
            >
              <div className="flex items-baseline gap-4">
                <span className="label w-7 shrink-0 text-volt">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display text-[clamp(1.5rem,3.4vw,2.2rem)] text-paper">{s.name}</h3>
                <motion.span
                  aria-hidden="true"
                  className="speed-leader mb-2 hidden flex-1 origin-left md:block"
                  initial={reduce ? { opacity: 0 } : { scaleX: 0 }}
                  whileInView={reduce ? { opacity: 1 } : { scaleX: 1 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ duration: 0.8, ease: EASE, delay: i * 0.07 + 0.2 }}
                />
              </div>
              <p className="pl-11 text-base leading-relaxed text-paper/70 md:pl-0 md:text-lg">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Instagram invitation: big type, the symbol, and a mood visual. No invented store photos. */
export function FollowUs() {
  return (
    <section aria-labelledby="siga-title" className="relative overflow-hidden bg-graphite">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-28 sm:px-10 lg:grid-cols-12 lg:items-center lg:py-36">
        <div className="relative lg:col-span-7">
          <BorahSymbol ring={false} className="pointer-events-none absolute -top-16 -left-10 w-[60%] opacity-[0.06]" />
          <Heading n="06" id="siga-title" text="A loja, os clientes e os modelos *rodando.*" />
          <Reveal as="p" className="mt-8 max-w-[40ch] text-lg leading-relaxed text-paper/75">
            Entrega de moto, test ride, bastidor da oficina. Tá tudo no Instagram da unidade Freguesia.
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <InstagramButton big className="text-paper" />
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:col-span-5">
          <MaskImage className="frame relative aspect-[3/4]">
            <Image src="/media/painel.webp" alt="Painel digital de uma moto elétrica aceso à noite" fill sizes="(min-width:1024px) 260px, 45vw" className="object-cover" />
          </MaskImage>
          <MaskImage className="frame relative mt-16 aspect-[3/4]" delay={0.1}>
            <Image src="/media/carregador.webp" alt="Cabo de carregamento conectado a uma scooter elétrica" fill sizes="(min-width:1024px) 260px, 45vw" className="object-cover" />
          </MaskImage>
          <p className="label col-span-2 text-mist">Imagens ilustrativas</p>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative bg-paper text-ink">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-28 sm:px-10 lg:grid-cols-12 lg:py-36">
        <div className="lg:col-span-6">
          <Heading n="07" id="sobre-title" text="De Caxias pra *Jacarepaguá.*" tone="light" size="text-[clamp(2rem,5vw,4.4rem)]" />
        </div>
        <div className="space-y-6 lg:col-span-5 lg:col-start-8 lg:pt-4">
          <Reveal as="p" className="text-xl leading-relaxed text-ink/85">
            A Borah começou em Duque de Caxias. Em 2026 abriu a loja da Freguesia pra atender Jacarepaguá e região.
          </Reveal>
          <Reveal as="p" delay={0.08} className="text-lg leading-relaxed text-ink/70">
            O compromisso é o mesmo nas duas: veículo de qualidade e pós-venda de verdade. Você não compra e some, a gente
            continua do lado.
          </Reveal>
          <Reveal delay={0.14} className="grid grid-cols-2 gap-6 border-t border-ink/15 pt-6">
            <div>
              <p className="display text-4xl">2</p>
              <p className="label mt-2 text-ink/60">Unidades no RJ</p>
            </div>
            <div>
              <p className="display text-4xl">2026</p>
              <p className="label mt-2 text-ink/60">Chegada na Freguesia</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Location() {
  return (
    <section id="onde" aria-labelledby="onde-title" className="relative bg-paper-2 text-ink">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-28 sm:px-10 lg:grid-cols-12 lg:py-36">
        <div className="lg:col-span-5">
          <Heading n="08" id="onde-title" text="Cola na *loja.*" tone="light" />
          <Reveal>
            <dl className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
              {HOURS.map((h) => (
                <div key={h.label} className="flex justify-between gap-6 py-4 text-lg">
                  <dt className="label self-center text-ink/60">{h.label}</dt>
                  <dd className={h.time === "Fechado" ? "text-ink/70" : "font-bold"}>{h.time}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.08}>
            <address className="mt-8 text-lg leading-relaxed not-italic">
              {ADDRESS.street}
              <br />
              {ADDRESS.district}, {ADDRESS.city} - {ADDRESS.region}
            </address>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line mt-7 inline-flex min-h-12 items-center gap-3 rounded-full px-6 font-bold text-ink"
            >
              Como chegar
              <ArrowIcon className="size-5" />
              <span className="sr-only">(abre o Google Maps em nova aba)</span>
            </a>
          </Reveal>
        </div>
        <MaskImage className="map-frame aspect-[4/5] sm:aspect-[16/11] lg:col-span-6 lg:col-start-7 lg:mt-16">
          <iframe
            title="Mapa: Borah Motos Elétricas, Estrada dos Três Rios 670, Freguesia"
            src={MAPS_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
            allowFullScreen
          />
        </MaskImage>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="grain relative overflow-hidden bg-ink">
      <Image src="/media/farol.webp" alt="" fill sizes="100vw" className="object-cover opacity-45" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(11_11_11/0.95)_0%,rgb(11_11_11/0.6)_60%,rgb(11_11_11/0.3)_100%)]" />
      <div className="relative mx-auto max-w-[90rem] px-5 py-32 sm:px-10 lg:py-44">
        <SplitTitle id="cta-title" text="E aí, Borah de *elétrica?*" className="max-w-[14ch] text-[clamp(3rem,10vw,8.5rem)] text-paper" />
        <Reveal className="mt-10 flex flex-wrap items-center gap-5">
          <ChargeButton>Agendar test ride</ChargeButton>
          <span className="label text-mist">Mobilidade urbana inteligente</span>
        </Reveal>
      </div>
    </section>
  );
}
