/** Line drawing of a generic electric moped, side view, 800×460. Used as the
 * model illustration until real photos arrive. */
export const BIKE = [
  // wheels, hubs, brake disc
  "M80 340a90 90 0 1 0 180 0a90 90 0 1 0-180 0",
  "M136 340a34 34 0 1 0 68 0a34 34 0 1 0-68 0",
  "M530 340a90 90 0 1 0 180 0a90 90 0 1 0-180 0",
  "M586 340a34 34 0 1 0 68 0a34 34 0 1 0-68 0",
  // rear fender + tail
  "M70 300Q96 226 214 220L250 218",
  // seat
  "M214 214L366 200Q392 198 392 214L386 230L222 244Z",
  // body to floorboard, battery box, front shield up to the steering column
  "M222 246Q258 268 300 266L470 266Q500 266 512 236L548 140",
  "M300 266h170v42a8 8 0 0 1-8 8H308a8 8 0 0 1-8-8z",
  // swingarm
  "M170 340L300 304",
  // fork and front fender
  "M548 140L620 340",
  "M560 264Q620 236 676 272",
  // handlebar, dash, headlight
  "M520 96L588 86L612 98",
  "M546 108h44l-6 20h-34z",
  "M606 126a14 14 0 1 0 28 0a14 14 0 1 0-28 0",
];
