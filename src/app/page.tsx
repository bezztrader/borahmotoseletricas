import dynamic from "next/dynamic";
import { Wordmark } from "@/components/brand";
import { FloatingWhatsApp, InstagramButton } from "@/components/cta";
import { Header } from "@/components/header";
import { WhyElectric } from "@/components/headlight";
import { Hero } from "@/components/hero";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { CustomCursor, ReadingProgress, ScrollMarquee, ToneShift } from "@/components/motion";
import { About, FinalCTA, FollowUs, Location, Services } from "@/components/sections";
import { TestRide } from "@/components/test-ride";
import { ADDRESS, HOURS, INSTAGRAM_URL, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, SITE_URL, WHATSAPP_URL } from "@/lib/site";

// heavier interactive sections load as their own chunks
const Calculator = dynamic(() => import("@/components/calculator").then((m) => m.Calculator));
const ShowcaseX13 = dynamic(() => import("@/components/showcase-x13").then((m) => m.ShowcaseX13));
const Models = dynamic(() => import("@/components/models").then((m) => m.Models));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MotorcycleDealer",
  name: "Borah Motos Elétricas Freguesia",
  slogan: "E aí, Borah de elétrica?",
  description: "Venda e manutenção de motos, scooters e bikes elétricas em Jacarepaguá.",
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/brand/borah-simbolo-512.png`,
  telephone: PHONE_TEL,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    addressLocality: "Rio de Janeiro",
    addressRegion: "RJ",
    addressCountry: "BR",
  },
  areaServed: "Jacarepaguá, Rio de Janeiro",
  hasMap: MAPS_URL,
  sameAs: [INSTAGRAM_URL],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <a href="#conteudo" className="btn-charge sr-only z-[100] rounded-full px-5 py-3 font-bold focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Pular para o conteúdo
      </a>
      <ReadingProgress />
      <CustomCursor />
      <Header />

      <main id="conteudo">
        <Hero />
        <ScrollMarquee items={["Economia", "Praticidade", "Test ride", "Manutenção", "Borah de elétrica?"]} />
        <WhyElectric />

        <ToneShift id="economia" labelledBy="economia-title" className="text-ink">
          <div className="mx-auto max-w-[90rem] px-5 py-28 sm:px-10 lg:py-36">
            <div className="mb-14 flex items-start gap-5">
              <span className="label pt-3 text-volt-ink">02</span>
              <h2 id="economia-title" className="display text-[clamp(2.6rem,7.5vw,6rem)] text-ink">
                Quanto você <span className="text-volt-ink">economiza?</span>
              </h2>
            </div>
            <Calculator />
          </div>
        </ToneShift>

        <ShowcaseX13 />
        <Models />
        <TestRide />
        <Services />
        <FollowUs />
        <About />
        <Location />
        <FinalCTA />
      </main>

      <footer className="border-t border-rule bg-ink pb-28">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-5 pt-16 sm:px-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <Wordmark className="text-[2.6rem] text-paper" />
            <p className="label mt-5 text-mist">Mobilidade urbana inteligente</p>
          </div>
          <dl className="grid gap-8 text-base sm:grid-cols-2 md:col-span-9 lg:grid-cols-4">
            <div>
              <dt className="label text-mist">Instagram</dt>
              <dd className="mt-3">
                <InstagramButton className="text-paper" />
              </dd>
            </div>
            <div>
              <dt className="label text-mist">WhatsApp</dt>
              <dd className="mt-1 flex flex-col">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 font-semibold underline decoration-volt underline-offset-4">
                  <WhatsAppIcon className="size-5" /> {PHONE_DISPLAY}
                </a>
                <a href={`tel:${PHONE_TEL}`} className="inline-flex min-h-12 items-center gap-2 font-semibold underline decoration-volt underline-offset-4">
                  <PhoneIcon className="size-5" /> Ligar
                </a>
              </dd>
            </div>
            <div>
              <dt className="label text-mist">Endereço</dt>
              <dd className="mt-3 leading-relaxed">
                {ADDRESS.street}, {ADDRESS.district}, {ADDRESS.city} - {ADDRESS.region}
              </dd>
            </div>
            <div>
              <dt className="label text-mist">Horário</dt>
              <dd className="mt-3">
                <ul className="space-y-1">
                  {HOURS.map((h) => (
                    <li key={h.label}>
                      <span className="font-semibold">{h.label}:</span> {h.time}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
        <p className="label mx-auto mt-14 max-w-[90rem] px-5 text-mist sm:px-10">© 2026 Borah Motos Elétricas · Unidade Freguesia</p>
      </footer>

      <FloatingWhatsApp />
    </>
  );
}
