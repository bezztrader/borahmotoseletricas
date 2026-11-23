import type { SVGProps } from "react";

/*
 * Borah symbol, redrawn from the store's logo (without the seasonal Santa
 * hat): a battery/chip capsule in Borah yellow with a lightning chip in the
 * middle and bars running out of both sides, inside a gold ring on black.
 * Geometry measured off the reference and normalised to a 200×200 box.
 */
export const BORAH_YELLOW = "#FFCC00";
export const BORAH_AMBER = "#E6A800";

export function BorahSymbol({
  ring = true,
  title,
  ...props
}: SVGProps<SVGSVGElement> & { ring?: boolean; title?: string }) {
  return (
    <svg viewBox={ring ? "-100 -100 200 200" : "-62 -50 124 100"} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} {...props}>
      {title ? <title>{title}</title> : null}
      {ring ? (
        <>
          <circle r="96" fill="#0B0B0B" />
          <circle r="91" fill="none" stroke={BORAH_AMBER} strokeWidth="6" />
        </>
      ) : null}
      {/* capsule */}
      <path fill={BORAH_YELLOW} d="M-25-48h50a34 34 0 0 1 34 34v28a34 34 0 0 1-34 34h-50a34 34 0 0 1-34-34v-28a34 34 0 0 1 34-34z" />
      {/* three black cuts make the side bars; they run out through the capsule edge */}
      <rect x="-64" y="-28" width="128" height="14" fill="#0B0B0B" />
      <rect x="-64" y="-4.5" width="128" height="9" fill="#0B0B0B" />
      <rect x="-64" y="14" width="128" height="14" fill="#0B0B0B" />
      {/* socket and chip with the bolt */}
      <rect x="-33" y="-28" width="66" height="56" rx="6" fill="#0B0B0B" />
      <rect x="-22" y="-22" width="44" height="44" rx="4" fill={BORAH_YELLOW} />
      <path d="M4.5-14-10 4h8.5L-5.5 15 12-4H3.5z" fill="#0B0B0B" />
    </svg>
  );
}

/**
 * Logotype: "B" + the symbol standing in for the "o" + "rah", with
 * "MOTOS ELÉTRICAS" tracked underneath, as on the store's sign.
 */
export function Wordmark({ className = "", tagline = true }: { className?: string; tagline?: boolean }) {
  return (
    <span className={`wordmark inline-flex flex-col items-start leading-none ${className}`} aria-label="Borah Motos Elétricas" role="img">
      <span aria-hidden="true" className="inline-flex items-center text-volt">
        <span>B</span>
        <BorahSymbol ring={false} className="mx-[0.02em] h-[0.78em] w-[0.78em] translate-y-[0.04em]" />
        <span>rah</span>
      </span>
      {tagline ? (
        <span aria-hidden="true" className="mt-[0.18em] pl-[0.06em] text-[0.2em] font-semibold tracking-[0.42em] text-current">
          MOTOS ELÉTRICAS
        </span>
      ) : null}
    </span>
  );
}
