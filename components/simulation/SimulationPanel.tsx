"use client";

import { Info } from "lucide-react";
import Coin from "@/components/coin/Coin";
import SimulationActions, {
  LaunchButton,
} from "@/components/controls/SimulationActions";
import ProbabilitySlider from "@/components/controls/ProbabilitySlider";
import SimulationControls from "@/components/controls/SimulationControls";
import ProbabilityConfirmation from "@/components/simulation/ProbabilityConfirmation";
import { LIMIT } from "@/lib/constants";
import { formatInt } from "@/lib/formatting";
import type { Simulation } from "@/hooks/useSimulation";

export default function SimulationPanel({ sim }: { sim: Simulation }) {
  const blocked = sim.limitReached || sim.isSpinning;
  const simulateDisabled = blocked || sim.batchError !== null;

  return (
    <section
      aria-label="Moeda e controles"
      className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
    >
      <Coin
        face={sim.lastFace}
        previousFace={sim.previousFace}
        animate={sim.animate}
        spinId={sim.spinId}
      />

      <ProbabilitySlider
        percent={sim.pendingPercent}
        appliedPercent={sim.appliedPercent}
        hasPendingChange={sim.hasPendingChange}
        onChange={sim.setPendingPercent}
        onApply={sim.requestApply}
        onRevert={sim.cancelApply}
      />

      <div className="flex flex-col gap-4">
        <LaunchButton disabled={blocked} onLaunch={sim.launch} />
        <SimulationControls
          value={sim.batchInput}
          error={sim.batchError}
          requested={sim.batchValue}
          remaining={sim.remaining}
          disabled={sim.limitReached}
          onChange={sim.setBatchInput}
          onEnter={sim.simulate}
        />
        <SimulationActions
          simulateDisabled={simulateDisabled}
          resetDisabled={sim.total === 0}
          onSimulate={sim.simulate}
          onReset={sim.reset}
        />
      </div>

      {sim.limitReached && (
        <p
          role="status"
          className="flex gap-2 rounded-xl bg-amber-100 p-3 text-sm font-semibold text-amber-900"
        >
          <Info size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          Chegamos ao limite de {formatInt(LIMIT)} lançamentos. Clique em
          Resetar para recomeçar.
        </p>
      )}
      {!sim.limitReached && sim.notice && (
        <p
          role="status"
          className={`flex gap-2 rounded-xl p-3 text-sm font-semibold ${
            sim.notice.kind === "warning"
              ? "bg-amber-100 text-amber-900"
              : "bg-sky-100 text-sky-900"
          }`}
        >
          <Info size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          {sim.notice.text}
        </p>
      )}

      <ProbabilityConfirmation
        open={sim.confirmOpen}
        total={sim.total}
        appliedPercent={sim.appliedPercent}
        pendingPercent={sim.pendingPercent}
        onConfirm={sim.applyPending}
        onCancel={sim.cancelApply}
      />
    </section>
  );
}