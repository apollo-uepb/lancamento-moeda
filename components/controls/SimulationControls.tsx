import { LIMIT, QUICK_BATCHES } from "@/lib/constants";
import { formatInt } from "@/lib/formatting";

interface SimulationControlsProps {
  value: string;
  error: string | null;
  requested: number | null;
  remaining: number;
  disabled: boolean;
  onChange: (value: string) => void;
  onEnter: () => void;
}

export default function SimulationControls({
  value,
  error,
  requested,
  remaining,
  disabled,
  onChange,
  onEnter,
}: SimulationControlsProps) {
  const exceeds =
    requested !== null && requested > remaining && remaining > 0 && !error;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="batch-size" className="font-bold">
        Quantos lançamentos simular?
      </label>
      <input
        id="batch-size"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") onEnter();
        }}
        aria-invalid={error !== null}
        aria-describedby="batch-help"
        className="min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:bg-slate-100 disabled:text-slate-500"
      />

      <div className="flex flex-wrap gap-2" aria-label="Atalhos de quantidade">
        {QUICK_BATCHES.map((quantity) => (
          <button
            key={quantity}
            type="button"
            disabled={disabled}
            onClick={() => onChange(String(quantity))}
            className="min-h-9 rounded-full border border-slate-300 bg-white px-3 text-sm font-semibold hover:border-brand hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50"
          >
            {formatInt(quantity)}
          </button>
        ))}
      </div>

      <p id="batch-help" className="text-sm text-slate-600">
        Restam <b>{formatInt(remaining)}</b> de {formatInt(LIMIT)} lançamentos.
        {exceeds && (
          <>
            {" "}
            Só serão simulados <b>{formatInt(remaining)}</b>.
          </>
        )}
      </p>
      {error && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}