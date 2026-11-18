
"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { probBinomial } from "@/lib/binomial";
import { COLORS } from "@/lib/constants";
import {
  formatConfiguredPercent,
  formatDecimal,
  formatInt,
  formatProbability,
  plural,
} from "@/lib/formatting";
import type { BinomialPoint } from "@/types/simulation";

interface BinomialChartProps {
  points: BinomialPoint[];
  total: number;
  heads: number;
  probability: number;
}

function yDecimals(maxPercent: number): number {
  if (maxPercent >= 10) return 0;
  if (maxPercent >= 1) return 1;
  if (maxPercent >= 0.1) return 2;
  return 3;
}

export default function BinomialChart({
  points,
  total,
  heads,
  probability,
}: BinomialChartProps) {
  const empty = total === 0 || points.length === 0;
  const maxPercent = empty ? 0 : Math.max(...points.map((point) => point.percent));
  const decimals = yDecimals(maxPercent);

  return (
    <section
      aria-labelledby="binomial-title"
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <h2 id="binomial-title" className="text-lg font-bold">
        Chance de cada quantidade de caras
      </h2>
      <p className="text-sm text-slate-600">
        O gráfico mostra a chance de obter cada quantidade de caras nos{" "}
        {empty ? "n" : formatInt(total)} lançamentos. A barra azul indica
        quantas caras você obteve.
      </p>

      {!empty && (
        <p className="mt-2 text-sm">
          Em <b>{formatInt(total)}</b>{" "}
          {plural(total, "lançamento", "lançamentos")}, com{" "}
          <b>{formatConfiguredPercent(probability)}</b> de chance de cara,
          a chance de obter exatamente <b>{formatInt(heads)}</b>{" "}
          {plural(heads, "cara", "caras")} é{" "}
          <b className="text-brand-dark">
            {formatProbability(probBinomial(total, heads, probability))}
          </b>
          .
        </p>
      )}

      {empty ? (
        <div className="mt-3 flex h-[260px] items-center justify-center rounded-xl border border-dashed border-slate-300 px-6 text-center font-semibold text-slate-500 sm:h-[300px]">
          Lance a moeda para ver as chances de cada resultado.
        </div>
      ) : (
        <div className="mt-3 h-[260px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={points}
              barCategoryGap={points.length > 60 ? 0 : "10%"}
              margin={{ top: 12, right: 16, bottom: 24, left: 4 }}
            >
              <CartesianGrid vertical={false} stroke={COLORS.grayGrid} />
              <XAxis
                dataKey="k"
                interval="preserveStartEnd"
                minTickGap={8}
                tickFormatter={(value: number) => formatInt(value)}
                tick={{ fontSize: 12, fill: COLORS.axisText }}
                label={{
                  value: "Número de caras",
                  position: "insideBottom",
                  offset: -14,
                  fontSize: 12,
                  fill: COLORS.axisText,
                }}
              />
              <YAxis
                width={52}
                domain={[0, (dataMax: number) => Math.min(100, dataMax * 1.1)]}
                tickFormatter={(value: number) =>
                  `${formatDecimal(value, decimals)}%`
                }
                tick={{ fontSize: 12, fill: COLORS.axisText }}
                label={{
                  value: "Probabilidade",
                  angle: -90,
                  position: "insideLeft",
                  offset: 4,
                  fontSize: 12,
                  fill: COLORS.axisText,
                  style: { textAnchor: "middle" },
                }}
              />
              <Tooltip
                cursor={{ fill: "rgba(30, 136, 229, 0.08)" }}
                contentStyle={{ borderRadius: 8, fontSize: 13 }}
                labelFormatter={(label) => {
                  const k = Number(label);
                  return `${formatInt(k)} ${plural(k, "cara", "caras")}`;
                }}
                formatter={(value) =>
                  [formatProbability(Number(value) / 100), "Chance"] as [
                    string,
                    string,
                  ]
                }
              />
              <Bar dataKey="percent" isAnimationActive={false}>
                {points.map((point) => (
                  <Cell
                    key={point.k}
                    fill={point.k === heads ? COLORS.blue : COLORS.grayBar}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
