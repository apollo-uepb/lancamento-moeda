import { FULL_POINTS, MAX_POINTS } from "@/lib/constants";
import type { ConvergencePoint } from "@/types/simulation";

export function countHeads(results: Uint8Array): number {
  let sum = 0;
  for (let i = 0; i < results.length; i += 1) sum += results[i];
  return sum;
}

/** |frequência observada − probabilidade teórica| */
export function distanceToProbability(frequency: number, p: number): number {
  return Math.abs(frequency - p);
}

/**
 * Quais lançamentos vão para o gráfico (somente desenho).
 * n <= 100: todos. n > 100: ~400 pontos espaçados geometricamente,
 * sempre incluindo o último.
 */
export function sampleIndices(n: number): number[] {
  if (n <= 0) return [];
  if (n <= FULL_POINTS) return Array.from({ length: n }, (_, i) => i + 1);
  const logN = Math.log(n);
  const set = new Set<number>();
  for (let i = 0; i < MAX_POINTS; i += 1) {
    const value = Math.round(Math.exp((logN * i) / (MAX_POINTS - 1)));
    set.add(Math.min(n, Math.max(1, value)));
  }
  set.add(n);
  return Array.from(set).sort((a, b) => a - b);
}

/** Frequência relativa de caras nos lançamentos amostrados (passada única). */
export function convergenceSeries(results: Uint8Array): ConvergencePoint[] {
  const n = results.length;
  const indices = sampleIndices(n);
  const series: ConvergencePoint[] = [];
  let sum = 0;
  let pointer = 0;
  for (let i = 0; i < n && pointer < indices.length; i += 1) {
    sum += results[i];
    if (i + 1 === indices[pointer]) {
      series.push({ n: i + 1, frequency: sum / (i + 1) });
      pointer += 1;
    }
  }
  return series;
}