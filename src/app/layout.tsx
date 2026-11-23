import type { Metadata, Viewport } from "next";
import { Lexend, Manrope, Unbounded } from "next/font/google";
import { MotionProvider } from "@/components/motion";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import "./hero.css";

const unbounded = Unbounded({ variable: "--font-unbounded", subsets: ["latin"], display: "swap" });
const lexend = Lexend({ variable: "--font-lexend", subsets: ["latin"], weight: ["600"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

const title = "Borah Motos Elétricas Freguesia · Moto elétrica em Jacarepaguá";
const description =
  "Moto, scooter e bike elétrica em Jacarepaguá: venda, test ride, manutenção e assistência técnica na Freguesia. E aí, Borah de elétrica? Agende pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Borah Motos Elétricas",
    title,
    description,
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Borah Motos Elétricas, Freguesia" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#0b0b0b", colorScheme: "dark" };

// First visit of the session: flag the "carga completa" intro before first paint.
const CHARGE_SCRIPT = `try{var d=document.documentElement,m=window.matchMedia;if(!sessionStorage.getItem("borah-charge")&&!m("(prefers-reduced-motion: reduce)").matches){d.dataset.charge="1";sessionStorage.setItem("borah-charge","1");setTimeout(function(){d.dataset.charge="done"},m("(max-width: 767px)").matches?1700:2200)}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${unbounded.variable} ${lexend.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="min-h-svh">
        <script dangerouslySetInnerHTML={{ __html: CHARGE_SCRIPT }} />
        <SmoothScroll />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
