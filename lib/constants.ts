export const COLORS = {
  blue: "#1E88E5",
  blueDark: "#1565C0",
  coin: "#FFD54F",
  coinEdge: "#F9A825",
  coinText: "#7A4F00",
  grayBar: "rgba(128, 128, 128, 0.45)",
  grayGrid: "rgba(128, 128, 128, 0.18)",
  grayRef: "rgba(90, 90, 90, 0.95)",
  axisText: "#475569",
} as const;

export const LIMIT = 100_000; // máximo de lançamentos acumulados
export const FULL_POINTS = 100; // até aqui, todos os pontos (com bolinhas)
export const MAX_POINTS = 400; // depois, ~400 pontos no gráfico
export const WINDOW_SD = 4; // janela da binomial: média ± 4 desvios padrão
export const DEFAULT_BATCH = 100;
export const QUICK_BATCHES = [10, 100, 1_000, 10_000] as const;

export const COIN_DIAMETER = 120; // px
export const SPIN_SECONDS = 0.55;
export const SPIN_MS = 550;
export const JUMP_HEIGHT = 50; // px
export const TURNS = 3;

export const TEAM = "Apollo Borges, Felipe Ferreira e Leonardo Alexandre";