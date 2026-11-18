import CoinCounters from "@/components/coin/CoinCounters";
import {
  binomialMean,
  binomialModes,
  binomialStdDev,
  probBinomial,
} from "@/lib/binomial";
import {
  decimalPlacesFor,
  formatConfiguredPercent,
  formatDecimal,
  formatFrequencyPercent,
  formatInt,
  formatProbability,
  plural,
} from "@/lib/formatting";
import { distanceToProbability } from "@/lib/statistics";

interface SimulationInfoProps {
  total: number;
  heads: number;
  tails: number;
  probability: number;
}

interface IndicatorProps {
  title: string;
  value: string;
  description: string;
}

function Indicator({ title, value, description }: IndicatorProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-bold text-slate-700">{title}</h3>
      <p className="mt-1 text-2xl font-extrabold text-brand">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
    </div>
  );
}

function Concept({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-sky-50 p-4">
      <h3 className="font-bold text-brand-dark">{title}</h3>
      <p className="mt-1 text-sm text-slate-700">{children}</p>
    </div>
  );
}

export default function SimulationInfo({
  total,
  heads,
  tails,
  probability,
}: SimulationInfoProps) {
  const hasData = total > 0;
  const pHeads = probability;
  const pTails = 1 - probability;
  const pctHeads = formatConfiguredPercent(pHeads);
  const pctTails = formatConfiguredPercent(pTails);
  const fair = Math.round(probability * 100) === 50;

  const freqHeads = hasData ? heads / total : null;
  const freqTails = hasData ? tails / total : null;
  const digits = decimalPlacesFor(total);
  const distance =
    freqHeads === null ? null : distanceToProbability(freqHeads, pHeads);

  const mean = binomialMean(total, pHeads);
  const sd = binomialStdDev(total, pHeads);
  const exact = hasData ? probBinomial(total, heads, pHeads) : null;
  const modes = hasData ? binomialModes(total, pHeads) : [];
  const modeProbability =
    modes.length > 0 ? probBinomial(total, modes[0], pHeads) : null;

  let dynamicText: string;
  if (!hasData) {
    dynamicText = `Você configurou a moeda para ter ${pctHeads} de chance de cara. Lance a moeda para comparar o que aparece com essa probabilidade.`;
  } else if (pHeads >= 1 || pHeads <= 0) {
    dynamicText = `Você configurou uma moeda que sempre dá ${pHeads >= 1 ? "cara" : "coroa"} (${pctHeads} de chance de cara). Por isso, a frequência de caras em ${formatInt(total)} ${plural(total, "lançamento", "lançamentos")} é ${formatFrequencyPercent(heads / total, total)}.`;
  } else {
    dynamicText = `Você configurou a moeda para ter ${pctHeads} de chance de cara. Até agora, caras apareceram em ${formatFrequencyPercent(heads / total, total)} dos ${formatInt(total)} ${plural(total, "lançamento", "lançamentos")}. Com mais lançamentos, a frequência tende a se aproximar dos ${pctHeads} configurados.`;
  }

  return (
    <section
      aria-labelledby="info-title"
      className="mt-6 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-100/90 p-4 sm:p-6"
    >
      <h2 id="info-title" className="text-xl font-bold">
        Entendendo os números
      </h2>

      <CoinCounters heads={heads} tails={tails} total={total} />

      <p
        aria-live="polite"
        className="rounded-xl bg-white p-4 text-base leading-relaxed"
      >
        {dynamicText}{" "}
        {fair
          ? "Essa é uma moeda justa: cara e coroa têm a mesma chance."
          : "Essa é uma moeda enviesada: cara e coroa não têm a mesma chance."}
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Indicator
          title="Probabilidade configurada"
          value={`${pctHeads} e ${pctTails}`}
          description="Chance de cara e de coroa que definimos para a moeda."
        />
        <Indicator
          title="Frequência observada"
          value={
            freqHeads === null || freqTails === null
              ? "—"
              : `${formatFrequencyPercent(freqHeads, total)} e ${formatFrequencyPercent(freqTails, total)}`
          }
          description={
            hasData
              ? "Proporção de caras e de coroas que realmente apareceu."
              : "Aparece depois do primeiro lançamento."
          }
        />
        <Indicator
          title="Diferença para a probabilidade"
          value={distance === null ? "—" : formatDecimal(distance, digits)}
          description="Distância entre a frequência de caras e a probabilidade teórica. Tende a diminuir com mais lançamentos."
        />
        <Indicator
          title="Caras esperadas (média)"
          value={
            hasData ? formatDecimal(mean, Number.isInteger(mean) ? 0 : 2) : "—"
          }
          description="Quantas caras esperamos obter (em média) nesses lançamentos."
        />
        <Indicator
          title="Desvio padrão"
          value={hasData ? formatDecimal(sd, 2) : "—"}
          description="O quanto a quantidade de caras pode varia em relação à média."
        />
        <Indicator
          title="Chance de exatamente esse resultado"
          value={exact === null ? "—" : formatProbability(exact)}
          description={
            hasData
              ? `Probabilidade de obter exatamente ${formatInt(heads)} ${plural(heads, "cara", "caras")} em ${formatInt(total)} lançamentos.`
              : "Aparece depois do primeiro lançamento."
          }
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Concept title="Experimento aleatório">
          É uma experiência cujo resultado não podemos prever com certeza,
          mesmo conhecendo todas as possibilidades. O lançamento de uma moeda
          é um exemplo, pois pode resultar em cara ou coroa.
        </Concept>

        <Concept title="Probabilidade teórica">
          É a chance de um resultado acontecer antes de realizar o experimento.
          No lançamento de uma moeda justa, a chance de obter cara é de 50%,
          assim como a de obter coroa.
        </Concept>

        <Concept title="Lei dos Grandes Números">
          É um princípio matemático que explica que, quanto mais vezes
          repetimos um experimento, mais a proporção dos resultados tende
          a se aproximar da probabilidade esperada.
        </Concept>

        <Concept title="Moeda justa e moeda viciada">
          Uma moeda justa possui chances iguais de apresentar cara ou coroa.
          Já uma moeda viciada apresenta chances diferentes para cada resultado,
          favorecendo um dos lados.
        </Concept>
      </div>
    </section>
  );
}