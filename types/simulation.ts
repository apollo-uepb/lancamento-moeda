/** 1 = cara, 0 = coroa (igual ao código original). */
export type CoinFace = 0 | 1;

export interface Notice {
  kind: "info" | "warning";
  text: string;
}

export interface ConvergencePoint {
  /** Número do lançamento (base 1). */
  n: number;
  /** Frequência relativa de caras após o lançamento n. */
  frequency: number;
}

export interface BinomialPoint {
  /** Número de caras. */
  k: number;
  /** P(X = k) em percentual (0 a 100). */
  percent: number;
}