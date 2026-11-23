import type { CSSProperties } from "react";

/*
 * Adapted from "Vertical Cut Reveal" by danielpetho (Fancy Components, via
 * 21st.dev). Same structure: text split into words, words into graphemes,
 * each piece in an overflow-hidden mask with an inner span that rises from
 * below. Changes for this site: rendered on the server as real text, and the
 * motion is a CSS keyframe ("corte seco", a short sharp ease) driven by
 * per-character delays, so it runs from first paint without waiting for
 * hydration. Words wrapped in *asterisks* light up last, like an LED switching on.
 */

type StaggerFrom = "first" | "last" | "center";

function graphemes(word: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const seg = new Intl.Segmenter("pt-BR", { granularity: "grapheme" });
    return Array.from(seg.segment(word), (s) => s.segment);
  }
  return Array.from(word);
}

export function CutText({
  text,
  start = 0.55,
  wordStagger = 0.07,
  charStagger = 0.01,
  staggerFrom = "first",
}: {
  text: string;
  /** seconds (at desktop timing) before the first word starts */
  start?: number;
  wordStagger?: number;
  charStagger?: number;
  staggerFrom?: StaggerFrom;
}) {
  const words = text.split(" ");
  const total = words.length;
  const order = (i: number) =>
    staggerFrom === "first" ? i : staggerFrom === "last" ? total - 1 - i : Math.abs(Math.floor(total / 2) - i);

  return (
    <>
      {words.map((raw, w) => {
        const gold = raw.startsWith("*");
        const word = raw.replace(/\*/g, "");
        const chars = graphemes(word);
        const wordAt = start + order(w) * wordStagger;
        const lastAt = wordAt + (chars.length - 1) * charStagger;
        return (
          <span key={w} className="cut-word">
            <span className="relative inline-block">
              {chars.map((ch, i) => (
                <span
                  key={i}
                  className="cut-char"
                  style={{ "--at": wordAt + i * charStagger } as CSSProperties}
                >
                  {ch}
                </span>
              ))}
              {gold ? (
                <span aria-hidden="true" className="kw-led" style={{ "--at": lastAt + 0.35 } as CSSProperties}>
                  {word}
                </span>
              ) : null}
            </span>
          </span>
        );
      })}
    </>
  );
}
