"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Wordmark } from "./brand";
import { InstagramIcon } from "./icons";
import { EASE } from "./motion";
import { INSTAGRAM_URL } from "@/lib/site";

const NAV = [
  { href: "#por-que", label: "Por que elétrica" },
  { href: "#modelos", label: "Modelos" },
  { href: "#test-ride", label: "Test ride" },
  { href: "#servicos", label: "Serviços" },
  { href: "#onde", label: "Onde fica" },
];

/** Transparent at the top; on scroll it compacts and gains a blurred black bar. */
export function Header() {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setCompact(v > 40));
  const t = { duration: 0.4, ease: EASE };

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-20 origin-top border-b border-paper/10 bg-ink/70 backdrop-blur-md"
        initial={false}
        animate={{ opacity: compact ? 1 : 0, scaleY: compact ? 0.8 : 1 }}
        transition={t}
      />
      <motion.div
        className="relative mx-auto flex h-20 max-w-[90rem] items-center justify-between gap-6 px-5 sm:px-10"
        initial={false}
        animate={{ y: compact ? -8 : 0 }}
        transition={t}
      >
        <a href="#topo" className="flex min-h-12 items-center">
          <motion.span className="block origin-left" initial={false} animate={{ scale: compact ? 0.86 : 1 }} transition={t}>
            <Wordmark className="text-[1.9rem] text-paper" />
          </motion.span>
        </a>
        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex gap-1 text-sm font-semibold">
            {NAV.map((n) => (
              <li key={n.href}>
                <a className="inline-flex min-h-12 items-center px-3 text-paper/80 transition-colors hover:text-volt" href={n.href}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-line inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm font-bold text-paper"
        >
          <InstagramIcon className="size-5" />
          <span className="hidden sm:inline">@boraheletricajpa</span>
          <span className="sr-only sm:hidden">Instagram</span>
          <span className="sr-only">(abre em nova aba)</span>
        </a>
      </motion.div>
    </header>
  );
}
