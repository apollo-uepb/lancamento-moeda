import { WINDOW_SD } from "@/lib/constants";
import type { BinomialPoint } from "@/types/simulation";

const HALF_LN_2PI = 0.5 * Math.log(2 * Math.PI);

/** ln Γ(x) para x > 0 (recorrência até x >= 10 + série de Stirling). */
export function logGamma(x: number): number {
  if (!(x > 0)) return Number.POSITIVE_INFINITY;
  let shift = 0;
  let z = x;
  while (z < 10) {
    shift += Math.log(z);
    z += 1;
  }
  const z2 = z * z;
  const series =
    1 / (12 * z) -
    1 / (360 * z * z2) +
    1 / (1260 * z2 * z2 * z) -
    1 / (1680 * z2 * z2 * z2 * z);
  return (z - 0.5) * Math.log(z) - z + HALF_LN_2PI + series - shift;
}

/** ln P(X = k), para 0 < p < 1 e 0 <= k <= n. */
function logProbBinomial(n: number, k: number, p: number): number {
  return (
    logGamma(n + 1) -
    logGamma(k + 1) -
    logGamma(n - k + 1) +
    k * Math.log(p) +
    (n - k) * Math.log(1 - p)
  );
}

/** P(X = k) para X ~ Binomial(n, p), calculada em log (sem estouro). */
export function probBinomial(n: number, k: number, p: number): number {
  if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0 || k > n) {
    return 0;
  }
  if (p <= 0) return k === 0 ? 1 : 0;
  if (p >= 1) return k === n ? 1 : 0;
  const value = Math.exp(logProbBinomial(n, k, p));
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function binomialMean(n: number, p: number): number {
  return n * p;
}

export function binomialVariance(n: number, p: number): number {
  return n * p * (1 - p);
}

export function binomialStdDev(n: number, p: number): number {
  return Math.sqrt(Math.max(0, binomialVariance(n, p)));
}

/** Moda(s) da binomial. Dois modos quando (n+1)p é inteiro. */
export function binomialModes(n: number, p: number): number[] {
  if (n <= 0 || p <= 0) return [0];
  if (p >= 1) return [n];
  const m = (n + 1) * p;
  const rounded = Math.round(m);
  if (Math.abs(m - rounded) < 1e-9) {
    return [Math.max(0, rounded - 1), Math.min(n, rounded)];
  }
  return [Math.min(n, Math.floor(m))];
}

/**
 * Valores de k a plotar: média ± 4 desvios padrão, limitados a [0, n],
 * sempre incluindo o k observado.
 */
export function binomialWindow(
  n: number,
  p: number,
  observedK: number,
): BinomialPoint[] {
  if (n <= 0) return [];
  const mean = binomialMean(n, p);
  const sd = binomialStdDev(n, p);
  const observed = Math.min(n, Math.max(0, Math.round(observedK)));
  const kMin = Math.min(
    observed,
    Math.max(0, Math.floor(mean - WINDOW_SD * sd)),
  );
  const kMax = Math.max(
    observed,
    Math.min(n, Math.ceil(mean + WINDOW_SD * sd)),
  );
  const points: BinomialPoint[] = [];
  for (let k = kMin; k <= kMax; k += 1) {
    points.push({ k, percent: probBinomial(n, k, p) * 100 });
  }
  return points;
}