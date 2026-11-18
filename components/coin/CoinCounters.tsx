import { LIMIT } from "@/lib/constants";
import { decimalPlacesFor, formatDecimal, formatInt } from "@/lib/formatting";

interface CoinCountersProps {
  heads: number;
  tails: number;
  total: number;
}

interface BoxProps {
  label: string;
  value: string;
  footer: string;
}

function Box({ label, value, footer }: BoxProps) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white px-2 py-3 text-center">
      <span className="block text-sm text-slate-600">{label}</span>
      <span className="block text-2xl font-extrabold leading-tight text-brand sm:text-3xl">
        {value}
      </span>
      <span className="block text-sm text-slate-600">{footer}</span>
    </div>
  );
}

export default function CoinCounters({ heads, tails, total }: CoinCountersProps) {
  const digits = decimalPlacesFor(total);
  const freqHeads = total > 0 ? formatDecimal(heads / total, digits) : "—";
  const freqTails = total > 0 ? formatDecimal(tails / total, digits) : "—";

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      <Box label="Caras" value={formatInt(heads)} footer={`freq. ${freqHeads}`} />
      <Box label="Coroas" value={formatInt(tails)} footer={`freq. ${freqTails}`} />
      <Box
        label="Total"
        value={formatInt(total)}
        footer={`de ${formatInt(LIMIT)}`}
      />
    </div>
  );
}