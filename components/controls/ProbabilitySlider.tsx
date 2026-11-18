interface ProbabilitySliderProps {
  percent: number;
  appliedPercent: number;
  hasPendingChange: boolean;
  onChange: (value: number) => void;
  onApply: () => void;
  onRevert: () => void;
}

function describe(percent: number): string {
  if (percent === 50) return "Moeda justa";
  if (percent === 100) return "Moeda enviesada: sempre cara";
  if (percent === 0) return "Moeda enviesada: sempre coroa";
  return "Moeda enviesada";
}

export default function ProbabilitySlider({
  percent,
  appliedPercent,
  hasPendingChange,
  onChange,
  onApply,
  onRevert,
}: ProbabilitySliderProps) {
  const fair = percent === 50;
  const appliedFair = appliedPercent === 50;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor="p-heads" className="font-bold">
          Chance de cara
        </label>
        <span
          className={`rounded-full px-3 py-1 text-sm font-bold ${
            fair
              ? "bg-emerald-100 text-emerald-900"
              : "bg-amber-100 text-amber-900"
          }`}
        >
          {describe(percent)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="rounded-xl border border-slate-200 bg-slate-50 py-2">
          <span className="block text-sm text-slate-600">Cara</span>
          <span className="text-2xl font-extrabold text-brand">{percent}%</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 py-2">
          <span className="block text-sm text-slate-600">Coroa</span>
          <span className="text-2xl font-extrabold text-brand">
            {100 - percent}%
          </span>
        </div>
      </div>

      <input
        id="p-heads"
        type="range"
        min={0}
        max={100}
        step={1}
        value={percent}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuetext={`${percent}% de cara e ${100 - percent}% de coroa`}
        className="h-2 w-full cursor-pointer accent-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      />

      <p className="text-sm text-slate-600">
        Em uso na simulação:{" "}
        <b>
          {appliedPercent}% cara · {100 - appliedPercent}% coroa
        </b>{" "}
        ({appliedFair ? "moeda justa" : "moeda enviesada"}).
      </p>

      {hasPendingChange && (
        <div
          role="status"
          className="flex flex-col gap-2 rounded-xl border border-brand/40 bg-sky-50 p-3"
        >
          <p className="text-sm">
            Nova chance de cara: <b>{percent}%</b>. Ela só vale depois de
            aplicada, para não misturar lançamentos de moedas diferentes.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onApply}
              className="min-h-11 rounded-lg bg-brand px-4 text-sm font-bold text-white hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Aplicar nova probabilidade
            </button>
            <button
              type="button"
              onClick={onRevert}
              className="min-h-11 rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold hover:border-brand hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Desfazer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}