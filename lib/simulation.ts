import { LIMIT } from "@/lib/constants";
import type { CoinFace } from "@/types/simulation";

/** Um lançamento: 1 = cara (com probabilidade p), 0 = coroa. */
export function randomOutcome(p: number): CoinFace {
  return Math.random() < p ? 1 : 0;
}

/** Vários lançamentos de uma vez. */
export function simulateBatch(quantity: number, p: number): Uint8Array {
  const out = new Uint8Array(quantity);
  for (let i = 0; i < quantity; i += 1) {
    out[i] = Math.random() < p ? 1 : 0;
  }
  return out;
}

/** Junta resultados sem nunca ultrapassar o limite acumulado. */
export function appendResults(
  current: Uint8Array,
  additional: Uint8Array,
): Uint8Array {
  const room = Math.max(0, LIMIT - current.length);
  const take = Math.min(room, additional.length);
  if (take === 0) return current;
  const next = new Uint8Array(current.length + take);
  next.set(current);
  next.set(additional.subarray(0, take), current.length);
  return next;
}