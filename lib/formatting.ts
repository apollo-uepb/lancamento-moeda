/** 12345 -> "12.345" */
export function formatInt(x: number): string {
  if (!Number.isFinite(x)) return "—";
  const digits = Math.trunc(Math.abs(x)).toString();
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (x < 0 ? "-" : "") + grouped;
}

/** 0.4312 -> "0,43" */
export function formatDecimal(x: number, digits = 2): string {
  if (!Number.isFinite(x)) return "—";
  return x.toFixed(digits).replace(".", ",");
}

/** Mais lançamentos => mais casas decimais para enxergar a diferença. */
export function decimalPlacesFor(n: number): number {
  if (n < 1_000) return 2;
  if (n < 10_000) return 3;
  return 4;
}

/** Probabilidade (0 a 1) -> texto em %, sem notação científica. */
export function formatProbability(p: number): string {
  if (!Number.isFinite(p) || p <= 0) return "0%";
  const pct = p * 100;
  if (pct >= 99.95) return "100%";
  if (pct >= 1) return formatDecimal(pct, 1) + "%";
  if (pct >= 0.01) return formatDecimal(pct, 2) + "%";
  return "menos de 0,01%";
}

/** Probabilidade configurada (0 a 1) -> "70%". */
export function formatConfiguredPercent(p: number): string {
  return `${formatInt(Math.round(p * 100))}%`;
}

/** Frequência (0 a 1) em percentual, com casas conforme o total de lançamentos. */
export function formatFrequencyPercent(freq: number, n: number): string {
  return `${formatDecimal(freq * 100, decimalPlacesFor(n) - 1)}%`;
}

export function plural(qty: number, singular: string, pluralForm: string): string {
  return qty === 1 ? singular : pluralForm;
}