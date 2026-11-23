"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/site";
import { BoltIcon, InstagramIcon, WhatsAppIcon } from "./icons";

/**
 * Main CTA: solid Borah yellow. On hover it "charges" left to right like a
 * battery bar and the bolt flashes (CSS: .btn-charge in globals.css).
 */
export function ChargeButton({
  href = WHATSAPP_URL,
  children = "Agendar test ride",
  size = "lg",
  className = "",
}: {
  href?: string;
  children?: ReactNode;
  size?: "lg" | "md";
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-charge inline-flex items-center gap-3 rounded-full font-bold ${
        size === "lg" ? "min-h-14 px-7 text-base sm:text-lg" : "min-h-12 px-5 text-sm sm:text-base"
      } ${className}`}
    >
      <span aria-hidden="true" className="charge-ticks" />
      <span aria-hidden="true" className="charge-fill" />
      <BoltIcon className="bolt size-5 shrink-0" />
      <span className="charge-label">{children}</span>
      <span className="sr-only">(abre o WhatsApp em nova aba)</span>
    </a>
  );
}

export function InstagramButton({ big = false, className = "" }: { big?: boolean; className?: string }) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-line inline-flex items-center gap-3 rounded-full font-bold ${
        big ? "min-h-16 px-8 text-lg sm:text-xl" : "min-h-12 px-5 text-sm sm:text-base"
      } ${className}`}
    >
      <InstagramIcon className={big ? "size-6" : "size-5"} />
      <span>{INSTAGRAM_HANDLE}</span>
      <span className="sr-only">no Instagram (abre em nova aba)</span>
    </a>
  );
}

const PULSE_EVERY = 6;

/** Floating WhatsApp; "Agendar test ride" label beside it from md up. */
export function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar test ride pelo WhatsApp (abre em nova aba)"
      initial="rest"
      whileHover="hover"
      className="fixed right-4 bottom-4 z-50 flex items-center gap-3 sm:right-6 sm:bottom-6"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <motion.span
        aria-hidden="true"
        className="fab-label hidden rounded-full px-4 py-2.5 text-sm font-bold md:block"
        variants={{ rest: { x: 0 }, hover: { x: -4 } }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        Agendar test ride
      </motion.span>
      <motion.span
        className="relative flex size-15"
        variants={{ rest: { y: 0 }, hover: { y: -3 } }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {reduce ? null : (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[var(--wa)]"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1.5], opacity: [0.45, 0] }}
            transition={{ duration: 1.4, ease: "easeOut", repeat: Infinity, repeatDelay: PULSE_EVERY - 1.4, delay: 2.4 }}
          />
        )}
        <span className="fab relative flex size-15 items-center justify-center rounded-full">
          <WhatsAppIcon className="size-8" />
        </span>
      </motion.span>
    </motion.a>
  );
}
