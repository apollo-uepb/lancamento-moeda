"use client";

import { useEffect, useMemo, useState } from "react";
import { binomialWindow } from "@/lib/binomial";
import { DEFAULT_BATCH, LIMIT, SPIN_MS } from "@/lib/constants";
import { formatConfiguredPercent, formatInt } from "@/lib/formatting";
import { appendResults, randomOutcome, simulateBatch } from "@/lib/simulation";
import { convergenceSeries, countHeads } from "@/lib/statistics";
import type { CoinFace, Notice } from "@/types/simulation";

const EMPTY_RESULTS = new Uint8Array(0);

export function useSimulation() {
  const [results, setResults] = useState<Uint8Array>(EMPTY_RESULTS);
  const [appliedPercent, setAppliedPercent] = useState(50);
  const [pendingPercent, setPendingPercentState] = useState(50);
  const [spinId, setSpinId] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [logScale, setLogScale] = useState(false);
  const [batchInput, setBatchInputState] = useState(String(DEFAULT_BATCH));
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

  const total = results.length;
  const heads = useMemo(() => countHeads(results), [results]);
  const tails = total - heads;
  const probability = appliedPercent / 100;
  const remaining = Math.max(0, LIMIT - total);
  const limitReached = remaining <= 0;
  const hasPendingChange = pendingPercent !== appliedPercent;

  const lastFace: CoinFace | null =
    total > 0 ? (results[total - 1] as CoinFace) : null;
  const previousFace: CoinFace | null =
    total > 1 ? (results[total - 2] as CoinFace) : null;

  const convergence = useMemo(() => convergenceSeries(results), [results]);
  const binomial = useMemo(
    () => (total > 0 ? binomialWindow(total, probability, heads) : []),
    [total, probability, heads],
  );

  const batchValue = /^\d+$/.test(batchInput) ? Number(batchInput) : null;
  let batchError: string | null = null;
  if (batchValue === null || batchValue <= 0) {
    batchError = "Informe um número inteiro maior que zero.";
  }

  // Libera o botão LANÇAR quando a animação termina.
  useEffect(() => {
    if (!isSpinning) return;
    const timer = setTimeout(() => setIsSpinning(false), SPIN_MS);
    return () => clearTimeout(timer);
  }, [isSpinning, spinId]);

  function launch() {
    if (isSpinning || limitReached) return;
    const face = randomOutcome(probability);
    setResults((prev) => appendResults(prev, Uint8Array.of(face)));
    setSpinId((id) => id + 1);
    setAnimate(true);
    setIsSpinning(true);
    setNotice(null);
  }

  function simulate() {
    if (isSpinning || limitReached) return;
    if (batchValue === null || batchValue <= 0) return;
    const quantity = Math.min(batchValue, remaining);
    if (quantity <= 0) return;
    const batch = simulateBatch(quantity, probability);
    setResults((prev) => appendResults(prev, batch));
    setAnimate(false);
    if (quantity < batchValue) {
      setNotice({
        kind: "warning",
        text: `Para não passar do limite de ${formatInt(LIMIT)} lançamentos, foram simulados só ${formatInt(quantity)}.`,
      });
    } else {
      setNotice({
        kind: "info",
        text: `Foram simulados ${formatInt(quantity)} ${quantity === 1 ? "lançamento" : "lançamentos"}.`,
      });
    }
  }

  function reset() {
    setResults(EMPTY_RESULTS);
    setAnimate(false);
    setIsSpinning(false);
    setNotice(null);
  }

  function setPendingPercent(value: number) {
    const safe = Math.min(100, Math.max(0, Math.round(value)));
    setPendingPercentState(safe);
  }

  function setBatchInput(value: string) {
    setBatchInputState(value.replace(/\D/g, "").slice(0, 9));
  }

  function applyPending() {
    setResults(EMPTY_RESULTS);
    setAppliedPercent(pendingPercent);
    setAnimate(false);
    setIsSpinning(false);
    setConfirmOpen(false);
    setNotice(
      total > 0
        ? {
            kind: "info",
            text: `Nova probabilidade aplicada: ${formatConfiguredPercent(pendingPercent / 100)} de cara. A simulação foi reiniciada.`,
          }
        : null,
    );
  }

  /** Pede para aplicar a nova probabilidade; confirma antes se houver resultados. */
  function requestApply() {
    if (!hasPendingChange) return;
    if (total === 0) {
      applyPending();
      return;
    }
    setConfirmOpen(true);
  }

  /** Cancela: mantém a probabilidade aplicada e os resultados. */
  function cancelApply() {
    setConfirmOpen(false);
    setPendingPercentState(appliedPercent);
  }

  function toggleLogScale() {
    setLogScale((value) => !value);
  }

  return {
    // dados
    results,
    total,
    heads,
    tails,
    lastFace,
    previousFace,
    convergence,
    binomial,
    // probabilidade
    probability,
    appliedPercent,
    pendingPercent,
    hasPendingChange,
    confirmOpen,
    // animação
    spinId,
    animate,
    isSpinning,
    // lote
    batchInput,
    batchValue,
    batchError,
    remaining,
    limitReached,
    // interface
    logScale,
    notice,
    // ações
    launch,
    simulate,
    reset,
    setPendingPercent,
    setBatchInput,
    requestApply,
    applyPending,
    cancelApply,
    toggleLogScale,
  };
}

export type Simulation = ReturnType<typeof useSimulation>;