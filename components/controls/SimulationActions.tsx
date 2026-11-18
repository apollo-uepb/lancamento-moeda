import { Play, RotateCcw } from "lucide-react";

interface LaunchButtonProps {
  disabled: boolean;
  onLaunch: () => void;
}

export function LaunchButton({ disabled, onLaunch }: LaunchButtonProps) {
  return (
    <button
      type="button"
      onClick={onLaunch}
      disabled={disabled}
      className="min-h-14 w-full rounded-lg bg-brand text-lg font-bold tracking-widest text-white transition-colors hover:bg-brand-dark active:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-55"
    >
      LANÇAR
    </button>
  );
}

interface SimulationActionsProps {
  simulateDisabled: boolean;
  resetDisabled: boolean;
  onSimulate: () => void;
  onReset: () => void;
}

export default function SimulationActions({
  simulateDisabled,
  resetDisabled,
  onSimulate,
  onReset,
}: SimulationActionsProps) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white font-bold hover:border-brand hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onSimulate}
        disabled={simulateDisabled}
        className={base}
      >
        <Play size={18} aria-hidden="true" />
        Simular
      </button>
      <button
        type="button"
        onClick={onReset}
        disabled={resetDisabled}
        className={base}
      >
        <RotateCcw size={18} aria-hidden="true" />
        Resetar
      </button>
    </div>
  );
}