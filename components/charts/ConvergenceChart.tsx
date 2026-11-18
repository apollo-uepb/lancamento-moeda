"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS, FULL_POINTS } from "@/lib/constants";
import {
  decimalPlacesFor,
  formatConfiguredPercent,
  formatDecimal,
  formatInt,
} from "@/lib/formatting";
import { distanceToProbability } from "@/lib/statistics";
import type { ConvergencePoint } from "@/types/simulation";

interface ConvergenceChartProps {
  data: ConvergencePoint[];
  total: number;
  heads: number;
  probability: number;
  logScale: boolean;
  onToggleScale: () => void;
}

const Y_TICKS = [0, 0.25, 0.5, 0.75, 1];

function linearTicks(max: number): number[] {
  const raw = max / 5;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 5, 10].map((m) => m * pow).find((s) => s >= raw) ?? pow * 10;
  const ticks: number[] = [];
  for (let v = 0; v <= max; v += step) ticks.push(Math.round(v));
  return ticks;
}

function logTicks(max: number): number[] {
  const ticks: number[] = [];
  for (let v = 1; v <= max; v *= 10) ticks.push(v);
  return ticks;
}

export default function ConvergenceChart({
  data,
  total,
  heads,
  probability,
  logScale,
  onToggleScale,
}: ConvergenceChartProps) {
  const empty = total === 0;
  const xMax = Math.max(total, 10);
  const digits = decimalPlacesFor(total);
  const frequency = empty ? null : heads / total;
  const distance =
    frequency === null ? null : distanceToProbability(frequency, probability);

  return (
    <section
      aria-labelledby="convergence-title"
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="convergence-title" className="text-lg font-bold">
            Convergência da frequência relativa
          </h2>
          <p className="text-sm text-slate-600">
            A linha azul mostra a proporção de caras a cada lançamento. A
            tracejada é a probabilidade configurada.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={logScale}
          onClick={onToggleScale}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <span
            aria-hidden="true"
            className={`relative h-5 w-9 rounded-full transition-colors ${
              logScale ? "bg-brand" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                logScale ? "left-[18px]" : "left-0.5"
              }`}
            />
          </span>
          Escala log no eixo x
        </button>
      </div>

      <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-slate-50 p-2">
          <dt className="text-xs text-slate-600 sm:text-sm">Frequência atual</dt>
          <dd className="text-lg font-extrabold text-brand sm:text-xl">
            {frequency === null ? "—" : formatDecimal(frequency, digits)}
          </dd>
        </div>
        <div className="rounded-xl bg-slate-50 p-2">
          <dt className="text-xs text-slate-600 sm:text-sm">Probabilidade teórica</dt>
          <dd className="text-lg font-extrabold text-slate-700 sm:text-xl">
            {formatDecimal(probability, 2)}
          </dd>
        </div>
        <div className="rounded-xl bg-slate-50 p-2">
          <dt className="text-xs text-slate-600 sm:text-sm">Diferença</dt>
          <dd className="text-lg font-extrabold text-slate-700 sm:text-xl">
            {distance === null ? "—" : formatDecimal(distance, digits)}
          </dd>
        </div>
      </dl>

      <div className="relative mt-3 h-[260px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 12, right: 20, bottom: 24, left: 4 }}
          >
            <CartesianGrid stroke={COLORS.grayGrid} />
            <XAxis
              dataKey="n"
              type="number"
              scale={logScale ? "log" : "linear"}
              domain={logScale ? [1, xMax] : [0, xMax]}
              ticks={logScale ? logTicks(xMax) : linearTicks(xMax)}
              allowDataOverflow
              tickFormatter={(value: number) => formatInt(value)}
              tick={{ fontSize: 12, fill: COLORS.axisText }}
              label={{
                value: "Número de lançamentos",
                position: "insideBottom",
                offset: -14,
                fontSize: 12,
                fill: COLORS.axisText,
              }}
            />
            <YAxis
              type="number"
              domain={[0, 1]}
              ticks={Y_TICKS}
              width={52}
              tickFormatter={(value: number) => formatDecimal(value, 2)}
              tick={{ fontSize: 12, fill: COLORS.axisText }}
              label={{
                value: "Frequência de caras",
                angle: -90,
                position: "insideLeft",
                offset: 4,
                fontSize: 12,
                fill: COLORS.axisText,
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip
              contentStyle={{ borderRadius: 8, fontSize: 13 }}
              labelFormatter={(label) => `Lançamento ${formatInt(Number(label))}`}
              formatter={(value) =>
                [formatDecimal(Number(value), 3), "Frequência de caras"] as [
                  string,
                  string,
                ]
              }
            />
            <ReferenceLine
              y={probability}
              stroke={COLORS.grayRef}
              strokeWidth={1.5}
              strokeDasharray="6 4"
              label={{
                value: `Probabilidade: ${formatConfiguredPercent(probability)}`,
                position: probability >= 0.5 ? "insideBottomRight" : "insideTopRight",
                fontSize: 12,
                fill: COLORS.axisText,
              }}
            />
            <Line
              type="linear"
              dataKey="frequency"
              stroke={COLORS.blue}
              strokeWidth={2.5}
              dot={total <= FULL_POINTS ? { r: 3, fill: COLORS.blue } : false}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>

        {empty && (
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center px-8 pb-6 text-center font-semibold text-slate-500">
            Lance a moeda para começar o gráfico.
          </p>
        )}
      </div>
    </section>
  );
}