/**
 * Constants for the "Quanto você economiza" calculator. Editable estimates,
 * not product prices: update them when fuel or energy prices change.
 */
export const ECONOMIA = {
  /** R$ per liter of gasoline (estimate) */
  gasolinaPorLitro: 6.3,
  /** km per liter of a typical 125–160cc motorcycle (estimate) */
  kmPorLitro: 35,
  /** kWh per km of a typical urban electric motorcycle (estimate) */
  kwhPorKm: 0.035,
  /** R$ per kWh, residential tariff with taxes (estimate) */
  tarifaKwh: 1.0,
  /** days ridden per month */
  diasPorMes: 26,
  /** slider range, km per day */
  kmMin: 5,
  kmMax: 120,
  kmInicial: 30,
} as const;

/** Monthly saving in R$ for a given daily distance. */
export function economiaMensal(kmPorDia: number) {
  const km = kmPorDia * ECONOMIA.diasPorMes;
  const gasolina = (km / ECONOMIA.kmPorLitro) * ECONOMIA.gasolinaPorLitro;
  const energia = km * ECONOMIA.kwhPorKm * ECONOMIA.tarifaKwh;
  return Math.max(0, gasolina - energia);
}
